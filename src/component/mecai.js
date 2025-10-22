import React, { useState, useRef } from "react";

export default function MecAi() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();

  const HF_TEXT_MODEL = "gpt2"; // Hugging Face text model
  const HF_IMAGE_MODEL = "nlpconnect/vit-gpt2-image-captioning";

  async function fetchFromHuggingFace(model, inputs) {
    const res = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inputs }),
    });
    return res.json();
  }

  async function fetchImageCaption(imageBase64) {
    const res = await fetch(`https://api-inference.huggingface.co/models/${HF_IMAGE_MODEL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inputs: imageBase64 }),
    });
    const data = await res.json();
    return data[0]?.generated_text || "Could not interpret image.";
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async () => {
    if (!input && !image) return;
    setLoading(true);

    const newUserMsg = { role: "user", text: input, image };
    setMessages((prev) => [...prev, newUserMsg]);

    let aiResponse = "";

    try {
      if (image) {
        aiResponse = await fetchImageCaption(image);
      } else {
        const data = await fetchFromHuggingFace(HF_TEXT_MODEL, input);
        aiResponse =
          data?.[0]?.generated_text?.replace(input, "").trim() ||
          "I couldn't generate a response.";
      }
    } catch (e) {
      aiResponse = "⚠️ Error reaching AI model.";
    }

    setMessages((prev) => [...prev, { role: "ai", text: aiResponse }]);
    setInput("");
    setImage(null);
    setLoading(false);
  };

  return (
    <div
      style={{
        fontFamily: "sans-serif",
        background: "#f7f7f8",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          width: "100%",
          maxWidth: "600px",
          height: "85vh",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          padding: "15px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "10px" }}>🤖 MECAI</h2>

        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                textAlign: msg.role === "user" ? "right" : "left",
                marginBottom: "10px",
              }}
            >
              {msg.image && (
                <img
                  src={msg.image}
                  alt="uploaded"
                  style={{
                    maxWidth: "150px",
                    borderRadius: "8px",
                    marginBottom: "5px",
                  }}
                />
              )}
              <div
                style={{
                  display: "inline-block",
                  background: msg.role === "user" ? "#DCF8C6" : "#F1F0F0",
                  padding: "10px 15px",
                  borderRadius: "15px",
                  maxWidth: "70%",
                }}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <p style={{ textAlign: "center", color: "#888" }}>Thinking...</p>
          )}
        </div>

        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={() => fileInputRef.current.click()}
            style={{
              background: "#007AFF",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "8px 12px",
              cursor: "pointer",
            }}
          >
            📷
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <input
            type="text"
            placeholder="Ask MECAI..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
          <button
            onClick={handleSend}
            style={{
              background: "#111827",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "10px 15px",
              cursor: "pointer",
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
