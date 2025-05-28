from dotenv import load_dotenv
from bs4 import BeautifulSoup

import os
import requests


load_dotenv()

BASE_URL = 'https://api.cardtrader.com/api/v2'
AUTH_TOKEN = os.getenv('CARDTRADER_API_KEY')

HEADERS = {
    "Authorization": f"Bearer {AUTH_TOKEN}"
}

def get_info():
    response = requests.get(f'{BASE_URL}/info', headers= HEADERS)
    response.raise_for_status()
    return response.json()

def fetch_card_data(name: str) -> dict:
    search_url = f'https://www.cardmarket.com/en/Magic/Products/Search?searchString={name}'

    response = requests.get(search_url, headers= {'User-Agent': 'Mozilla/5.0'})
    soup = BeautifulSoup(response.text, 'lxml')

    first_product = soup.select_one('.product-list-item')

    if not first_product:
        return {
            'name': name,
            'price': 0.0,
            'url': search_url
        }

    price_elem = first_product.select_one('.price-container span')
    price_text = price_elem.get_text(strip=True).replace('€', '').replace(',', '.') if price_elem else '0.0'

    try:
        price = float(price_text)
    except ValueError:
        price = 0.0

    return {
        'name': name,
        'price': price,
        'url': search_url
    }

def get_games():
    response = requests.get(f'{BASE_URL}/games', headers= HEADERS)
    response.raise_for_status()
    return response.json()

def get_categories():
    response = requests.get(f'{BASE_URL}/categories', headers= HEADERS)
    response.raise_for_status()
    return response.json()

def get_expansions():
    response = requests.get(f'{BASE_URL}/expansions', headers= HEADERS)
    response.raise_for_status()
    return response.json()

def get_blueprints(expansion_id: int):
    url = f'{BASE_URL}/blueprints/export?expansion_id={expansion_id}'
    
    response = requests.get(url, headers= HEADERS)
    response.raise_for_status()
    return response.json()

def get_products(expansion_id: int = None, blueprint_id: int = None, foil: bool = None, language: str = None):
    url = f'{BASE_URL}/marketplace/products'
    params = {k: v for k, v in {
        "expansion_id": expansion_id,
        "blueprint_id": blueprint_id,
        "foil": foil,
        "language": language,
    }.items() if v is not None}

    if expansion_id:
        params['expansion_id'] = expansion_id
    if blueprint_id:
        params['blueprint_id'] = blueprint_id
    if foil is not None:
        params['foil'] = str(foil).lower()
    if language:
        params['language'] = language

    response = requests.get(url, headers= HEADERS, params= params)
    response.raise_for_status()
    return response.json()