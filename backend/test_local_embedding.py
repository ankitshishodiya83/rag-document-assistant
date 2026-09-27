from langchain_huggingface import HuggingFaceEmbeddings


print("Loading embedding model...")

embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)


text = "Machine learning is a branch of artificial intelligence."


vector = embeddings.embed_query(text)


print("Embedding created successfully!")

print("Vector length:", len(vector))

print("First 5 values:", vector[:5])