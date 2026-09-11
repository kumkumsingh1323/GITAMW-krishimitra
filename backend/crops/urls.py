from django.urls import path
from . import views

urlpatterns = [
    path('', views.crop_list, name='crop-list'),
    path('<int:pk>/', views.crop_detail, name='crop-detail'),
]
