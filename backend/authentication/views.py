"""
Authentication: Views — verify Firebase token, register, profile CRUD.
"""
import logging
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from core.firebase import verify_firebase_token
from core.utils import success_response, error_response
from .models import KrishaMitraUser
from .serializers import UserSerializer, RegisterSerializer, UpdateFCMTokenSerializer

logger = logging.getLogger('krishamitra')


@api_view(['POST'])
@permission_classes([AllowAny])
def verify_token(request):
    """
    POST /api/auth/verify-token/
    Body: { "firebase_token": "<id_token>", "role": "FARMER", "mobile": "...", "name": "..." }

    • Verifies the Firebase ID token.
    • Gets-or-creates the Django User.
    • Returns user data + whether profile is complete.
    """
    serializer = RegisterSerializer(data=request.data)
    if not serializer.is_valid():
        return error_response('Invalid data', serializer.errors)

    id_token = serializer.validated_data['firebase_token']
    decoded = verify_firebase_token(id_token)

    # ── DEV MODE: allow mock token 'dev-test-token' ──────────────────────
    if decoded is None:
        if id_token == 'dev-test-token':
            uid = 'dev-uid-001'
            email = 'dev@krishamitra.in'
        else:
            return error_response('Invalid Firebase token', status_code=status.HTTP_401_UNAUTHORIZED)
    else:
        uid = decoded['uid']
        email = decoded.get('email', '')

    role = serializer.validated_data['role']
    mobile = serializer.validated_data['mobile']
    name = serializer.validated_data['name']

    user, created = KrishaMitraUser.objects.get_or_create(
        firebase_uid=uid,
        defaults={
            'username': uid,
            'email': email,
            'role': role,
            'mobile': mobile,
            'first_name': name,
        },
    )
    if created:
        logger.info('New user registered: uid=%s role=%s', uid, role)

    return success_response(
        data=UserSerializer(user).data,
        message='User verified successfully.',
        status_code=status.HTTP_200_OK if not created else status.HTTP_201_CREATED,
    )


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_profile(request):
    """GET /api/auth/profile/ — Return current user profile."""
    return success_response(UserSerializer(request.user).data)


@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_profile(request):
    """PATCH /api/auth/profile/update/ — Update name / mobile / fcm_token."""
    user = request.user
    allowed_fields = {'first_name', 'last_name', 'mobile', 'email'}
    for field in allowed_fields:
        if field in request.data:
            setattr(user, field, request.data[field])
    user.save()
    return success_response(UserSerializer(user).data, 'Profile updated.')


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_fcm_token(request):
    """POST /api/auth/fcm-token/ — Store or update the device FCM push token."""
    serializer = UpdateFCMTokenSerializer(data=request.data)
    if not serializer.is_valid():
        return error_response('Invalid data', serializer.errors)
    request.user.fcm_token = serializer.validated_data['fcm_token']
    request.user.save(update_fields=['fcm_token'])
    return success_response(message='FCM token updated.')
