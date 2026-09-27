from app.services.rag_service import search_documents


question = "What is machine learning?"


results = search_documents(
    question,
    k=4
)


print("Number of results:", len(results))


for i, document in enumerate(results):

    print("\n======================")
    print("Result:", i + 1)
    print("======================")

    print("Page:", document.metadata.get("page"))

    print("\nContent:")
    print(document.page_content[:500])