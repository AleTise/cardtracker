from pydantic import BaseModel


class Expansion(BaseModel):
    id: int
    name: str
    game_id: int