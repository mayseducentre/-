import React, { useState, useRef, useEffect } from "react";

export default function CreativeStudio() {
  const tools = [
    "Paint",
    "Story",
    "Music",
    "Poster",
    "Code",
    "Tasks"
  ];

  const [activeTool, setActiveTool] = useState("Paint");

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>🎨 Ultimate Creative Studio</h1>
      <p style={styles.subtitle}>
        Create, design, compose music, write stories, code projects, and manage tasks—all in one studio.
      </p>

      {/* Toolbar */}
      <div style={styles.toolbar}>
        {tools.map(tool => (
          <button
            key={tool}
            onClick={() => setActiveTool(tool)}
            style={{
              ...styles.tab,
              ...(activeTool === tool ? styles.activeTab : {})
            }}
          >
            {tool}
          </button>
        ))}
      </div>

      {/* Tool Area */}
      <div style={styles.toolArea}>
        {activeTool === "Paint" && <PaintTool />}
        {activeTool === "Story" && <StoryTool />}
        {activeTool === "Music" && <MusicTool />}
        {activeTool === "Poster" && <PosterTool />}
        {activeTool === "Code" && <CodeTool />}
        {activeTool === "Tasks" && <TasksTool />}
      </div>
    </div>
  );
}

/* -------------------- PAINT TOOL -------------------- */
function PaintTool() {
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);
  const [drawing, setDrawing] = useState(false);
  const [color, setColor] = useState("#ff7b00");
  const [size, setSize] = useState(3);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.lineJoin = "round";
    context.lineCap = "round";
    context.lineWidth = size;
    context.strokeStyle = color;
    setCtx(context);
  }, [color, size]);

  const start = (e) => {
    setDrawing(true);
    ctx.beginPath();
    const rect = e.target.getBoundingClientRect();
    ctx.moveTo(
      (e.clientX - rect.left) * (e.target.width / rect.width),
      (e.clientY - rect.top) * (e.target.height / rect.height)
    );
  };

  const draw = (e) => {
    if (!drawing) return;
    const rect = e.target.getBoundingClientRect();
    ctx.lineTo(
      (e.clientX - rect.left) * (e.target.width / rect.width),
      (e.clientY - rect.top) * (e.target.height / rect.height)
    );
    ctx.stroke();
  };

  const stop = () => setDrawing(false);

  const clearCanvas = () => ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

  return (
    <div>
      <div style={styles.paintControls}>
        <input type="color" value={color} onChange={e => setColor(e.target.value)} />
        <input type="range" min="1" max="10" value={size} onChange={e => setSize(e.target.value)} />
        <button onClick={clearCanvas} style={styles.button}>Clear</button>
      </div>
      <canvas
        ref={canvasRef}
        width={800}
        height={400}
        style={styles.canvas}
        onMouseDown={start}
        onMouseMove={draw}
        onMouseUp={stop}
        onMouseLeave={stop}
        onTouchStart={(e)=>{e.preventDefault(); start(e.touches[0]);}}
        onTouchMove={(e)=>{e.preventDefault(); draw(e.touches[0]);}}
        onTouchEnd={stop}
      />
    </div>
  );
}

/* -------------------- STORY TOOL -------------------- */
function StoryTool() {
  const [story, setStory] = useState(localStorage.getItem("studio_story") || "");
  const saveStory = () => { localStorage.setItem("studio_story", story); alert("Story saved!"); };

  return (
    <div>
      <textarea
        style={styles.textarea}
        value={story}
        onChange={e=>setStory(e.target.value)}
        placeholder="Write your story..."
      />
      <button style={styles.button} onClick={saveStory}>Save Story</button>
    </div>
  );
}

/* -------------------- MUSIC TOOL -------------------- */
function MusicTool() {
  const notes = [261, 293, 329, 349, 392, 440, 493];
  const playNote = (freq) => {
    const audio = new (window.AudioContext||window.webkitAudioContext)();
    const osc = audio.createOscillator();
    osc.frequency.value = freq;
    osc.connect(audio.destination);
    osc.start();
    osc.stop(audio.currentTime+0.2);
  };
  return (
    <div style={styles.musicGrid}>
      {notes.map((n,i)=><div key={i} style={styles.musicPad} onClick={()=>playNote(n)}>Note {i+1}</div>)}
    </div>
  );
}

