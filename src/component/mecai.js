import React, { useState, useRef, useEffect } from "react";
import { pipeline } from "@xenova/transformers";

export default function MecAi() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [generator, setGenerator] = useState(null);
  const fileRef = useRef();

  // Load the model once
  useEffect(() => {
    const loadModel = async () => {
      setLoading(true);
      const model = await pipeline("text-generation", "Xenova/distilgpt2");
      setGenerator(model);
      setLoading(false);
    };
    loadModel();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSend = async () => {
    if (!input && !image) return;

    const userMessage = { role: "user", text: input, image };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setImage(null);

    if (!generator) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "⏳ Model still loading, please wait..." },
      ]);
      return;
    }

    setLoading(true);

    try {
      let prompt = input;
      if (image) prompt = `Describe this image: ${input}`;

      const result = await generator(prompt, {
        max_new_tokens: 80,
        temperature: 0.8,
      });

      const aiText =
        result?.[0]?.generated_text?.replace(prompt, "").trim() ||
        "Hmm... I couldn’t think of a response.";

      setMessages((prev) => [...prev, { role: "ai", text: aiText }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "⚠️ Something went wrong." },
      ]);
    }

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
            onClick={() => fileRef.current.click()}
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
            ref={fileRef}
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
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
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
