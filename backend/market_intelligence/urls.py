from django.urls import path
from . import views

urlpatterns = [
    path('prices/', views.market_prices, name='market-prices'),
    path('trends/', views.price_trends, name='market-trends'),
    path('recommendation/', views.smart_recommendation, name='smart-recommendation'),
    path('buyers/', views.nearby_buyers, name='nearby-buyers'),
    path('district-summary/', views.district_summary, name='district-summary'),
]
