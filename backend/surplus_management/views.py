"""
Surplus Management: Views for surplus detection and processing unit connections.
"""
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from core.utils import success_response, error_response
from market_intelligence.models import NearbyBuyer, MarketPrice
from ai_services.services import detect_surplus_opportunity


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def surplus_opportunities(request):
    """
    GET /api/surplus/
    Query params: crop, lat, lon
    Returns surplus detection + nearby processing units.
    """
    crop = request.query_params.get('crop')
    if not crop:
        return error_response('"crop" is required.')

    lat = float(request.query_params.get('lat', 17.385))
    lon = float(request.query_params.get('lon', 78.487))

    # Get supply/demand from market data
    from django.db.models import Avg
    market = MarketPrice.objects.filter(crop_name__iexact=crop).aggregate(
        avg_demand=Avg('demand_indicator')
    )
    demand_val = market['avg_demand'] or 2
    supply_index = 70   # Mock — would come from actual arrival data
    demand_index = int(demand_val * 33.3)  # Scale 1-3 → 33-99

    # Get surplus analysis
    analysis = detect_surplus_opportunity(crop, supply_index, demand_index)

    # Find nearby processing units
    from core.utils import haversine_km
    processing_units = NearbyBuyer.objects.filter(
        buyer_type='PROCESSING_UNIT',
        crops_required__icontains=crop,
    )
    nearby_units = []
    for unit in processing_units:
        dist = haversine_km(lat, lon, unit.latitude, unit.longitude)
        nearby_units.append({
            'id': unit.id,
            'name': unit.name,
            'district': unit.district,
            'distance_km': round(dist, 1),
            'output_products': unit.output_products,
            'offered_price_per_kg': unit.offered_price_per_kg,
            'processing_capacity_kg_day': unit.processing_capacity_kg_day,
            'is_verified': unit.is_verified,
            'rating': unit.rating,
        })
    nearby_units.sort(key=lambda x: x['distance_km'])
    analysis['nearby_processing_units'] = nearby_units[:5]
    return success_response(analysis)
