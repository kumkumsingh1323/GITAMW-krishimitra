"""
Farmers: Farmer profile, location, land details.
"""
from django.db import models
from django.conf import settings


class FarmerProfile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='farmer_profile'
    )
    # Personal
    full_name = models.CharField(max_length=150)
    mobile = models.CharField(max_length=15)

    # Location
    village = models.CharField(max_length=100)
    district = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    pincode = models.CharField(max_length=10, blank=True)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)

    # Farm details
    land_size_acres = models.FloatField(null=True, blank=True, help_text='Farm size in acres')
    farming_type = models.CharField(
        max_length=50,
        choices=[('ORGANIC', 'Organic'), ('CONVENTIONAL', 'Conventional'), ('MIXED', 'Mixed')],
        default='CONVENTIONAL',
    )
    years_of_experience = models.PositiveSmallIntegerField(null=True, blank=True)

    # Verification
    is_verified = models.BooleanField(default=False)
    trust_score = models.FloatField(default=0.0)

    # Profile image (Firebase Storage URL)
    profile_image_url = models.URLField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Farmer Profile'

    def __str__(self):
        return f'{self.full_name} — {self.village}, {self.district}'


class BuyerProfile(models.Model):
    """Profile for Business, Restaurant, Customer, Processing Unit roles."""
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='buyer_profile'
    )
    business_name = models.CharField(max_length=200, blank=True)
    contact_name = models.CharField(max_length=150)
    mobile = models.CharField(max_length=15)
    business_type = models.CharField(max_length=100, blank=True)
    address = models.TextField(blank=True)
    village = models.CharField(max_length=100, blank=True)
    district = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    pincode = models.CharField(max_length=10, blank=True)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)

    # Procurement preferences
    crops_required = models.JSONField(default=list, help_text='List of crop names')
    average_weekly_quantity_kg = models.FloatField(null=True, blank=True)
    quality_preference = models.CharField(
        max_length=20,
        choices=[('A', 'Grade A'), ('B', 'Grade B'), ('ANY', 'Any')],
        default='ANY',
    )

    is_verified = models.BooleanField(default=False)
    trust_score = models.FloatField(default=0.0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.business_name or self.contact_name} — {self.district}'
