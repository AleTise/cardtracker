from fastapi import APIRouter
from app.services.cardtrader_services import get_info, fetch_card_data
from app.models.card import CardRequest, CardResponse


router = APIRouter()

@router.get("/info")
def fetch_info():
    return get_info()

@router.post('/cardtrader', response_model= CardResponse)
def get_card_price(request: CardRequest):
    data = fetch_card_data(request.name)
    return data