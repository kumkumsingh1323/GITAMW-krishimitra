from django.urls import path
from . import views

urlpatterns = [
    path('disease-detect/', views.disease_detect, name='ai-disease-detect'),
    path('voice/', views.voice_assistant, name='ai-voice'),
    path('surplus/', views.surplus_detect, name='ai-surplus'),
]
