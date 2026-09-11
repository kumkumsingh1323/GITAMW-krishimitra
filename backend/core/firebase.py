"""
Core: Firebase Admin SDK initialization (singleton).
"""
import logging
import os
import firebase_admin
from firebase_admin import credentials, auth as firebase_auth
from django.conf import settings

logger = logging.getLogger('krishamitra')

_firebase_app = None


def get_firebase_app():
    """Return initialised Firebase app (initialise once)."""
    global _firebase_app
    if _firebase_app is None:
        cred_path = settings.FIREBASE_CREDENTIALS_PATH
        if cred_path and os.path.exists(cred_path):
            cred = credentials.Certificate(cred_path)
            _firebase_app = firebase_admin.initialize_app(cred)
            logger.info('Firebase initialised with service account credentials.')
        else:
            # Dev mode — Firebase auth will be mocked / skipped
            logger.warning(
                'FIREBASE_CREDENTIALS_PATH not set or file missing. '
                'Firebase auth is disabled in dev mode.'
            )
            _firebase_app = 'mock'
    return _firebase_app


def verify_firebase_token(id_token: str) -> dict | None:
    """
    Verify a Firebase ID token.
    Returns decoded token dict or None.
    """
    app = get_firebase_app()
    if app == 'mock':
        logger.warning('Firebase mock mode: skipping token verification.')
        return None
    try:
        decoded = firebase_auth.verify_id_token(id_token)
        return decoded
    except Exception as exc:
        logger.error('Firebase token verification failed: %s', exc)
        return None
