from app.services.pdf_service import extract_text_from_pdf
from app.services.embedding_service import split_documents
from app.services.rag_service import add_chunks


pdf_path = "data/uploads/machine-learning.pdf"


print("Reading PDF...")

pages = extract_text_from_pdf(pdf_path)

print("Pages extracted:", len(pages))


print("Splitting into chunks...")

chunks = split_documents(pages)

print("Chunks created:", len(chunks))


print("Adding chunks to Chroma...")

total_added = add_chunks(chunks)

print("Chunks added:", total_added)

print("Ingestion completed successfully!")