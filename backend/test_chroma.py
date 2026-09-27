from app.services.rag_service import get_vectorstore

vectorstore = get_vectorstore()

print("Chroma vector store connected successfully!")