"""
Marketplace: Views — listings and buyer requests.
"""
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status as drf_status

from core.utils import success_response, error_response
from .models import CropListing, BuyerRequest
from .serializers import CropListingSerializer, BuyerRequestSerializer


# ─── Listings ─────────────────────────────────────────────────────────────────

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def listing_list(request):
    if request.method == 'GET':
        qs = CropListing.objects.filter(is_active=True)
        if crop := request.query_params.get('crop'):
            qs = qs.filter(crop_name__icontains=crop)
        if district := request.query_params.get('district'):
            qs = qs.filter(district__icontains=district)
        return success_response(CropListingSerializer(qs[:50], many=True).data)

    serializer = CropListingSerializer(data=request.data)
    if not serializer.is_valid():
        return error_response('Validation failed.', serializer.errors)
    listing = serializer.save(farmer=request.user)
    return success_response(CropListingSerializer(listing).data, 'Listing created.', drf_status.HTTP_201_CREATED)


@api_view(['GET', 'PUT', 'PATCH', 'DELETE'])
@permission_classes([IsAuthenticated])
def listing_detail(request, pk):
    try:
        listing = CropListing.objects.get(pk=pk)
    except CropListing.DoesNotExist:
        return error_response('Listing not found.', status_code=drf_status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        return success_response(CropListingSerializer(listing).data)

    if listing.farmer != request.user:
        return error_response('Not authorized.', status_code=drf_status.HTTP_403_FORBIDDEN)

    if request.method == 'DELETE':
        listing.delete()
        return success_response(message='Listing deleted.')

    serializer = CropListingSerializer(listing, data=request.data, partial=(request.method == 'PATCH'))
    if not serializer.is_valid():
        return error_response('Validation failed.', serializer.errors)
    serializer.save()
    return success_response(serializer.data, 'Listing updated.')


# ─── Buyer Requests ───────────────────────────────────────────────────────────

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def submit_request(request, listing_id):
    """Buyer submits a purchase request on a listing."""
    try:
        listing = CropListing.objects.get(pk=listing_id, is_active=True)
    except CropListing.DoesNotExist:
        return error_response('Listing not found.', status_code=drf_status.HTTP_404_NOT_FOUND)

    serializer = BuyerRequestSerializer(data=request.data)
    if not serializer.is_valid():
        return error_response('Validation failed.', serializer.errors)

    req = serializer.save(listing=listing, buyer=request.user)
    return success_response(BuyerRequestSerializer(req).data, 'Request submitted.', drf_status.HTTP_201_CREATED)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_requests(request):
    """Farmer views all requests on their listings."""
    reqs = BuyerRequest.objects.filter(listing__farmer=request.user)
    return success_response(BuyerRequestSerializer(reqs, many=True).data)
