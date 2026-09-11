from rest_framework import serializers
from .models import MarketPrice, NearbyBuyer


class MarketPriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = MarketPrice
        fields = '__all__'


class NearbyBuyerSerializer(serializers.ModelSerializer):
    class Meta:
        model = NearbyBuyer
        fields = '__all__'


class SmartRecommendationSerializer(serializers.Serializer):
    """Read-only serializer documenting the smart-selling engine output."""
    crop_name = serializers.CharField()
    quantity_kg = serializers.FloatField()

    recommended_market = serializers.CharField()
    recommended_market_district = serializers.CharField()
    distance_km = serializers.FloatField()
    selling_price_per_kg = serializers.FloatField()
    total_revenue = serializers.FloatField()
    transport_cost = serializers.FloatField()
    handling_cost = serializers.FloatField()
    commission = serializers.FloatField()
    estimated_wastage_value = serializers.FloatField()
    estimated_net_return = serializers.FloatField()

    demand_level = serializers.CharField()
    wastage_risk = serializers.CharField()

    alternatives = serializers.ListField(child=serializers.DictField())
    disclaimer = serializers.CharField()
