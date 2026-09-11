"""
Marketplace: Crop listings and buyer requests.
"""
from django.db import models
from django.conf import settings


class CropListing(models.Model):
    """Public crop listing created by a farmer."""
    farmer = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='listings'
    )
    crop_name = models.CharField(max_length=100)
    variety = models.CharField(max_length=100, blank=True)
    quantity_kg = models.FloatField()
    quality_grade = models.CharField(max_length=1, default='A')
    expected_price_per_kg = models.FloatField()
    harvest_date = models.DateField()
    district = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    images = models.JSONField(default=list)
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.crop_name} {self.quantity_kg}kg by {self.farmer}'


class BuyerRequest(models.Model):
    """A buyer's purchase request on a crop listing."""
    listing = models.ForeignKey(CropListing, on_delete=models.CASCADE, related_name='requests')
    buyer = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='buy_requests'
    )
    offered_price_per_kg = models.FloatField()
    quantity_requested_kg = models.FloatField()
    message = models.TextField(blank=True)
    status = models.CharField(
        max_length=20,
        choices=[('PENDING', 'Pending'), ('ACCEPTED', 'Accepted'), ('REJECTED', 'Rejected')],
        default='PENDING',
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Request by {self.buyer} on {self.listing}'
