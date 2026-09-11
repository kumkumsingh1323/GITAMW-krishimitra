"""
Authentication: Serializers for user and profile data.
"""
from rest_framework import serializers
from .models import KrishaMitraUser


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = KrishaMitraUser
        fields = ['id', 'firebase_uid', 'username', 'email', 'mobile',
                  'role', 'is_verified', 'profile_complete', 'date_joined']
        read_only_fields = ['firebase_uid', 'role', 'date_joined']


class RegisterSerializer(serializers.Serializer):
    """Payload sent when a new user registers via Firebase."""
    firebase_token = serializers.CharField()
    role = serializers.ChoiceField(choices=KrishaMitraUser.role.field.choices)
    mobile = serializers.CharField(max_length=15)
    name = serializers.CharField(max_length=150)


class UpdateFCMTokenSerializer(serializers.Serializer):
    fcm_token = serializers.CharField()
