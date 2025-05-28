from app.auth.Auth import verify_password, get_password_hash, create_access_token
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from .api import cardtrader
from fastapi.security import OAuth2PasswordRequestForm
from app.schemas import UserCreate


fake_user = {
    'username': 'test@gmail.com',
    'password': get_password_hash('Password123!')
}

user_db = {}

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post('/token')
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    hashed_pw = user_db.get(form_data.username)

    if not hashed_pw or not verify_password(form_data.password, hashed_pw):
        raise HTTPException(status_code= 400, detail= 'Invalid credentials!')
    
    access_token = create_access_token({'sub': form_data.username})
    return {'access_token': access_token, 'token_type': 'bearer'}

@app.post('/register')
def register(user: UserCreate):
    if user.username in user_db:
        raise HTTPException(status_code= 400, detail= 'User already exist!')
    
    user_db[user.username] = get_password_hash(user.password)
    return {'msg': 'User created.'}

app.include_router(cardtrader.router)