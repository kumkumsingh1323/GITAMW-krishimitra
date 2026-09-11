from rest_framework import serializers
from .models import Order, Payment


class OrderSerializer(serializers.ModelSerializer):
    farmer_name = serializers.CharField(source='farmer.first_name', read_only=True)
    buyer_name = serializers.CharField(source='buyer.first_name', read_only=True)

    class Meta:
        model = Order
        fields = '__all__'
        read_only_fields = [
            'farmer', 'status', 'payment_status', 'net_farmer_amount',
            'created_at', 'accepted_at', 'pickup_at', 'delivered_at', 'completed_at',
            'farmer_rated', 'buyer_rated',
        ]


class CreateOrderSerializer(serializers.ModelSerializer):
    """Serializer used when a buyer places an order."""
    class Meta:
        model = Order
        fields = [
            'crop_name', 'crop_variety', 'quantity_kg', 'quality_grade',
            'price_per_kg', 'total_amount', 'transport_cost', 'transport_type',
            'pickup_address', 'pickup_latitude', 'pickup_longitude',
            'delivery_address', 'delivery_district', 'delivery_state',
            'distance_km', 'notes',
        ]


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'
        read_only_fields = ['initiated_at', 'completed_at']
