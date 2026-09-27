import { useRef, useState } from "react"
import { uploadPDF } from "../services/api"

function FileUpload({ onUploadSuccess }) {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [dragActive, setDragActive] = useState(false)

  const inputRef = useRef(null)

  const selectFile = (selectedFile) => {
    if (!selectedFile) return

    if (selectedFile.type !== "application/pdf") {
      setMessage("Please select a PDF file.")
      return
    }

    setFile(selectedFile)
    setMessage("")
  }

  const handleFileChange = (event) => {
    selectFile(event.target.files[0])
  }

  const handleDrop = (event) => {
    event.preventDefault()

    setDragActive(false)

    const droppedFile = event.dataTransfer.files[0]

    selectFile(droppedFile)
  }

  const handleDragOver = (event) => {
    event.preventDefault()
    setDragActive(true)
  }

  const handleDragLeave = () => {
    setDragActive(false)
  }

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a PDF first.")
      return
    }

    try {
      setLoading(true)
      setMessage("Processing your document...")

      const result = await uploadPDF(file)

      setMessage("Document processed successfully.")

      if (onUploadSuccess) {
        onUploadSuccess(result)
      }

    } catch (error) {
      console.error(error)

      setMessage(
        "Upload failed. Make sure the FastAPI backend is running."
      )

    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="upload-component">

      <div
        className={`drop-zone ${dragActive ? "drag-active" : ""}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => inputRef.current.click()}
      >

        <div className="upload-icon">
          ↑
        </div>

        <h3>
          {file ? file.name : "Drop your PDF here"}
        </h3>

        <p>
          {file
            ? `${(file.size / 1024 / 1024).toFixed(2)} MB`
            : "or click to browse from your computer"}
        </p>

        <span className="upload-hint">
          PDF files only · Your documents stay local
        </span>

        <input
          ref={inputRef}
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          hidden
        />

      </div>

      <button
        className="upload-button"
        onClick={handleUpload}
        disabled={loading || !file}
      >
        {loading ? (
          <>
            <span className="spinner"></span>
            Processing...
          </>
        ) : (
          <>
            Process Document
            <span>→</span>
          </>
        )}
      </button>

      {message && (
        <div
          className={`upload-message ${
            message.includes("failed") || message.includes("Please")
              ? "error"
              : ""
          }`}
        >
          {message}
        </div>
      )}

    </div>
  )
}

export default FileUpload