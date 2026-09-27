import { useState } from "react"
import FileUpload from "./components/FileUpload"
import ChatBox from "./components/ChatBox"
import "./App.css"

function App() {
  const [documentInfo, setDocumentInfo] = useState(null)

  const handleUploadSuccess = (data) => {
    setDocumentInfo(data)
  }

  return (
    <div className="app-shell">

      {/* Sidebar */}
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">✦</div>

          <div>
            <h2>DocMind</h2>
            <span>AI Document Assistant</span>
          </div>
        </div>

        <div className="sidebar-section">
          <p className="sidebar-label">WORKSPACE</p>

          <div className="sidebar-item active">
            <span>▣</span>
            <span>Document Q&A</span>
          </div>

          <div className="sidebar-item">
            <span>◫</span>
            <span>Knowledge Base</span>
          </div>

          <div className="sidebar-item">
            <span>⚙</span>
            <span>Settings</span>
          </div>
        </div>

        <div className="sidebar-bottom">
          <div className="local-ai-card">
            <div className="status-dot"></div>

            <div>
              <strong>Local AI</strong>
              <p>Llama 3.2 · Ollama</p>
            </div>
          </div>

          <div className="sidebar-footer">
            <span>RAG Assistant</span>
            <span>v1.0</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">

        {/* Header */}
        <header className="topbar">
          <div>
            <p className="eyebrow">AI WORKSPACE</p>

            <h1>Document Intelligence</h1>

            <p className="subtitle">
              Upload a document and ask questions using AI-powered semantic search.
            </p>
          </div>

          <div className="header-status">
            <span className="online-dot"></span>
            System Online
          </div>
        </header>

        {/* Dashboard Stats */}
        <section className="stats-grid">

          <div className="stat-card">
            <div className="stat-icon purple">⌁</div>

            <div>
              <span>Documents</span>
              <strong>{documentInfo ? 1 : 0}</strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon blue">◫</div>

            <div>
              <span>Pages</span>
              <strong>{documentInfo?.pages || 0}</strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon green">✦</div>

            <div>
              <span>Knowledge Chunks</span>
              <strong>{documentInfo?.chunks || 0}</strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon orange">⚡</div>

            <div>
              <span>AI Model</span>
              <strong>3B</strong>
            </div>
          </div>

        </section>

        {/* Main Workspace */}
        <section className="workspace-grid">

          {/* Upload Panel */}
          <div className="panel upload-panel">

            <div className="panel-header">
              <div>
                <span className="panel-kicker">01 · DOCUMENT</span>
                <h2>Upload your PDF</h2>
              </div>

              <span className="secure-badge">
                Secure
              </span>
            </div>

            <p className="panel-description">
              Add a PDF and DocMind will extract, split and index its
              content for intelligent question answering.
            </p>

            <FileUpload onUploadSuccess={handleUploadSuccess} />

            {documentInfo && (
              <div className="document-success">

                <div className="success-icon">
                  ✓
                </div>

                <div>
                  <strong>{documentInfo.filename}</strong>

                  <p>
                    {documentInfo.pages} pages · {documentInfo.chunks} chunks
                  </p>
                </div>

                <div className="success-check">
                  Ready
                </div>

              </div>
            )}

          </div>

          {/* Chat Panel */}
          <div className="panel chat-panel">

            <div className="panel-header">

              <div>
                <span className="panel-kicker">02 · ASK AI</span>
                <h2>Ask your document</h2>
              </div>

              <div className="ai-badge">
                <span></span>
                AI Ready
              </div>

            </div>

            <ChatBox />

          </div>

        </section>

        {/* Technology strip */}
        <section className="technology-strip">

          <div>
            <span className="tech-label">POWERED BY</span>
          </div>

          <div className="tech-list">
            <span>React</span>
            <span>FastAPI</span>
            <span>LangChain</span>
            <span>ChromaDB</span>
            <span>Hugging Face</span>
            <span>Ollama</span>
          </div>

        </section>

      </main>
    </div>
  )
}

export default App