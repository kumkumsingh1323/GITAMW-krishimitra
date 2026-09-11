"""
AI Services: Mock endpoints for crop disease detection, voice assistant, and smart analysis.
These are advisory outputs — not medical/agricultural guarantees.
Replace with a real AI model (e.g., Google Gemini Vision) for production.
"""
import random
import logging

logger = logging.getLogger('krishamitra')

# ─── Disease Detection Mock ───────────────────────────────────────────────────

DISEASE_DATABASE = {
    'tomato': [
        {'disease': 'Early Blight (Alternaria solani)', 'confidence': 92,
         'severity': 'Moderate',
         'advisory': 'Apply Mancozeb or Chlorothalonil fungicide. Ensure proper spacing for air circulation. Remove affected lower leaves.'},
        {'disease': 'Late Blight (Phytophthora infestans)', 'confidence': 87,
         'severity': 'High',
         'advisory': 'Apply metalaxyl-based fungicide immediately. Avoid overhead irrigation. Monitor daily.'},
        {'disease': 'Leaf Curl Virus', 'confidence': 79,
         'severity': 'High',
         'advisory': 'Control whitefly vectors with imidacloprid. Remove infected plants to prevent spread.'},
    ],
    'cotton': [
        {'disease': 'Bollworm infestation', 'confidence': 90,
         'severity': 'High',
         'advisory': 'Apply Emamectin benzoate or Spinosad. Consider pheromone traps for monitoring.'},
        {'disease': 'Root rot (Fusarium)', 'confidence': 75,
         'severity': 'Moderate',
         'advisory': 'Improve field drainage. Apply Trichoderma-based biocontrol. Avoid waterlogging.'},
    ],
    'rice': [
        {'disease': 'Blast (Magnaporthe oryzae)', 'confidence': 94,
         'severity': 'High',
         'advisory': 'Apply tricyclazole or isoprothiolane. Avoid excess nitrogen. Maintain proper water level.'},
        {'disease': 'Brown Plant Hopper', 'confidence': 88,
         'severity': 'Moderate',
         'advisory': 'Apply buprofezin or pymetrozine. Avoid excessive nitrogen fertilization.'},
    ],
}


def analyze_disease(crop_name: str, image_url: str = None) -> dict:
    """Return mocked disease analysis for a given crop."""
    crop_key = crop_name.lower()
    diseases = DISEASE_DATABASE.get(crop_key, DISEASE_DATABASE['tomato'])
    result = random.choice(diseases).copy()
    result['crop'] = crop_name.title()
    result['image_analyzed'] = image_url or 'uploaded-image'
    result['disclaimer'] = (
        'This is an AI-assisted advisory result only. '
        'Consult a certified agronomist before taking action.'
    )
    return result


# ─── Voice / Text Intent Parser ──────────────────────────────────────────────

CROP_KEYWORDS = [
    'tomato', 'rice', 'cotton', 'chilli', 'onion', 'potato', 'maize', 'wheat',
    'groundnut', 'sugarcane', 'soybean', 'turmeric', 'mango', 'banana',
]

INTENT_KEYWORDS = {
    'sell': ['sell', 'ammali', 'bechna', 'sale', 'market', 'mandi', 'buyer'],
    'buy_input': ['buy', 'konnali', 'seeds', 'fertilizer', 'pesticide'],
    'check_price': ['price', 'rate', 'dhara', 'bhav', 'cost'],
    'weather': ['weather', 'rain', 'varsha', 'mausam', 'flood'],
    'disease': ['disease', 'pest', 'damage', 'rot', 'vyadi'],
}

UNIT_MAP = {'ton': 1000, 'tonne': 1000, 'quintal': 100, 'kg': 1, 'kilo': 1}


def parse_voice_intent(text: str) -> dict:
    """
    Parse a voice/text query into structured intent.
    Supports Telugu, Hindi, and English keywords (transliterated).
    """
    text_lower = text.lower()

    # Detect crop
    detected_crop = None
    for crop in CROP_KEYWORDS:
        if crop in text_lower:
            detected_crop = crop.title()
            break

    # Detect quantity
    detected_quantity = None
    import re
    qty_match = re.search(r'(\d+(?:\.\d+)?)\s*(ton|tonne|quintal|kg|kilo)', text_lower)
    if qty_match:
        amount = float(qty_match.group(1))
        unit = qty_match.group(2)
        detected_quantity = amount * UNIT_MAP.get(unit, 1)

    # Detect intent
    detected_intent = 'UNKNOWN'
    for intent, keywords in INTENT_KEYWORDS.items():
        if any(kw in text_lower for kw in keywords):
            detected_intent = intent.upper()
            break

    return {
        'original_text': text,
        'crop': detected_crop,
        'quantity_kg': detected_quantity,
        'intent': detected_intent,
        'parsed': detected_crop is not None or detected_intent != 'UNKNOWN',
        'message': (
            f'Intent: {detected_intent} | Crop: {detected_crop or "—"} | '
            f'Quantity: {detected_quantity or "—"} kg'
        ),
    }


# ─── Surplus Detection ────────────────────────────────────────────────────────

SURPLUS_OPPORTUNITIES = {
    'tomato': [
        {'product': 'Tomato Ketchup', 'min_grade': 'B', 'unit_type': 'PROCESSING_UNIT'},
        {'product': 'Tomato Puree / Paste', 'min_grade': 'B', 'unit_type': 'PROCESSING_UNIT'},
        {'product': 'Dehydrated Tomato Powder', 'min_grade': 'B', 'unit_type': 'PROCESSING_UNIT'},
        {'product': 'SHG Home Preservation', 'min_grade': 'A', 'unit_type': 'SHG'},
    ],
    'onion': [
        {'product': 'Dehydrated Onion Flakes', 'min_grade': 'B', 'unit_type': 'PROCESSING_UNIT'},
        {'product': 'Onion Powder', 'min_grade': 'B', 'unit_type': 'PROCESSING_UNIT'},
    ],
    'mango': [
        {'product': 'Mango Pulp / Juice', 'min_grade': 'B', 'unit_type': 'PROCESSING_UNIT'},
        {'product': 'Mango Pickle', 'min_grade': 'A', 'unit_type': 'SHG'},
        {'product': 'Aamchur (Dried Powder)', 'min_grade': 'B', 'unit_type': 'PROCESSING_UNIT'},
    ],
}


def detect_surplus_opportunity(crop_name: str, supply_index: int, demand_index: int) -> dict:
    """
    If supply > demand significantly, recommend processing opportunities.
    Only safe, sound, processing-grade produce is recommended.
    """
    crop_key = crop_name.lower()
    opportunities = SURPLUS_OPPORTUNITIES.get(crop_key, [])

    is_surplus = supply_index > demand_index + 10

    return {
        'crop': crop_name.title(),
        'supply_index': supply_index,
        'demand_index': demand_index,
        'is_surplus_detected': is_surplus,
        'fresh_market_advisory': (
            'Fresh market demand is lower than current supply. '
            'Consider exploring alternative channels.' if is_surplus
            else 'Fresh market conditions appear stable.'
        ),
        'processing_opportunities': opportunities if is_surplus else [],
        'note': (
            'Processing recommendations are for Grade B/C produce in good condition only. '
            'Rotten, mould-contaminated, or spoiled produce must NOT be used for food processing.'
        ),
    }
