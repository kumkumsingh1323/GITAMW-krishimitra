"""
AI Services: Views.
"""
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from core.utils import success_response, error_response
from .services import analyze_disease, parse_voice_intent, detect_surplus_opportunity


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def disease_detect(request):
    """
    POST /api/ai/disease-detect/
    Body: { "crop": "Tomato", "image_url": "<firebase-storage-url>" }
    Returns disease analysis advisory.
    """
    crop = request.data.get('crop')
    image_url = request.data.get('image_url', '')

    if not crop:
        return error_response('"crop" field is required.')

    result = analyze_disease(crop, image_url)
    return success_response(result)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def voice_assistant(request):
    """
    POST /api/ai/voice/
    Body: { "text": "Na daggara 500 kg tomato undi, ammali." }
    Returns structured intent.
    """
    text = request.data.get('text', '').strip()
    if not text:
        return error_response('"text" field is required.')

    result = parse_voice_intent(text)
    return success_response(result)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def surplus_detect(request):
    """
    GET /api/ai/surplus/
    Query params: crop, supply_index, demand_index
    """
    crop = request.query_params.get('crop')
    if not crop:
        return error_response('"crop" query param is required.')
    try:
        supply = int(request.query_params.get('supply_index', 70))
        demand = int(request.query_params.get('demand_index', 50))
    except ValueError:
        return error_response('supply_index and demand_index must be integers.')

    result = detect_surplus_opportunity(crop, supply, demand)
    return success_response(result)
