from fastapi import APIRouter
from typing import List, Optional

from app.models.card import CardRequest, CardResponse
from app.models.expansion import Expansion
from app.models.game import Game
from app.models.category import Category
from app.models.blueprint import Blueprint
from app.models.product import Product

from app.services.cardtrader_services import (
    get_info,
    fetch_card_data,
    get_games,
    get_categories,
    get_expansions,
    get_blueprints,
    get_products
)


router = APIRouter()

@router.get('/info')
def fetch_info():
    return get_info()

@router.post('/cardtrader', response_model= CardResponse)
def get_card_price(request: CardRequest):
    data = fetch_card_data(request.name)
    return data

@router.get('/games', response_model= List[Game])
def games():
    raw = get_games()
    game_list = raw.get('array', [])
    return [Game(**g) for g in game_list]


@router.get('/categories', response_model= List[Category])
def categories():
    return [Category(**c) for c in get_categories()]

@router.get('/expansions', response_model= List[Expansion])
def expansions():
    return [Expansion(**e) for e in get_expansions()]

@router.get('/blueprints', response_model= List[Blueprint])
def blueprints(expansion_id: int):
    return [Blueprint(**b) for b in get_blueprints(expansion_id)]

@router.get('/products', response_model= List[Product])
def products(expansion_id: int = None, blueprint_id: int = None, foil: bool = None, language: str = None):
    raw_products = get_products(expansion_id, blueprint_id, foil, language)

    cleaned_products = []

    for product_list in raw_products.values():
        for p in product_list:
            price_data = p.get('price', {})

            p['price'] = price_data.get('value', 0.0)
            p['graded'] = p.get('graded', False)

            if p.get('description') is None:
                p['description'] = ''

            cleaned_products.append(p)

    return [Product(**p) for p in cleaned_products]