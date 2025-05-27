#!/home/zam/ai_agent/ai_day/myenv/bin/python


from fastapi import FastAPI, Request, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from service import ai_survey, has_taken_competency_test, general_chat_response, get_user_level_score, run_conversation
from typing import Dict, List

app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Hello Worl

# In-memory cache
user_status_cache: Dict[str, bool] = {}

class ChatInput(BaseModel):
    tm_id: str
    message: str
    answers: list[str] = []
    chat_history: List[Dict[str, str]] = []

# Define the security scheme
bearer_scheme = HTTPBearer()

# Token validation logic (you can enhance this)
def verify_token(credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme)):
    token = credentials.credentials
    if token != "SDDFDSFn1232evje34fnc4SDASDSF5vuiqSDFabcj678ksbcjbnsjka89SDFDS898sdf":  # Replace with your token validation logic
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or missing token",
        )
    return token

@app.post("/chat")
def chat_logic(payload: ChatInput, token: str = Depends(verify_token)):
    tm_id = payload.tm_id

    if tm_id not in user_status_cache:
        user_status_cache[tm_id] = has_taken_competency_test(tm_id)

    if not user_status_cache[tm_id]:
        result = ai_survey(payload.answers, tm_id)
        if result["competency_status"] == "complete":
            user_status_cache[tm_id] = True
        return result

    level, score = get_user_level_score(tm_id)

    return {
        "status": "success",
        "level": level,
        "score": score,
        "competency_status": "complete",
        #"message": general_chat_response(payload.message, level)
        "message": run_conversation(payload.chat_history, payload.message, level, tm_id)
    }
