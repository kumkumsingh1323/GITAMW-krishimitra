from rest_framework import serializers
from .models import Crop


class CropSerializer(serializers.ModelSerializer):
    remaining_quantity_kg = serializers.ReadOnlyField()

    class Meta:
        model = Crop
        fields = '__all__'
        read_only_fields = ['farmer', 'sold_quantity_kg', 'disease_analysis', 'created_at', 'updated_at']


class CropSummarySerializer(serializers.ModelSerializer):
    """Lightweight serializer for listings and matching."""
    class Meta:
        model = Crop
        fields = ['id', 'name', 'variety', 'quantity_kg', 'quality_grade',
                  'harvest_date', 'expected_price_per_kg', 'status',
                  'latitude', 'longitude', 'district', 'state']
