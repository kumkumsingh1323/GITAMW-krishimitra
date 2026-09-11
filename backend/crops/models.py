"""
Crops: Farmer's crop inventory. One farmer → many crops.
"""
from django.db import models
from django.conf import settings


class QualityGrade(models.TextChoices):
    A = 'A', 'Grade A (Premium)'
    B = 'B', 'Grade B (Good)'
    C = 'C', 'Grade C (Processing Grade)'


class SellingStatus(models.TextChoices):
    AVAILABLE  = 'AVAILABLE',  'Available'
    PARTIALLY_SOLD = 'PARTIALLY_SOLD', 'Partially Sold'
    SOLD       = 'SOLD',       'Sold'
    PROCESSING = 'PROCESSING', 'Sent to Processing'


class Crop(models.Model):
    farmer = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='crops'
    )
    name = models.CharField(max_length=100, help_text='Crop name e.g. Tomato, Rice, Cotton')
    variety = models.CharField(max_length=100, blank=True, help_text='Variety/cultivar name')

    # Quantity
    quantity_kg = models.FloatField(help_text='Available quantity in kilograms')
    sold_quantity_kg = models.FloatField(default=0)

    # Quality
    quality_grade = models.CharField(max_length=1, choices=QualityGrade.choices, default=QualityGrade.A)
    quality_notes = models.TextField(blank=True)

    # Dates
    sowing_date = models.DateField(null=True, blank=True)
    harvest_date = models.DateField(null=True, blank=True)

    # Location (optional — defaults to farmer profile location)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    district = models.CharField(max_length=100, blank=True)
    state = models.CharField(max_length=100, blank=True)

    # Pricing
    expected_price_per_kg = models.FloatField(null=True, blank=True, help_text='Farmer expected price')
    minimum_price_per_kg = models.FloatField(null=True, blank=True)

    # Images (list of Firebase Storage URLs)
    images = models.JSONField(default=list)

    status = models.CharField(max_length=20, choices=SellingStatus.choices, default=SellingStatus.AVAILABLE)

    # AI analysis results cache
    disease_analysis = models.JSONField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.name} ({self.quantity_kg} kg) — {self.farmer}'

    @property
    def remaining_quantity_kg(self):
        return max(0, self.quantity_kg - self.sold_quantity_kg)
