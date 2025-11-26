import React, { useState, useRef, useEffect } from "react";

export default function CreativeStudio() {
  const [activeTool, setActiveTool] = useState(null);

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>🎨 Creative Studio</h1>
      <p style={styles.subtitle}>Explore creativity through drawing, music, stories & design.</p>

      <div style={styles.grid}>

        <ToolCard label="Paint Tool" onClick={() => setActiveTool("paint")} />
        <ToolCard label="Story Maker" onClick={() => setActiveTool("story")} />
        <ToolCard label="Music Pad" onClick={() => setActiveTool("music")} />
        <ToolCard label="Poster Designer" onClick={() => setActiveTool("poster")} />

      </div>

      {activeTool === "paint" && <PaintTool onClose={() => setActiveTool(null)} />}
      {activeTool === "story" && <StoryMaker onClose={() => setActiveTool(null)} />}
      {activeTool === "music" && <MusicPad onClose={() => setActiveTool(null)} />}
      {activeTool === "poster" && <PosterDesigner onClose={() => setActiveTool(null)} />}
    </div>
  );
}

/* ------------------ TOOL CARD ------------------ */
function ToolCard({ label, onClick }) {
  return (
    <div style={styles.card} onClick={onClick}>
      <h3>{label}</h3>
    </div>
  );
}

/* ------------------ PAINT TOOL ------------------ */
function PaintTool({ onClose }) {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [ctx, setCtx] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.lineWidth = 3;
    context.lineJoin = "round";
    context.lineCap = "round";
    setCtx(context);
  }, []);

  const start = (e) => {
    setDrawing(true);
    ctx.beginPath();
    ctx.moveTo(
      e.nativeEvent.offsetX,
      e.nativeEvent.offsetY
    );
  };

  const draw = (e) => {
    if (!drawing) return;
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };

  const stop = () => setDrawing(false);

  return (
    <Modal title="Paint Tool" onClose={onClose}>
      <canvas
        ref={canvasRef}
        width={600}
        height={350}
        style={styles.canvas}
        onMouseDown={start}
        onMouseMove={draw}
        onMouseUp={stop}
        onMouseLeave={stop}
      />
    </Modal>
  );
}

/* ------------------ STORY MAKER ------------------ */
function StoryMaker({ onClose }) {
  const [story, setStory] = useState(localStorage.getItem("studio_story") || "");

  const saveStory = () => {
    localStorage.setItem("studio_story", story);
    alert("Story saved!");
  };

  return (
    <Modal title="Story Maker" onClose={onClose}>
      <textarea
        value={story}
        onChange={(e) => setStory(e.target.value)}
        style={styles.textarea}
        placeholder="Write your story here..."
      />

      <button style={styles.button} onClick={saveStory}>Save Story</button>
    </Modal>
  );
}

/* ------------------ MUSIC PAD ------------------ */
function MusicPad({ onClose }) {
  const playNote = (frequency) => {
    const audio = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audio.createOscillator();
    osc.frequency.value = frequency;
    osc.connect(audio.destination);
    osc.start();
    osc.stop(audio.currentTime + 0.2);
  };

  return (
    <Modal title="Music Pad" onClose={onClose}>
      <div style={styles.musicGrid}>
        {[261, 293, 329, 349, 392, 440, 493].map((freq, i) => (
          <div
            key={i}
            style={styles.musicPad}
            onClick={() => playNote(freq)}
          >
            Note {i + 1}
          </div>
        ))}
      </div>
    </Modal>
  );
}

/* ------------------ POSTER DESIGNER ------------------ */
function PosterDesigner({ onClose }) {
  const [text, setText] = useState("Drag Me");
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const dragging = useRef(false);

  const startDrag = () => (dragging.current = true);
  const stopDrag = () => (dragging.current = false);

  const onDrag = (e) => {
    if (!dragging.current) return;
    setPos({
      x: e.nativeEvent.offsetX - 40,
      y: e.nativeEvent.offsetY - 10,
    });
  };

  return (
    <Modal title="Poster Designer" onClose={onClose}>
      <input
        style={styles.input}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Poster text..."
      />

      <div
        style={styles.posterArea}
        onMouseMove={onDrag}
        onMouseUp={stopDrag}
      >
        <div
          style={{ ...styles.draggableText, left: pos.x, top: pos.y }}
          onMouseDown={startDrag}
        >
          {text}
        </div>
      </div>
    </Modal>
  );
}

/* ------------------ MODAL ------------------ */
function Modal({ title, children, onClose }) {
  return (
    <div style={styles.modalBackdrop}>
      <div style={styles.modal}>
        <div style={styles.modalHeader}>
          <h2>{title}</h2>
          <button style={styles.closeBtn} onClick={onClose}>✖</button>
        </div>

        <div style={styles.modalBody}>{children}</div>
      </div>
    </div>
  );
}

/* ------------------ STYLES ------------------ */
const styles = {
  page: {
    padding: 30,
    fontFamily: "Arial, sans-serif",
    background: "#f9f9f9",
    minHeight: "100vh"
  },
  title: {
    fontSize: 34,
    fontWeight: 800,
    color: "#222",
    marginBottom: 10
  },
  subtitle: { color: "#777", marginBottom: 30 },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 20
  },
  card: {
    padding: 25,
    borderRadius: 12,
    background: "white",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    cursor: "pointer",
    textAlign: "center",
    fontSize: 18,
    transition: "0.3s",
  },
  canvas: {
    border: "2px solid #ccc",
    borderRadius: 8,
    background: "white",
  },
  textarea: {
    width: "100%",
    height: 200,
    padding: 15,
    borderRadius: 10,
    border: "1px solid #ddd",
    fontSize: 16
  },
  button: {
    marginTop: 15,
    padding: "10px 18px",
    borderRadius: 8,
    background: "#ff7b00",
    color: "white",
    border: "none",
    cursor: "pointer",
    fontSize: 16
  },
  musicGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 20
  },
  musicPad: {
    background: "#eee",
    padding: 20,
    borderRadius: 10,
    textAlign: "center",
    cursor: "pointer",
    fontWeight: 700,
    transition: "0.2s",
  },
  input: {
    padding: 10,
    width: "100%",
    borderRadius: 8,
    border: "1px solid #ddd",
    marginBottom: 10,
    fontSize: 16
  },
  posterArea: {
    height: 300,
    background: "#fff",
    border: "2px dashed #ccc",
    borderRadius: 8,
    position: "relative"
  },
  draggableText: {
    position: "absolute",
    padding: "5px 12px",
    background: "#ff7b00",
    color: "#fff",
    borderRadius: 6,
    cursor: "grab",
    fontWeight: "bold"
  },
  modalBackdrop: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  modal: {
    width: "80%",
    maxWidth: 720,
    background: "white",
    borderRadius: 12,
    padding: 20,
    boxShadow: "0 6px 20px rgba(0,0,0,0.25)"
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  closeBtn: {
    border: "none",
    background: "transparent",
    fontSize: 22,
    cursor: "pointer"
  },
  modalBody: {
    marginTop: 20
  }
};