/* -------------------- POSTER TOOL -------------------- */
function PosterTool() {
  const [text, setText] = useState("Drag Me");
  const [pos, setPos] = useState({x:50, y:50});
  const dragging = useRef(false);

  const startDrag = () => dragging.current = true;
  const stopDrag = () => dragging.current = false;
  const onDrag = (e)=>{
    if(!dragging.current) return;
    setPos({x:e.nativeEvent.offsetX-40, y:e.nativeEvent.offsetY-10});
  };

  return (
    <div>
      <input style={styles.input} value={text} onChange={e=>setText(e.target.value)} />
      <div style={styles.posterArea} onMouseMove={onDrag} onMouseUp={stopDrag}>
        <div style={{...styles.draggableText, left:pos.x, top:pos.y}} onMouseDown={startDrag}>{text}</div>
      </div>
    </div>
  );
}

/* -------------------- CODE TOOL -------------------- */
function CodeTool() {
  const [code, setCode] = useState("// Write JS/HTML/CSS here\n");
  const [output, setOutput] = useState("");

  const runCode = () => {
    const iframe = document.getElementById("codePreview");
    iframe.contentDocument.open();
    iframe.contentDocument.write(code);
    iframe.contentDocument.close();
  };

  return (
    <div>
      <textarea style={styles.textarea} value={code} onChange={e=>setCode(e.target.value)} />
      <button style={styles.button} onClick={runCode}>Run Code</button>
      <iframe id="codePreview" style={styles.iframe}></iframe>
    </div>
  );
}

/* -------------------- TASKS TOOL -------------------- */
function TasksTool() {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("studio_tasks")||"[]"));
  const [task, setTask] = useState("");

  const addTask = ()=>{
    const newTasks = [...tasks, {text:task, done:false}];
    setTasks(newTasks);
    localStorage.setItem("studio_tasks", JSON.stringify(newTasks));
    setTask("");
  };
  const toggle = (i)=>{
    const newTasks = tasks.map((t,j)=> j===i ? {...t, done:!t.done} : t);
    setTasks(newTasks);
    localStorage.setItem("studio_tasks", JSON.stringify(newTasks));
  };

  return (
    <div>
      <div style={{display:"flex", marginBottom:10}}>
        <input style={styles.input} value={task} onChange={e=>setTask(e.target.value)} placeholder="New task..." />
        <button style={styles.button} onClick={addTask}>Add</button>
      </div>
      <ul>
        {tasks.map((t,i)=>
          <li key={i} onClick={()=>toggle(i)} style={{textDecoration:t.done?"line-through":"none", cursor:"pointer"}}>
            {t.text}
          </li>
        )}
      </ul>
    </div>
  );
}

/* -------------------- STYLES -------------------- */
const styles = {
  page:{padding:20,fontFamily:"Arial, sans-serif"},
  title:{fontSize:32,fontWeight:"800",marginBottom:5},
  subtitle:{color:"#555",marginBottom:20},
  toolbar:{display:"flex",flexWrap:"wrap",gap:10,marginBottom:20},
  tab:{padding:"8px 16px",borderRadius:8,border:"1px solid #ccc",background:"#fff",cursor:"pointer",fontWeight:600},
  activeTab:{background:"orange",color:"#fff",border:"1px solid orange"},
  toolArea:{padding:10},
  canvas:{border:"2px solid #ccc",borderRadius:8,background:"#fff",width:"100%",height:400},
  paintControls:{display:"flex",alignItems:"center",gap:10,marginBottom:10},
  button:{padding:"8px 16px",background:"orange",color:"#fff",border:"none",borderRadius:6,cursor:"pointer"},
  textarea:{width:"100%",height:200,padding:10,borderRadius:8,border:"1px solid #ccc",marginBottom:10,fontFamily:"monospace",fontSize:14},
  musicGrid:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(60px,1fr))",gap:10},
  musicPad:{padding:20,background:"#eee",borderRadius:8,textAlign:"center",cursor:"pointer",fontWeight:700},
  input:{flex:1,padding:8,borderRadius:6,border:"1px solid #ccc",marginRight:5},
  posterArea:{height:300,background:"#f5f5f5",position:"relative",borderRadius:8,border:"2px dashed #ccc"},
  draggableText:{position:"absolute",padding:"5px 10px",background:"orange",color:"#fff",borderRadius:6,cursor:"grab",fontWeight:"bold"},
  iframe:{width:"100%",height:300,border:"1px solid #ccc",borderRadius:6,marginTop:10}
};