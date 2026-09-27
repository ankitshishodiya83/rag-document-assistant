# Start backend
Start-Process powershell -ArgumentList `
    "-NoExit", `
    "-Command", `
    "cd 'E:\rag-document-assistant\backend'; .\venv\Scripts\Activate.ps1; python -m fastapi dev app/main.py"

# Start frontend
Start-Process powershell -ArgumentList `
    "-NoExit", `
    "-Command", `
    "cd 'E:\rag-document-assistant\frontend'; npm run dev"