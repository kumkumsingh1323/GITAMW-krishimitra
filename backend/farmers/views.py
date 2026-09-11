"""
Farmers: Profile views for Farmer and Buyer roles.
"""
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from core.utils import success_response, error_response, IsFarmer
from .models import FarmerProfile, BuyerProfile
from .serializers import FarmerProfileSerializer, BuyerProfileSerializer


# ─── Farmer Profile ───────────────────────────────────────────────────────────

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def farmer_profile(request):
    """
    GET  /api/farmers/profile/  — Return farmer profile
    POST /api/farmers/profile/  — Create farmer profile (first-time setup)
    """
    if request.method == 'GET':
        try:
            profile = request.user.farmer_profile
            return success_response(FarmerProfileSerializer(profile).data)
        except FarmerProfile.DoesNotExist:
            return error_response('Farmer profile not found.', status_code=status.HTTP_404_NOT_FOUND)

    # POST: create profile
    serializer = FarmerProfileSerializer(data=request.data)
    if not serializer.is_valid():
        return error_response('Validation failed.', serializer.errors)

    profile = serializer.save(user=request.user)
    request.user.profile_complete = True
    request.user.save(update_fields=['profile_complete'])
    return success_response(
        FarmerProfileSerializer(profile).data,
        'Farmer profile created.',
        status.HTTP_201_CREATED,
    )


@api_view(['PUT', 'PATCH'])
@permission_classes([IsAuthenticated])
def update_farmer_profile(request):
    """PUT/PATCH /api/farmers/profile/update/"""
    try:
        profile = request.user.farmer_profile
    except FarmerProfile.DoesNotExist:
        return error_response('Farmer profile not found.', status_code=status.HTTP_404_NOT_FOUND)

    serializer = FarmerProfileSerializer(
        profile, data=request.data, partial=(request.method == 'PATCH')
    )
    if not serializer.is_valid():
        return error_response('Validation failed.', serializer.errors)
    serializer.save()
    return success_response(serializer.data, 'Profile updated.')


# ─── Buyer / Business Profile ────────────────────────────────────────────────

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def buyer_profile(request):
    if request.method == 'GET':
        try:
            profile = request.user.buyer_profile
            return success_response(BuyerProfileSerializer(profile).data)
        except BuyerProfile.DoesNotExist:
            return error_response('Buyer profile not found.', status_code=status.HTTP_404_NOT_FOUND)

    serializer = BuyerProfileSerializer(data=request.data)
    if not serializer.is_valid():
        return error_response('Validation failed.', serializer.errors)

    profile = serializer.save(user=request.user)
    request.user.profile_complete = True
    request.user.save(update_fields=['profile_complete'])
    return success_response(BuyerProfileSerializer(profile).data, 'Buyer profile created.', status.HTTP_201_CREATED)


@api_view(['PUT', 'PATCH'])
@permission_classes([IsAuthenticated])
def update_buyer_profile(request):
    try:
        profile = request.user.buyer_profile
    except BuyerProfile.DoesNotExist:
        return error_response('Buyer profile not found.', status_code=status.HTTP_404_NOT_FOUND)
    serializer = BuyerProfileSerializer(profile, data=request.data, partial=True)
    if not serializer.is_valid():
        return error_response('Validation failed.', serializer.errors)
    serializer.save()
    return success_response(serializer.data, 'Profile updated.')
