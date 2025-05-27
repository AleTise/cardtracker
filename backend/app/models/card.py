from pydantic import BaseModel


class CardRequest(BaseModel):
    name: str

class CardResponse(BaseModel):
    name: str
    price: float
    url: str