"""
Orders: Full order lifecycle model.
Pending → Accepted → Confirmed → Pickup → In Transit → Delivered → Completed
"""
from django.db import models
from django.conf import settings


class OrderStatus(models.TextChoices):
    PENDING    = 'PENDING',    'Pending'
    ACCEPTED   = 'ACCEPTED',   'Accepted'
    CONFIRMED  = 'CONFIRMED',  'Confirmed'
    PICKUP     = 'PICKUP',     'Ready for Pickup'
    IN_TRANSIT = 'IN_TRANSIT', 'In Transit'
    DELIVERED  = 'DELIVERED',  'Delivered'
    COMPLETED  = 'COMPLETED',  'Completed'
    CANCELLED  = 'CANCELLED',  'Cancelled'


class PaymentStatus(models.TextChoices):
    PENDING   = 'PENDING',   'Pending'
    PARTIAL   = 'PARTIAL',   'Partially Paid'
    PAID      = 'PAID',      'Paid'
    REFUNDED  = 'REFUNDED',  'Refunded'


class Order(models.Model):
    # Parties
    farmer = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.PROTECT, related_name='farmer_orders'
    )
    buyer = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.PROTECT, related_name='buyer_orders'
    )

    # Product
    crop_name = models.CharField(max_length=100)
    crop_variety = models.CharField(max_length=100, blank=True)
    quantity_kg = models.FloatField()
    quality_grade = models.CharField(max_length=1, default='A')
    price_per_kg = models.FloatField()

    # Financials
    total_amount = models.FloatField()
    transport_cost = models.FloatField(default=0)
    handling_cost = models.FloatField(default=0)
    commission = models.FloatField(default=0)
    net_farmer_amount = models.FloatField(default=0)

    # Location
    pickup_address = models.TextField(blank=True)
    pickup_latitude = models.FloatField(null=True, blank=True)
    pickup_longitude = models.FloatField(null=True, blank=True)
    delivery_address = models.TextField(blank=True)
    delivery_district = models.CharField(max_length=100, blank=True)
    delivery_state = models.CharField(max_length=100, blank=True)
    distance_km = models.FloatField(null=True, blank=True)

    # Transport
    transport_type = models.CharField(
        max_length=20,
        choices=[('BUYER_PICKUP', 'Buyer Pickup'), ('FARMER_DELIVERY', 'Farmer Delivery'), ('PARTNER', 'Transport Partner')],
        default='BUYER_PICKUP',
    )

    # Status
    status = models.CharField(max_length=15, choices=OrderStatus.choices, default=OrderStatus.PENDING)
    payment_status = models.CharField(max_length=10, choices=PaymentStatus.choices, default=PaymentStatus.PENDING)

    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    accepted_at = models.DateTimeField(null=True, blank=True)
    pickup_at = models.DateTimeField(null=True, blank=True)
    delivered_at = models.DateTimeField(null=True, blank=True)
    completed_at = models.DateTimeField(null=True, blank=True)

    # Ratings
    farmer_rated = models.BooleanField(default=False)
    buyer_rated = models.BooleanField(default=False)

    notes = models.TextField(blank=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'Order #{self.id}: {self.crop_name} {self.quantity_kg}kg — {self.get_status_display()}'


class Payment(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE, related_name='payment')
    amount = models.FloatField()
    payment_method = models.CharField(max_length=50, default='UPI')
    transaction_reference = models.CharField(max_length=200, blank=True)
    payment_status = models.CharField(max_length=10, choices=PaymentStatus.choices, default=PaymentStatus.PENDING)
    initiated_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f'Payment for Order #{self.order_id} — ₹{self.amount}'
