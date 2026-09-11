from rest_framework import serializers
from .models import CropListing, BuyerRequest


class CropListingSerializer(serializers.ModelSerializer):
    farmer_name = serializers.CharField(source='farmer.first_name', read_only=True)

    class Meta:
        model = CropListing
        fields = '__all__'
        read_only_fields = ['farmer', 'created_at', 'updated_at']


class BuyerRequestSerializer(serializers.ModelSerializer):
    buyer_name = serializers.CharField(source='buyer.first_name', read_only=True)

    class Meta:
        model = BuyerRequest
        fields = '__all__'
        read_only_fields = ['buyer', 'status', 'created_at']
