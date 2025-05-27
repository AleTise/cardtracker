from pydantic import BaseModel
from typing import Optional


class Product(BaseModel):
    id: int
    blueprint_id: int
    name_en: str
    quantity: int
    price: float
    description: str
    graded: Optional[bool] = False
    on_vacation: bool
    bundle_size: int