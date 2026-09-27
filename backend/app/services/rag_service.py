from langchain_huggingface import HuggingFaceEmbeddings
from langchain_chroma import Chroma
from langchain_core.documents import Document
from langchain_ollama import ChatOllama


CHROMA_PATH = "./data/chroma"


embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)


def get_vectorstore():

    vectorstore = Chroma(
        collection_name="documents",
        embedding_function=embeddings,
        persist_directory=CHROMA_PATH
    )

    return vectorstore


def add_chunks(chunks):

    vectorstore = get_vectorstore()

    documents = []

    for chunk in chunks:

        document = Document(
            page_content=chunk["text"],
            metadata={
                "page": chunk["page"]
            }
        )

        documents.append(document)

    vectorstore.add_documents(
        documents
    )

    return len(documents)


def search_documents(
    question: str,
    k: int = 4
):

    vectorstore = get_vectorstore()

    results = vectorstore.similarity_search(
        question,
        k=k
    )

    return results

def ask_question(question: str):

    results = search_documents(
        question,
        k=4
    )

    if not results:

        return {
            "answer": "I could not find relevant information in the uploaded document.",
            "sources": []
        }

    context_parts = []

    for document in results:

        page = document.metadata.get("page")

        text = document.page_content

        context_parts.append(
            f"[Page {page}]\n{text}"
        )

    context = "\n\n".join(context_parts)

    prompt = f"""
You are a document question-answering assistant.

Answer the user's question using ONLY the information
provided in the document context below.

Rules:

1. Do not use outside knowledge.
2. Do not make up information.
3. If the answer is not present in the context,
   say: "I could not find that information in the document."
4. Give a clear and concise answer.
5. Use the document context as your source.

DOCUMENT CONTEXT:

{context}

USER QUESTION:

{question}

ANSWER:
"""

    llm = ChatOllama(
        model="llama3.2:3b",
        temperature=0
    )

    response = llm.invoke(prompt)

    sources = []

    for document in results:

        page = document.metadata.get("page")

        if page not in sources:
            sources.append(page)

    return {
        "answer": response.content,
        "sources": sources
    }