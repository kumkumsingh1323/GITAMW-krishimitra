from django.contrib import admin
from .models import CropListing, BuyerRequest


@admin.register(CropListing)
class CropListingAdmin(admin.ModelAdmin):
    list_display = ['crop_name', 'farmer', 'quantity_kg', 'expected_price_per_kg', 'district', 'is_active']
    list_filter = ['crop_name', 'is_active', 'state']
    search_fields = ['crop_name', 'district']


@admin.register(BuyerRequest)
class BuyerRequestAdmin(admin.ModelAdmin):
    list_display = ['listing', 'buyer', 'offered_price_per_kg', 'quantity_requested_kg', 'status']
    list_filter = ['status']
