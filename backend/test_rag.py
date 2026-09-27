from app.services.rag_service import ask_question


question = "What is the main purpose of the VISION project?"


result = ask_question(question)


print("\n======================")
print("ANSWER")
print("======================")

print(result["answer"])


print("\n======================")
print("SOURCES")
print("======================")

print(result["sources"])