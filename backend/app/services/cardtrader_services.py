from dotenv import load_dotenv

import os
import requests


load_dotenv()

BASE_URL = "https://api.cardtrader.com/api/v2"
AUTH_TOKEN = os.getenv("CARDTRADER_API_KEY")

HEADERS = {
    "Authorization": f"Bearer {AUTH_TOKEN}"
}

def get_info():
    response = requests.get(f"{BASE_URL}/info", headers=HEADERS)
    response.raise_for_status()
    return response.json()

def fetch_card_data(name: str) -> dict:
    url = f'https://www.cardmarket.com/en/Magic/Products/Search?searchString={name}'

    response = requests.get(url)
    return {
        'name': name,
        'price': 0.0,
        'url': url
    }