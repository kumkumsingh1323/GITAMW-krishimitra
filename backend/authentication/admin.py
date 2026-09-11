from django.contrib import admin
from .models import KrishaMitraUser


@admin.register(KrishaMitraUser)
class KrishaMitraUserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email', 'mobile', 'role', 'is_verified', 'profile_complete', 'date_joined']
    list_filter = ['role', 'is_verified', 'profile_complete']
    search_fields = ['username', 'email', 'mobile', 'first_name']
