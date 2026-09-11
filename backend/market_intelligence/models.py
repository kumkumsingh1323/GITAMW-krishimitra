"""
Market Intelligence: Market price records, demand/supply, buyers.
"""
from django.db import models


class MarketPrice(models.Model):
    """Mandi / market price record for a crop."""
    crop_name = models.CharField(max_length=100, db_index=True)
    market_name = models.CharField(max_length=200)
    district = models.CharField(max_length=100, db_index=True)
    state = models.CharField(max_length=100, db_index=True)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)

    # Price
    min_price_per_kg = models.FloatField()
    max_price_per_kg = models.FloatField()
    modal_price_per_kg = models.FloatField(help_text='Most common / average price')

    # Volume
    arrivals_tonnes = models.FloatField(null=True, blank=True)

    # Demand indicator: 1=Low, 2=Medium, 3=High
    demand_indicator = models.PositiveSmallIntegerField(default=2)

    data_source = models.CharField(max_length=100, default='KRISHAMITRA_MOCK')
    recorded_at = models.DateTimeField(auto_now=True)
    date = models.DateField()

    class Meta:
        ordering = ['-date', 'crop_name']
        indexes = [
            models.Index(fields=['crop_name', 'state', 'date']),
            models.Index(fields=['crop_name', 'district', 'date']),
        ]

    def __str__(self):
        return f'{self.crop_name} @ {self.market_name} — ₹{self.modal_price_per_kg}/kg ({self.date})'


class NearbyBuyer(models.Model):
    """
    Registered buyer entity (business, restaurant, processing unit) that appears on the smart map.
    """
    BUYER_TYPE_CHOICES = [
        ('BUSINESS',        'Business / Buyer'),
        ('RESTAURANT',      'Restaurant'),
        ('PROCESSING_UNIT', 'Processing Unit'),
        ('STORAGE',         'Cold Storage'),
        ('INPUT_SHOP',      'Agriculture Input Shop'),
        ('TRANSPORT',       'Transport Provider'),
    ]

    name = models.CharField(max_length=200)
    buyer_type = models.CharField(max_length=20, choices=BUYER_TYPE_CHOICES, default='BUSINESS')
    district = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    latitude = models.FloatField()
    longitude = models.FloatField()

    crops_required = models.JSONField(default=list)
    weekly_requirement_kg = models.FloatField(null=True, blank=True)
    offered_price_per_kg = models.FloatField(null=True, blank=True)
    quality_required = models.CharField(max_length=10, default='A')

    contact_mobile = models.CharField(max_length=15, blank=True)
    is_verified = models.BooleanField(default=False)
    rating = models.FloatField(default=0.0)
    trust_score = models.FloatField(default=0.0)

    # For processing units — what they convert to
    output_products = models.JSONField(default=list, help_text='e.g. ["Ketchup", "Paste"]')
    processing_capacity_kg_day = models.FloatField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-rating', '-trust_score']

    def __str__(self):
        return f'{self.name} ({self.get_buyer_type_display()}) — {self.district}'
