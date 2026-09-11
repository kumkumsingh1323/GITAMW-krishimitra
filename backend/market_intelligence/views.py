"""
Market Intelligence: Views.
"""
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from core.utils import success_response, error_response, haversine_km
from .models import MarketPrice, NearbyBuyer
from .serializers import MarketPriceSerializer, NearbyBuyerSerializer
from .engine import smart_selling_recommendation


# ─── Market Prices ────────────────────────────────────────────────────────────

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def market_prices(request):
    """
    GET /api/market/prices/
    Query params: crop (required), state, district, limit (default 20)
    """
    crop = request.query_params.get('crop')
    if not crop:
        return error_response('crop query parameter is required.')

    qs = MarketPrice.objects.filter(crop_name__iexact=crop)
    if state := request.query_params.get('state'):
        qs = qs.filter(state__iexact=state)
    if district := request.query_params.get('district'):
        qs = qs.filter(district__iexact=district)

    limit = int(request.query_params.get('limit', 20))
    prices = qs[:limit]
    return success_response(MarketPriceSerializer(prices, many=True).data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def price_trends(request):
    """
    GET /api/market/trends/
    Returns last 30 price records for a crop to show historical trends.
    """
    crop = request.query_params.get('crop')
    if not crop:
        return error_response('crop query parameter is required.')

    data = MarketPrice.objects.filter(
        crop_name__iexact=crop
    ).order_by('-date')[:30]
    return success_response(MarketPriceSerializer(data, many=True).data)


# ─── Smart Selling Recommendation ────────────────────────────────────────────

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def smart_recommendation(request):
    """
    GET /api/market/recommendation/
    Query params: crop, quantity_kg, lat, lon
    """
    crop = request.query_params.get('crop')
    quantity_kg = request.query_params.get('quantity_kg')
    lat = request.query_params.get('lat')
    lon = request.query_params.get('lon')

    if not all([crop, quantity_kg]):
        return error_response('crop and quantity_kg are required.')

    try:
        quantity_kg = float(quantity_kg)
        lat = float(lat) if lat else 17.385  # Default: Hyderabad
        lon = float(lon) if lon else 78.487
    except ValueError:
        return error_response('quantity_kg, lat, lon must be numeric.')

    result = smart_selling_recommendation(crop, quantity_kg, lat, lon)
    if result is None:
        return error_response(
            f'No market data available for "{crop}". Please try again later.',
            status_code=status.HTTP_404_NOT_FOUND,
        )
    return success_response(result)


# ─── Map / Nearby Buyers ──────────────────────────────────────────────────────

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def nearby_buyers(request):
    """
    GET /api/market/buyers/
    Query params: crop, lat, lon, radius_km (default 100), buyer_type
    """
    crop = request.query_params.get('crop', '')
    lat = float(request.query_params.get('lat', 17.385))
    lon = float(request.query_params.get('lon', 78.487))
    radius_km = float(request.query_params.get('radius_km', 100))
    buyer_type = request.query_params.get('buyer_type')

    qs = NearbyBuyer.objects.all()
    if crop:
        qs = qs.filter(crops_required__icontains=crop)
    if buyer_type:
        qs = qs.filter(buyer_type=buyer_type)

    results = []
    for b in qs:
        dist = haversine_km(lat, lon, b.latitude, b.longitude)
        if dist <= radius_km:
            data = NearbyBuyerSerializer(b).data
            data['distance_km'] = round(dist, 1)
            results.append(data)

    results.sort(key=lambda x: x['distance_km'])
    return success_response(results)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def district_summary(request):
    """
    GET /api/market/district-summary/
    Returns demand/supply per district for a given crop.
    """
    crop = request.query_params.get('crop', 'Tomato')
    from django.db.models import Avg, Max, Count
    data = (
        MarketPrice.objects
        .filter(crop_name__iexact=crop)
        .values('district', 'state')
        .annotate(
            avg_price=Avg('modal_price_per_kg'),
            max_price=Max('max_price_per_kg'),
            avg_demand=Avg('demand_indicator'),
            records=Count('id'),
        )
        .order_by('-avg_demand', '-avg_price')
    )
    return success_response(list(data))
