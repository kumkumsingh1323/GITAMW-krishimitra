"""
Market Intelligence: Smart Selling Engine.

Calculates estimated net return for a farmer's crop across available markets.
All outputs are advisory — not a guarantee of future prices.
"""
import logging
from core.utils import haversine_km, estimate_transport_cost
from .models import MarketPrice, NearbyBuyer

logger = logging.getLogger('krishamitra')

DEMAND_LABELS = {1: 'Low', 2: 'Medium', 3: 'High'}

HANDLING_RATE = 0.02        # 2 % of revenue
COMMISSION_RATE = 0.05      # 5 % mandi commission
WASTAGE_RATES = {           # Approximate wastage % by demand level
    1: 0.12,  # Low demand → higher wastage risk
    2: 0.06,
    3: 0.02,
}


def compute_net_return(price_per_kg, quantity_kg, distance_km, demand_indicator):
    revenue = price_per_kg * quantity_kg
    transport = estimate_transport_cost(distance_km, quantity_kg)
    handling = revenue * HANDLING_RATE
    commission = revenue * COMMISSION_RATE
    wastage = revenue * WASTAGE_RATES.get(demand_indicator, 0.06)
    net = revenue - transport - handling - commission - wastage
    return {
        'revenue': round(revenue, 2),
        'transport_cost': round(transport, 2),
        'handling_cost': round(handling, 2),
        'commission': round(commission, 2),
        'estimated_wastage_value': round(wastage, 2),
        'estimated_net_return': round(net, 2),
    }


def smart_selling_recommendation(crop_name, quantity_kg, farmer_lat, farmer_lon):
    """
    Core smart selling logic:
    1. Find available market prices for the crop.
    2. For each market, compute net return after transport/wastage.
    3. Rank by estimated net return.
    4. Return top recommendation + alternatives.
    """
    markets = MarketPrice.objects.filter(
        crop_name__iexact=crop_name
    ).order_by('-date')[:50]

    if not markets.exists():
        logger.warning('No market data found for crop: %s', crop_name)
        return None

    scored = []
    for m in markets:
        if m.latitude is None or m.longitude is None:
            dist = 50.0  # Default 50 km if location unknown
        else:
            dist = haversine_km(farmer_lat, farmer_lon, m.latitude, m.longitude)

        returns = compute_net_return(m.modal_price_per_kg, quantity_kg, dist, m.demand_indicator)
        scored.append({
            'market_id': m.id,
            'market_name': m.market_name,
            'district': m.district,
            'state': m.state,
            'distance_km': round(dist, 1),
            'selling_price_per_kg': m.modal_price_per_kg,
            'demand_level': DEMAND_LABELS.get(m.demand_indicator, 'Medium'),
            'wastage_risk': 'High' if m.demand_indicator == 1 else ('Low' if m.demand_indicator == 3 else 'Medium'),
            **returns,
        })

    scored.sort(key=lambda x: x['estimated_net_return'], reverse=True)

    # Also check direct buyers
    direct_buyers = NearbyBuyer.objects.filter(
        crops_required__icontains=crop_name,
        buyer_type__in=['BUSINESS', 'RESTAURANT'],
    )
    buyer_alternatives = []
    for b in direct_buyers:
        if b.offered_price_per_kg:
            dist = haversine_km(farmer_lat, farmer_lon, b.latitude, b.longitude)
            returns = compute_net_return(b.offered_price_per_kg, quantity_kg, dist, 3)
            buyer_alternatives.append({
                'type': 'DIRECT_BUYER',
                'name': b.name,
                'district': b.district,
                'distance_km': round(dist, 1),
                'offered_price_per_kg': b.offered_price_per_kg,
                'is_verified': b.is_verified,
                'rating': b.rating,
                **returns,
            })
    buyer_alternatives.sort(key=lambda x: x['estimated_net_return'], reverse=True)

    top = scored[0] if scored else {}
    alternatives = (scored[1:4] if len(scored) > 1 else []) + buyer_alternatives[:2]

    return {
        'crop_name': crop_name,
        'quantity_kg': quantity_kg,
        'recommended_market': top.get('market_name', '—'),
        'recommended_market_district': top.get('district', '—'),
        'distance_km': top.get('distance_km', 0),
        'selling_price_per_kg': top.get('selling_price_per_kg', 0),
        'total_revenue': top.get('revenue', 0),
        'transport_cost': top.get('transport_cost', 0),
        'handling_cost': top.get('handling_cost', 0),
        'commission': top.get('commission', 0),
        'estimated_wastage_value': top.get('estimated_wastage_value', 0),
        'estimated_net_return': top.get('estimated_net_return', 0),
        'demand_level': top.get('demand_level', 'Medium'),
        'wastage_risk': top.get('wastage_risk', 'Medium'),
        'alternatives': alternatives,
        'disclaimer': (
            'This is an advisory estimate only. Actual prices may vary. '
            'Transport costs are approximate. Always verify with the market before selling.'
        ),
    }
