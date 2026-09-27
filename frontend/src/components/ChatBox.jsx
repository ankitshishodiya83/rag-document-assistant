import { useState } from "react"
import { askQuestion } from "../services/api"

function ChatBox() {
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [sources, setSources] = useState([])
  const [loading, setLoading] = useState(false)

  const handleAsk = async () => {
    if (!question.trim()) {
      return
    }

    try {
      setLoading(true)

      setAnswer("")
      setSources([])

      const result = await askQuestion(question)

      setAnswer(result.answer)
      setSources(result.sources || [])

    } catch (error) {
      console.error(error)

      setAnswer(
        "Something went wrong. Please check that the backend and Ollama are running."
      )

    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      handleAsk()
    }
  }

  return (
    <div className="chat-interface">

      {/* Welcome */}
      {!answer && !loading && (
        <div className="chat-empty">

          <div className="ai-orb">
            ✦
          </div>

          <h3>
            Ask anything about your document
          </h3>

          <p>
            I will search your uploaded document and generate
            an answer using the most relevant content.
          </p>

          <div className="example-questions">

            <button
              onClick={() =>
                setQuestion("What is the main purpose of this document?")
              }
            >
              What is the main purpose of this document?
            </button>

            <button
              onClick={() =>
                setQuestion("Summarize the important points.")
              }
            >
              Summarize the important points.
            </button>

            <button
              onClick={() =>
                setQuestion("What are the key technologies mentioned?")
              }
            >
              What technologies are mentioned?
            </button>

          </div>

        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="loading-response">

          <div className="ai-avatar">
            ✦
          </div>

          <div className="typing-area">

            <span></span>
            <span></span>
            <span></span>

          </div>

          <p>
            Searching document and generating answer...
          </p>

        </div>
      )}

      {/* Answer */}
      {answer && !loading && (
        <div className="answer-container">

          <div className="message-row">

            <div className="ai-avatar">
              ✦
            </div>

            <div className="answer-content">

              <div className="answer-header">
                <strong>DocMind AI</strong>
                <span>Generated locally</span>
              </div>

              <div className="answer-text">
                {answer}
              </div>

            </div>

          </div>

          {sources.length > 0 && (
            <div className="sources-container">

              <span className="sources-title">
                Sources
              </span>

              <div className="source-list">

                {sources.map((page, index) => (
                  <span
                    className="source-badge"
                    key={index}
                  >
                    Page {page}
                  </span>
                ))}

              </div>

            </div>
          )}

        </div>
      )}

      {/* Input */}
      <div className="chat-input-wrapper">

        <textarea
          value={question}
          onChange={(event) =>
            setQuestion(event.target.value)
          }
          onKeyDown={handleKeyDown}
          placeholder="Ask something about your document..."
          rows="1"
        />

        <button
          className="send-button"
          onClick={handleAsk}
          disabled={loading || !question.trim()}
        >
          ↑
        </button>

      </div>

      <div className="chat-footer">
        <span>Press Enter to ask</span>
        <span>Shift + Enter for new line</span>
      </div>

    </div>
  )
}

export default ChatBox