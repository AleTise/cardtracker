from app.auth.Auth import verify_password, get_passwoord_hash, create_access_token
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from .api import cardtrader
from fastapi.security import OAuth2PasswordRequestForm


fake_user = {
    'username': 'test@gmail.com',
    'password': get_passwoord_hash('Password123!')
}

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
    if form_data.username != fake_user['username'] or not verify_password(form_data.password, fake_user['password']):
        raise HTTPException(status_code= 400, detail= 'Not valid credentials!')
    
    access_token = create_access_token(data= {'sub': fake_user['username']})
    return {'access_token': access_token, 'token_type': 'bearer'}

app.include_router(cardtrader.router)