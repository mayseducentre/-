import React, { useState, useEffect, useRef } from "react";
import { pipeline, env } from "@xenova/transformers";

// Use official CDN for model files
env.allowLocalModels = false;
env.backends.onnx.wasm.wasmPaths = "https://cdn.jsdelivr.net/npm/@xenova/transformers@2.14.0/dist/";

export default function MecAi() {
  const [generator, setGenerator] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const fileRef = useRef();

  // Load model once at mount
  useEffect(() => {
    const loadModel = async () => {
      setLoading(true);
      try {
        const model = await pipeline("text-generation", "Xenova/distilgpt2");
        setGenerator(model);
      } catch (err) {
        console.error("Model load error:", err);
        alert("⚠️ Model failed to load. Check internet or refresh.");
      } finally {
        setLoading(false);
      }
    };
    loadModel();
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    setMessages((m) => [...m, userMsg]);
    setInput("");

    if (!generator) {
      setMessages((m) => [
        ...m,
        { role: "ai", text: "⏳ Model still loading, please wait..." },
      ]);
      return;
    }

    setLoading(true);
    try {
      const output = await generator(input, {
        max_new_tokens: 60,
        temperature: 0.8,
      });
      const aiText =
        output?.[0]?.generated_text?.replace(input, "").trim() ||
        "Hmm... no response.";
      setMessages((m) => [...m, { role: "ai", text: aiText }]);
    } catch (err) {
      console.error("Generation error:", err);
      setMessages((m) => [
        ...m,
        { role: "ai", text: "⚠️ Generation failed." },
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
          <input
            type="text"
            placeholder="Ask MECAI..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
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
