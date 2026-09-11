from django.urls import path
from . import views

urlpatterns = [
    path('', views.order_list, name='order-list'),
    path('create/<int:farmer_id>/', views.create_order, name='order-create'),
    path('<int:pk>/', views.order_detail, name='order-detail'),
    path('<int:pk>/status/', views.update_order_status, name='order-status-update'),
    path('<int:pk>/payment/', views.initiate_payment, name='order-payment'),
]
