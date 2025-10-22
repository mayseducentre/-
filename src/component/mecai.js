import React, { useState, useEffect, useRef } from "react";
import { pipeline, env } from "@xenova/transformers";

// ✅ Ensure model files and wasm load from CDN
env.allowLocalModels = false;
env.localModelPath = undefined;
env.backends.onnx.wasm.wasmPaths =
  "https://cdn.jsdelivr.net/npm/@xenova/transformers@2.14.0/dist/";

export default function MecAi() {
  const [generator, setGenerator] = useState(null);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Load model at startup
  useEffect(() => {
    async function loadModel() {
      try {
        console.log("⏳ Loading model...");
        const pipe = await pipeline(
          "text-generation",
          // ⚡ much smaller model that always loads fast
          "Xenova/tiny-random-gpt2"
        );
        setGenerator(pipe);
        console.log("✅ Model loaded!");
      } catch (err) {
        console.error("Model failed:", err);
        alert("Failed to load model. Try refreshing or use Chrome desktop.");
      } finally {
        setLoading(false);
      }
    }
    loadModel();
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages((m) => [...m, { role: "user", text: input }]);
    setInput("");

    if (!generator) {
      setMessages((m) => [...m, { role: "ai", text: "⏳ Model still loading..." }]);
      return;
    }

    try {
      const output = await generator(input, {
        max_new_tokens: 50,
        temperature: 0.8,
      });
      const text =
        output?.[0]?.generated_text?.replace(input, "").trim() ||
        "🤖 (no response)";
      setMessages((m) => [...m, { role: "ai", text }]);
    } catch (err) {
      console.error(err);
      setMessages((m) => [
        ...m,
        { role: "ai", text: "⚠️ Error generating text." },
      ]);
    }
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
        <h2 style={{ textAlign: "center" }}>🤖 MECAI</h2>

        <div style={{ flex: 1, overflowY: "auto", marginBottom: "10px" }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ textAlign: msg.role === "user" ? "right" : "left" }}>
              <div
                style={{
                  display: "inline-block",
                  background: msg.role === "user" ? "#DCF8C6" : "#F1F0F0",
                  padding: "10px 15px",
                  borderRadius: "15px",
                  margin: "4px 0",
                }}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <p style={{ textAlign: "center", color: "#999" }}>
              ⏳ Loading MECAI brain...
            </p>
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
