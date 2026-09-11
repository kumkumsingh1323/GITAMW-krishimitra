from django.contrib import admin
from .models import FarmerProfile, BuyerProfile


@admin.register(FarmerProfile)
class FarmerProfileAdmin(admin.ModelAdmin):
    list_display = ['full_name', 'village', 'district', 'state', 'land_size_acres', 'is_verified']
    list_filter = ['state', 'district', 'is_verified', 'farming_type']
    search_fields = ['full_name', 'village', 'district']


@admin.register(BuyerProfile)
class BuyerProfileAdmin(admin.ModelAdmin):
    list_display = ['business_name', 'contact_name', 'district', 'state', 'is_verified']
    list_filter = ['state', 'district', 'is_verified']
    search_fields = ['business_name', 'contact_name']
