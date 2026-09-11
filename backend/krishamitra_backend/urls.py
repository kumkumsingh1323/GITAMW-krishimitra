"""
KRISHAMITRA Root URL Configuration
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),

    # KRISHAMITRA API v1
    path('api/auth/', include('authentication.urls')),
    path('api/farmers/', include('farmers.urls')),
    path('api/crops/', include('crops.urls')),
    path('api/marketplace/', include('marketplace.urls')),
    path('api/market/', include('market_intelligence.urls')),
    path('api/ai/', include('ai_services.urls')),
    path('api/surplus/', include('surplus_management.urls')),
    path('api/orders/', include('orders.urls')),
    path('api/transport/', include('transport.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
