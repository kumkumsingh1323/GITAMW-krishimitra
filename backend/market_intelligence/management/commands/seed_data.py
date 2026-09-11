"""
Management command to seed the database with realistic mock data for
market prices, nearby buyers, and processing units across Telangana.
"""
from datetime import date, timedelta
from django.core.management.base import BaseCommand
from market_intelligence.models import MarketPrice, NearbyBuyer


class Command(BaseCommand):
    help = 'Seed mock market prices, buyers, and processing units'

    def handle(self, *args, **options):
        self.stdout.write('Seeding market data...')
        self._seed_market_prices()
        self._seed_nearby_buyers()
        self.stdout.write(self.style.SUCCESS('Done! Database seeded.'))

    def _seed_market_prices(self):
        MarketPrice.objects.all().delete()
        today = date.today()

        crops = [
            {'name': 'Tomato', 'base': 25, 'var': 8},
            {'name': 'Rice', 'base': 32, 'var': 5},
            {'name': 'Cotton', 'base': 65, 'var': 10},
            {'name': 'Chilli', 'base': 80, 'var': 15},
            {'name': 'Onion', 'base': 22, 'var': 7},
            {'name': 'Maize', 'base': 18, 'var': 4},
        ]
        markets = [
            {'name': 'Erragadda Mandi', 'district': 'Hyderabad', 'state': 'Telangana', 'lat': 17.4500, 'lon': 78.4350},
            {'name': 'Gaddiannaram Market', 'district': 'Rangareddy', 'state': 'Telangana', 'lat': 17.3500, 'lon': 78.5200},
            {'name': 'Warangal Mandi', 'district': 'Warangal', 'state': 'Telangana', 'lat': 17.9784, 'lon': 79.5941},
            {'name': 'Karimnagar Market', 'district': 'Karimnagar', 'state': 'Telangana', 'lat': 18.4386, 'lon': 79.1288},
            {'name': 'Nalgonda Mandi', 'district': 'Nalgonda', 'state': 'Telangana', 'lat': 17.0500, 'lon': 79.2600},
            {'name': 'Nizamabad Market', 'district': 'Nizamabad', 'state': 'Telangana', 'lat': 18.6722, 'lon': 78.0944},
            {'name': 'Khammam Mandi', 'district': 'Khammam', 'state': 'Telangana', 'lat': 17.2473, 'lon': 80.1514},
            {'name': 'Adilabad Market', 'district': 'Adilabad', 'state': 'Telangana', 'lat': 19.6641, 'lon': 78.5320},
        ]

        import random
        records = []
        for crop in crops:
            for market in markets:
                for day_offset in range(30):
                    d = today - timedelta(days=day_offset)
                    base = crop['base'] + random.uniform(-crop['var'], crop['var'])
                    modal = round(base, 2)
                    records.append(MarketPrice(
                        crop_name=crop['name'],
                        market_name=market['name'],
                        district=market['district'],
                        state=market['state'],
                        latitude=market['lat'],
                        longitude=market['lon'],
                        min_price_per_kg=round(modal * 0.8, 2),
                        max_price_per_kg=round(modal * 1.2, 2),
                        modal_price_per_kg=modal,
                        arrivals_tonnes=round(random.uniform(20, 500), 1),
                        demand_indicator=random.choice([1, 2, 2, 3, 3]),
                        data_source='KRISHAMITRA_MOCK',
                        date=d,
                    ))
        MarketPrice.objects.bulk_create(records)
        self.stdout.write(f'  Created {len(records)} market price records.')

    def _seed_nearby_buyers(self):
        NearbyBuyer.objects.all().delete()
        buyers = [
            # Businesses
            {'name': 'Reliance Fresh Hub', 'type': 'BUSINESS', 'district': 'Hyderabad', 'state': 'Telangana',
             'lat': 17.4260, 'lon': 78.4480, 'crops': ['Tomato', 'Onion', 'Chilli'], 'qty': 2000,
             'price': 28, 'quality': 'A', 'verified': True, 'rating': 4.5, 'trust': 92},
            {'name': 'BigBasket Procurement', 'type': 'BUSINESS', 'district': 'Rangareddy', 'state': 'Telangana',
             'lat': 17.3600, 'lon': 78.5100, 'crops': ['Tomato', 'Onion', 'Maize'], 'qty': 5000,
             'price': 26, 'quality': 'A', 'verified': True, 'rating': 4.3, 'trust': 88},
            {'name': 'Krishna Traders', 'type': 'BUSINESS', 'district': 'Warangal', 'state': 'Telangana',
             'lat': 17.9700, 'lon': 79.6000, 'crops': ['Rice', 'Cotton', 'Chilli'], 'qty': 3000,
             'price': 35, 'quality': 'ANY', 'verified': True, 'rating': 4.0, 'trust': 78},
            # Restaurants
            {'name': 'Paradise Biryani', 'type': 'RESTAURANT', 'district': 'Hyderabad', 'state': 'Telangana',
             'lat': 17.4440, 'lon': 78.4740, 'crops': ['Tomato', 'Onion', 'Rice'], 'qty': 500,
             'price': 30, 'quality': 'A', 'verified': True, 'rating': 4.8, 'trust': 95},
            {'name': 'Chutneys Restaurant', 'type': 'RESTAURANT', 'district': 'Hyderabad', 'state': 'Telangana',
             'lat': 17.4300, 'lon': 78.4500, 'crops': ['Tomato', 'Chilli', 'Onion'], 'qty': 200,
             'price': 32, 'quality': 'A', 'verified': True, 'rating': 4.6, 'trust': 90},
            # Processing Units
            {'name': 'Telangana Ketchup Co.', 'type': 'PROCESSING_UNIT', 'district': 'Nalgonda', 'state': 'Telangana',
             'lat': 17.0600, 'lon': 79.2700, 'crops': ['Tomato'], 'qty': 10000,
             'price': 18, 'quality': 'B', 'verified': True, 'rating': 4.2, 'trust': 85,
             'output': ['Ketchup', 'Puree', 'Paste'], 'capacity': 5000},
            {'name': 'Deccan Dehydration Unit', 'type': 'PROCESSING_UNIT', 'district': 'Karimnagar', 'state': 'Telangana',
             'lat': 18.4400, 'lon': 79.1300, 'crops': ['Tomato', 'Onion', 'Chilli'], 'qty': 8000,
             'price': 15, 'quality': 'B', 'verified': True, 'rating': 3.9, 'trust': 80,
             'output': ['Dried Powder', 'Flakes'], 'capacity': 3000},
            {'name': 'Sai Rice Mill', 'type': 'PROCESSING_UNIT', 'district': 'Nizamabad', 'state': 'Telangana',
             'lat': 18.6800, 'lon': 78.1000, 'crops': ['Rice'], 'qty': 20000,
             'price': 28, 'quality': 'ANY', 'verified': True, 'rating': 4.1, 'trust': 82,
             'output': ['Polished Rice', 'Rice Flour'], 'capacity': 10000},
            # Cold Storage
            {'name': 'Hyderabad Cold Chain', 'type': 'STORAGE', 'district': 'Hyderabad', 'state': 'Telangana',
             'lat': 17.4100, 'lon': 78.4600, 'crops': ['Tomato', 'Onion', 'Chilli'], 'qty': 0,
             'price': 0, 'quality': 'ANY', 'verified': True, 'rating': 4.0, 'trust': 75},
            # Input Shops
            {'name': 'Sri Lakshmi Seeds & Fertilizers', 'type': 'INPUT_SHOP', 'district': 'Nalgonda', 'state': 'Telangana',
             'lat': 17.0550, 'lon': 79.2650, 'crops': ['Tomato', 'Rice', 'Cotton'], 'qty': 0,
             'price': 0, 'quality': 'ANY', 'verified': True, 'rating': 4.3, 'trust': 80},
            {'name': 'Rythula Mithra Agro Store', 'type': 'INPUT_SHOP', 'district': 'Warangal', 'state': 'Telangana',
             'lat': 17.9750, 'lon': 79.5900, 'crops': ['Tomato', 'Chilli', 'Cotton'], 'qty': 0,
             'price': 0, 'quality': 'ANY', 'verified': False, 'rating': 3.8, 'trust': 65},
            # Transport
            {'name': 'Mahalaxmi Transport', 'type': 'TRANSPORT', 'district': 'Hyderabad', 'state': 'Telangana',
             'lat': 17.4200, 'lon': 78.4400, 'crops': [], 'qty': 0,
             'price': 0, 'quality': 'ANY', 'verified': True, 'rating': 4.1, 'trust': 78},
        ]

        for b in buyers:
            NearbyBuyer.objects.create(
                name=b['name'],
                buyer_type=b['type'],
                district=b['district'],
                state=b['state'],
                latitude=b['lat'],
                longitude=b['lon'],
                crops_required=b['crops'],
                weekly_requirement_kg=b['qty'] if b['qty'] > 0 else None,
                offered_price_per_kg=b['price'] if b['price'] > 0 else None,
                quality_required=b['quality'],
                is_verified=b['verified'],
                rating=b['rating'],
                trust_score=b['trust'],
                output_products=b.get('output', []),
                processing_capacity_kg_day=b.get('capacity'),
            )
        self.stdout.write(f'  Created {len(buyers)} nearby buyer/entity records.')
