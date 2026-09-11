from django.contrib import admin
from .models import Crop


@admin.register(Crop)
class CropAdmin(admin.ModelAdmin):
    list_display = ['name', 'farmer', 'quantity_kg', 'quality_grade', 'status', 'harvest_date']
    list_filter = ['name', 'quality_grade', 'status']
    search_fields = ['name', 'variety', 'farmer__username']
