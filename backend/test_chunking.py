from app.services.pdf_service import extract_text_from_pdf
from app.services.embedding_service import split_documents


pdf_path = "data/uploads/machine-learning.pdf"

pages = extract_text_from_pdf(pdf_path)

chunks = split_documents(pages)

print("Total pages:", len(pages))
print("Total chunks:", len(chunks))

for i, chunk in enumerate(chunks[:5]):

    print("\n-----------------------")
    print("Chunk:", i + 1)
    print("Page:", chunk["page"])
    print("-----------------------")

    print(chunk["text"][:300])