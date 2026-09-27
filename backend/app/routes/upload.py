import os

from fastapi import APIRouter, UploadFile, File

from app.services.pdf_service import extract_text_from_pdf
from app.services.embedding_service import split_documents
from app.services.rag_service import add_chunks


router = APIRouter(
    prefix="/api"
)


UPLOAD_DIR = "data/uploads"

os.makedirs(
    UPLOAD_DIR,
    exist_ok=True
)


@router.post("/upload")
async def upload_pdf(
    file: UploadFile = File(...)
):

    # Read the uploaded file
    file_content = await file.read()

    # Check if file is empty
    if not file_content:
        return {
            "error": "Uploaded file is empty"
        }

    # Create the file path
    file_path = os.path.join(
        UPLOAD_DIR,
        file.filename
    )

    # Save the file
    with open(file_path, "wb") as buffer:
        buffer.write(file_content)

    # Extract PDF text
    pages = extract_text_from_pdf(
        file_path
    )

    # Split text into chunks
    chunks = split_documents(
        pages
    )

    # Add chunks to Chroma
    total_chunks = add_chunks(
        chunks
    )

    return {
        "filename": file.filename,
        "pages": len(pages),
        "chunks": total_chunks,
        "message": "PDF uploaded and processed successfully"
    }