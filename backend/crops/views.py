"""
Crops: CRUD views for farmer's crop inventory.
"""
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from core.utils import success_response, error_response
from .models import Crop
from .serializers import CropSerializer


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def crop_list(request):
    """
    GET  /api/crops/          — List all crops for the current farmer
    POST /api/crops/          — Add a new crop
    """
    if request.method == 'GET':
        crops = Crop.objects.filter(farmer=request.user)
        # Optional filter by status
        status_filter = request.query_params.get('status')
        if status_filter:
            crops = crops.filter(status=status_filter)
        return success_response(CropSerializer(crops, many=True).data)

    serializer = CropSerializer(data=request.data)
    if not serializer.is_valid():
        return error_response('Validation failed.', serializer.errors)
    crop = serializer.save(farmer=request.user)
    return success_response(CropSerializer(crop).data, 'Crop added.', status.HTTP_201_CREATED)


@api_view(['GET', 'PUT', 'PATCH', 'DELETE'])
@permission_classes([IsAuthenticated])
def crop_detail(request, pk):
    """
    GET    /api/crops/<id>/  — Retrieve
    PUT    /api/crops/<id>/  — Full update
    PATCH  /api/crops/<id>/  — Partial update
    DELETE /api/crops/<id>/  — Delete
    """
    try:
        crop = Crop.objects.get(pk=pk, farmer=request.user)
    except Crop.DoesNotExist:
        return error_response('Crop not found.', status_code=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        return success_response(CropSerializer(crop).data)

    if request.method == 'DELETE':
        crop.delete()
        return success_response(message='Crop deleted.')

    serializer = CropSerializer(crop, data=request.data, partial=(request.method == 'PATCH'))
    if not serializer.is_valid():
        return error_response('Validation failed.', serializer.errors)
    serializer.save()
    return success_response(serializer.data, 'Crop updated.')
