# RAG Document Q&A Assistant

An AI-powered document question-answering application that allows users
to upload PDF documents and ask questions about their content.

The system uses Retrieval-Augmented Generation (RAG) to retrieve relevant
document chunks and generate answers using a local LLM.

## Features

- PDF document upload
- PDF text extraction
- Intelligent document chunking
- Semantic search
- Local Hugging Face embeddings
- ChromaDB vector database
- Local Llama 3.2 3B LLM
- Ollama integration
- FastAPI REST API
- React frontend
- Source page references
- No OpenAI API credits required
- Responsive dashboard UI

## Architecture

```text
React Frontend
      |
      | Axios
      ↓
FastAPI Backend
      |
      ├── PDF Extraction
      |
      ├── Text Chunking
      |
      ├── Hugging Face Embeddings
      |
      ↓
   ChromaDB
      |
      | Similarity Search
      ↓
Relevant Document Chunks
      |
      ↓
Ollama
      |
      ↓
Llama 3.2 3B
      |
      ↓
Generated Answer
      |
      ↓
React UI
