from fastapi import APIRouter
from pydantic import BaseModel

from app.services.rag_service import ask_question


router = APIRouter(
    prefix="/api"
)


class QuestionRequest(BaseModel):

    question: str


@router.post("/ask")
async def ask(
    request: QuestionRequest
):

    result = ask_question(
        request.question
    )

    return result