from fastapi import FastAPI
from .api import cardtrader


app = FastAPI()

app.include_router(cardtrader.router)