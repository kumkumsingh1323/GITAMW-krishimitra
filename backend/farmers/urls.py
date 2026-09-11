from django.urls import path
from . import views

urlpatterns = [
    path('profile/', views.farmer_profile, name='farmer-profile'),
    path('profile/update/', views.update_farmer_profile, name='farmer-profile-update'),
    path('buyer/profile/', views.buyer_profile, name='buyer-profile'),
    path('buyer/profile/update/', views.update_buyer_profile, name='buyer-profile-update'),
]
