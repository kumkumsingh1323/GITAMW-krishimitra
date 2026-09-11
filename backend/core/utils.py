"""
Core: Shared API response helpers, permissions, and utilities.
"""
from rest_framework.response import Response
from rest_framework import permissions, status
import math


# ─── Standard Response Helpers ────────────────────────────────────────────────

def success_response(data=None, message='Success', status_code=status.HTTP_200_OK):
    return Response({'success': True, 'message': message, 'data': data}, status=status_code)


def error_response(message='Error', errors=None, status_code=status.HTTP_400_BAD_REQUEST):
    return Response({'success': False, 'message': message, 'errors': errors}, status=status_code)


# ─── Permissions ─────────────────────────────────────────────────────────────

class IsFarmer(permissions.BasePermission):
    """Allow access only to users with the FARMER role."""
    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            request.user.role == 'FARMER'
        )


class IsBuyer(permissions.BasePermission):
    """Allow access only to buyers (BUSINESS or RESTAURANT)."""
    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            request.user.role in ('BUSINESS', 'RESTAURANT', 'CUSTOMER')
        )


class IsAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            (request.user.role == 'ADMIN' or request.user.is_staff)
        )


class IsOwnerOrAdmin(permissions.BasePermission):
    """Object-level: only owner or admin may modify."""
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.user == request.user or request.user.is_staff


# ─── Distance Utility (Haversine) ─────────────────────────────────────────────

def haversine_km(lat1, lon1, lat2, lon2) -> float:
    """Return great-circle distance in kilometres between two GPS points."""
    R = 6371.0
    phi1, phi2 = math.radians(lat1), math.radians(lat2)
    dphi = math.radians(lat2 - lat1)
    dlam = math.radians(lon2 - lon1)
    a = math.sin(dphi / 2) ** 2 + math.cos(phi1) * math.cos(phi2) * math.sin(dlam / 2) ** 2
    return R * 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))


# ─── Transport Cost Estimate ──────────────────────────────────────────────────

def estimate_transport_cost(distance_km: float, quantity_kg: float) -> float:
    """
    Simple heuristic transport cost estimate.
    ₹2/km base rate + ₹0.5/km per 100 kg above 100 kg baseline.
    """
    base = 2.0 * distance_km
    weight_surcharge = max(0, (quantity_kg - 100) / 100) * 0.5 * distance_km
    return round(base + weight_surcharge, 2)
