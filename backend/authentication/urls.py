from django.urls import path
from . import views

urlpatterns = [
    path('verify-token/', views.verify_token, name='auth-verify-token'),
    path('profile/', views.get_profile, name='auth-profile'),
    path('profile/update/', views.update_profile, name='auth-profile-update'),
    path('fcm-token/', views.update_fcm_token, name='auth-fcm-token'),
]
