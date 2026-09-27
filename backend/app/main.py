from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.upload import router as upload_router
from app.routes.chat import router as chat_router


app = FastAPI(
    title="RAG Document Q&A Assistant",
    description="Ask questions about uploaded PDF documents",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        "http://localhost:5173"
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)


app.include_router(
    upload_router
)

app.include_router(
    chat_router
)


@app.get("/")
def root():

    return {
        "message": "RAG Document Q&A API is running"
    }


@app.get("/health")
def health():

    return {
        "status": "healthy"
    }