from pydantic import BaseModel


class Game(BaseModel):
    id: int
    name: str
    display_name: str