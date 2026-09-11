from rest_framework import serializers
from .models import FarmerProfile, BuyerProfile


class FarmerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = FarmerProfile
        fields = '__all__'
        read_only_fields = ['user', 'is_verified', 'trust_score', 'created_at', 'updated_at']


class BuyerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = BuyerProfile
        fields = '__all__'
        read_only_fields = ['user', 'is_verified', 'trust_score', 'created_at', 'updated_at']


class FarmerSummarySerializer(serializers.ModelSerializer):
    """Lightweight representation for map/listing views."""
    class Meta:
        model = FarmerProfile
        fields = ['id', 'full_name', 'village', 'district', 'state',
                  'latitude', 'longitude', 'is_verified', 'trust_score']
