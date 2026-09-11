from django.contrib import admin
from .models import MarketPrice, NearbyBuyer


@admin.register(MarketPrice)
class MarketPriceAdmin(admin.ModelAdmin):
    list_display = ['crop_name', 'market_name', 'district', 'modal_price_per_kg', 'demand_indicator', 'date']
    list_filter = ['crop_name', 'state', 'district', 'demand_indicator']
    search_fields = ['crop_name', 'market_name', 'district']


@admin.register(NearbyBuyer)
class NearbyBuyerAdmin(admin.ModelAdmin):
    list_display = ['name', 'buyer_type', 'district', 'is_verified', 'rating', 'trust_score']
    list_filter = ['buyer_type', 'is_verified', 'state']
    search_fields = ['name', 'district']
