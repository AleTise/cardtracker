from pydantic import BaseModel


class Blueprint(BaseModel):
    id: int
    name: str
    expansion_id: int
    category_id: int