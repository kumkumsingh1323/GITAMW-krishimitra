"""
Orders: Views — create, list, and status transitions.
"""
from django.utils import timezone
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from core.utils import success_response, error_response
from .models import Order, OrderStatus, Payment, PaymentStatus
from .serializers import OrderSerializer, CreateOrderSerializer, PaymentSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def order_list(request):
    """
    GET /api/orders/
    Returns orders relevant to the current user (as farmer or buyer).
    """
    user = request.user
    if user.role == 'FARMER':
        orders = Order.objects.filter(farmer=user)
    else:
        orders = Order.objects.filter(buyer=user)

    status_filter = request.query_params.get('status')
    if status_filter:
        orders = orders.filter(status=status_filter.upper())

    return success_response(OrderSerializer(orders, many=True).data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_order(request, farmer_id):
    """
    POST /api/orders/create/<farmer_id>/
    Buyer places an order for a farmer's produce.
    """
    from authentication.models import KrishaMitraUser
    try:
        farmer = KrishaMitraUser.objects.get(pk=farmer_id, role='FARMER')
    except KrishaMitraUser.DoesNotExist:
        return error_response('Farmer not found.', status_code=status.HTTP_404_NOT_FOUND)

    serializer = CreateOrderSerializer(data=request.data)
    if not serializer.is_valid():
        return error_response('Validation failed.', serializer.errors)

    data = serializer.validated_data
    total = data['price_per_kg'] * data['quantity_kg']
    transport = data.get('transport_cost', 0)
    commission = total * 0.05
    net_farmer = total - transport - commission

    order = Order.objects.create(
        farmer=farmer,
        buyer=request.user,
        net_farmer_amount=round(net_farmer, 2),
        **data,
    )
    return success_response(OrderSerializer(order).data, 'Order placed successfully.', status.HTTP_201_CREATED)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def order_detail(request, pk):
    """GET /api/orders/<id>/"""
    try:
        order = Order.objects.get(pk=pk)
        if order.farmer != request.user and order.buyer != request.user:
            return error_response('Not authorized.', status_code=status.HTTP_403_FORBIDDEN)
    except Order.DoesNotExist:
        return error_response('Order not found.', status_code=status.HTTP_404_NOT_FOUND)
    return success_response(OrderSerializer(order).data)


VALID_TRANSITIONS = {
    'FARMER': {
        OrderStatus.PENDING: OrderStatus.ACCEPTED,
        OrderStatus.ACCEPTED: OrderStatus.CONFIRMED,
        OrderStatus.CONFIRMED: OrderStatus.PICKUP,
        OrderStatus.PICKUP: OrderStatus.IN_TRANSIT,
        OrderStatus.IN_TRANSIT: OrderStatus.DELIVERED,
    },
    'BUYER': {
        OrderStatus.DELIVERED: OrderStatus.COMPLETED,
    }
}


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_order_status(request, pk):
    """
    POST /api/orders/<id>/status/
    Advances the order to the next valid status for the current user's role.
    """
    try:
        order = Order.objects.get(pk=pk)
    except Order.DoesNotExist:
        return error_response('Order not found.', status_code=status.HTTP_404_NOT_FOUND)

    user = request.user
    if order.farmer != user and order.buyer != user:
        return error_response('Not authorized.', status_code=status.HTTP_403_FORBIDDEN)

    role = 'FARMER' if order.farmer == user else 'BUYER'
    transitions = VALID_TRANSITIONS.get(role, {})
    new_status = transitions.get(order.status)

    if new_status is None:
        return error_response(f'No valid transition from {order.status} for {role}.')

    order.status = new_status
    now = timezone.now()
    if new_status == OrderStatus.ACCEPTED:
        order.accepted_at = now
    elif new_status == OrderStatus.PICKUP:
        order.pickup_at = now
    elif new_status == OrderStatus.DELIVERED:
        order.delivered_at = now
    elif new_status == OrderStatus.COMPLETED:
        order.completed_at = now

    order.save()
    return success_response(OrderSerializer(order).data, f'Order status updated to {new_status}.')


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def initiate_payment(request, pk):
    """
    POST /api/orders/<id>/payment/
    Initiates payment record (abstraction layer; integrate real UPI gateway here).
    """
    try:
        order = Order.objects.get(pk=pk, buyer=request.user)
    except Order.DoesNotExist:
        return error_response('Order not found.', status_code=status.HTTP_404_NOT_FOUND)

    payment, created = Payment.objects.get_or_create(
        order=order,
        defaults={'amount': order.total_amount},
    )
    if not created:
        return success_response(PaymentSerializer(payment).data, 'Payment already exists.')

    # TODO: Integrate UPI / Razorpay / payment gateway here
    payment.transaction_reference = f'KM-TXN-{order.id}-PENDING'
    payment.save()

    return success_response(
        PaymentSerializer(payment).data,
        'Payment record created. Awaiting completion.',
        status.HTTP_201_CREATED,
    )
