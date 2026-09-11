from django.contrib import admin
from .models import Order, Payment


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'crop_name', 'quantity_kg', 'farmer', 'buyer', 'status', 'payment_status', 'created_at']
    list_filter = ['status', 'payment_status', 'crop_name']
    search_fields = ['crop_name', 'farmer__username', 'buyer__username']


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ['order', 'amount', 'payment_method', 'payment_status', 'initiated_at']
    list_filter = ['payment_status', 'payment_method']
