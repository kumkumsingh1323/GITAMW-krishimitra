from django.urls import path
from . import views

urlpatterns = [
    path('listings/', views.listing_list, name='listing-list'),
    path('listings/<int:pk>/', views.listing_detail, name='listing-detail'),
    path('listings/<int:listing_id>/request/', views.submit_request, name='submit-request'),
    path('my-requests/', views.my_requests, name='my-requests'),
]
