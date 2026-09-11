"""
Authentication: Custom User model with role support.
"""
from django.contrib.auth.models import AbstractUser
from django.db import models


class UserRole(models.TextChoices):
    FARMER           = 'FARMER',           'Farmer'
    BUSINESS         = 'BUSINESS',         'Business / Buyer'
    RESTAURANT       = 'RESTAURANT',       'Restaurant'
    CUSTOMER         = 'CUSTOMER',         'Individual Customer'
    PROCESSING_UNIT  = 'PROCESSING_UNIT',  'Processing / Value-Addition Unit'
    TRANSPORT        = 'TRANSPORT',        'Transport Provider'
    VILLAGE_SUPPORT  = 'VILLAGE_SUPPORT',  'Village Support'
    DISTRICT         = 'DISTRICT',         'District'
    STATE            = 'STATE',            'State'
    ADMIN            = 'ADMIN',            'Admin'


class KrishaMitraUser(AbstractUser):
    """
    Central user model.  Firebase UID links this to the Firebase Auth record.
    Every user gets exactly one role; profile details live in role-specific tables.
    """
    firebase_uid = models.CharField(max_length=128, unique=True, db_index=True, blank=True, null=True)
    role = models.CharField(max_length=20, choices=UserRole.choices, default=UserRole.FARMER)
    mobile = models.CharField(max_length=15, blank=True)
    is_verified = models.BooleanField(default=False)
    profile_complete = models.BooleanField(default=False)
    fcm_token = models.TextField(blank=True, help_text='Firebase Cloud Messaging device token')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'

    def __str__(self):
        return f'{self.get_role_display()} — {self.username or self.mobile or self.firebase_uid}'
