from django.urls import path
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from core.utils import success_response
from market_intelligence.models import NearbyBuyer
from market_intelligence.serializers import NearbyBuyerSerializer
from core.utils import haversine_km


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def map_entities(request):
    """
    GET /api/transport/map/
    Returns all geo-entities for the smart map.
    Query params: type (BUSINESS|RESTAURANT|PROCESSING_UNIT|STORAGE|INPUT_SHOP|TRANSPORT)
    """
    qs = NearbyBuyer.objects.all()
    entity_type = request.query_params.get('type')
    if entity_type:
        qs = qs.filter(buyer_type=entity_type.upper())

    lat = float(request.query_params.get('lat', 17.385))
    lon = float(request.query_params.get('lon', 78.487))

    results = []
    for entity in qs:
        data = NearbyBuyerSerializer(entity).data
        data['distance_km'] = round(haversine_km(lat, lon, entity.latitude, entity.longitude), 1)
        results.append(data)
    results.sort(key=lambda x: x['distance_km'])
    return success_response(results)


urlpatterns = [
    path('map/', map_entities, name='map-entities'),
]
