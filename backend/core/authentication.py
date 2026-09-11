"""
Core: Custom DRF authentication backend using Firebase ID tokens.
"""
import logging
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from .firebase import verify_firebase_token

logger = logging.getLogger('krishamitra')


class FirebaseAuthentication(BaseAuthentication):
    """
    DRF authentication class.

    Clients must include the Firebase ID token in the Authorization header:
        Authorization: Bearer <firebase-id-token>
    """

    def authenticate(self, request):
        auth_header = request.headers.get('Authorization', '')
        if not auth_header.startswith('Bearer '):
            return None  # Let other authenticators try

        id_token = auth_header.split('Bearer ', 1)[1].strip()
        if not id_token:
            return None

        decoded = verify_firebase_token(id_token)
        if decoded is None:
            raise AuthenticationFailed('Invalid or expired Firebase token.')

        # Get or create Django user matching the Firebase UID
        from authentication.models import KrishaMitraUser
        uid = decoded.get('uid')
        email = decoded.get('email', '')

        user, created = KrishaMitraUser.objects.get_or_create(
            firebase_uid=uid,
            defaults={'email': email, 'username': uid},
        )
        if created:
            logger.info('Created new user from Firebase UID: %s', uid)

        return (user, decoded)
