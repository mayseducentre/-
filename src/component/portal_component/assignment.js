import React, { useState, useRef, useEffect } from "react";

// --- Main Component ---
export default function WordLearningApp({ passcode = "1234", storageKey = "word_learning_app_v2" }) {
  const [codeInput, setCodeInput] = useState("");
  const [unlocked, setUnlocked] = useState(() => JSON.parse(localStorage.getItem(storageKey + "_unlocked")) || false);
  const [theme, setTheme] = useState(() => localStorage.getItem(storageKey + "_theme") || "light");

  // --- Editor / Demo ---
  const editorRef = useRef(null);
  const [editorHTML, setEditorHTML] = useState(() => localStorage.getItem(storageKey + "_editorHTML") || "<p>Type here...</p>");
  const [fontSize, setFontSize] = useState(() => Number(localStorage.getItem(storageKey + "_fontSize")) || 16);

  // --- XP & Badges ---
  const [xp, setXp] = useState(() => Number(localStorage.getItem(storageKey + "_xp")) || 0);
  const [badges, setBadges] = useState(() => JSON.parse(localStorage.getItem(storageKey + "_badges") || "[]"));

  // --- Assignments ---
  const assignments = [
    "Define Microsoft Word and list three uses.",
    "Explain steps to make text bold, italic, and underlined.",
    "Describe how to align text left, center, and justify.",
    "Write a paragraph about your favourite subject and format it.",
    "Draw and label the toolbar showing Bold, Italic, Underline, Alignment, Bullets."
  ];

  // --- MCQ Quiz ---
  const mcqBank = [
    { q: "Shortcut for Bold text?", choices: ["Ctrl+B","Ctrl+I","Ctrl+U","Ctrl+S"], a:0 },
    { q: "Shortcut for Italic?", choices: ["Ctrl+I","Ctrl+B","Ctrl+U","Ctrl+K"], a:0 },
    { q: "Shortcut for Underline?", choices: ["Ctrl+U","Ctrl+I","Ctrl+B","Ctrl+Alt+U"], a:0 },
    { q: "Where is Page Layout tab?", choices:["Home","Insert","Layout","Review"], a:2},
    { q: "Which feature creates bullet lists?", choices:["Insert Table","Bullets","Track Changes","Header & Footer"], a:1 },
    { q: "Shortcut to Save document?", choices:["Ctrl+S","Ctrl+P","Ctrl+O","Ctrl+Shift+S"], a:0 },
    { q: "Which tab contains page orientation?", choices:["Home","Layout","Insert","View"], a:1},
    { q: "Shortcut for Undo?", choices:["Ctrl+Z","Ctrl+Y","Ctrl+X","Ctrl+C"], a:0 },
    { q: "Shortcut for Redo?", choices:["Ctrl+Y","Ctrl+Z","Ctrl+R","Ctrl+Shift+Z"], a:0 },
    { q: "To change font color?", choices:["Home tab","Insert tab","Review tab","View tab"], a:0},
    { q: "Insert Table is in?", choices:["Insert tab","Home tab","Layout tab","References tab"], a:0},
    { q: "Header/Footer is in?", choices:["Insert","View","Layout","Review"], a:0},
    { q: "Shortcut for Select All?", choices:["Ctrl+A","Ctrl+S","Ctrl+Shift+A","Ctrl+E"], a:0},
    { q: "Shortcut for Copy?", choices:["Ctrl+C","Ctrl+V","Ctrl+X","Ctrl+P"], a:0},
    { q: "Shortcut for Paste?", choices:["Ctrl+V","Ctrl+C","Ctrl+X","Ctrl+S"], a:0},
  ];
  const [mcqIndex, setMcqIndex] = useState(0);
  const [mcqAnswer, setMcqAnswer] = useState(null);
  const [mcqFeedback, setMcqFeedback] = useState(null);

  // --- Persist storage ---
  useEffect(() => {
    localStorage.setItem(storageKey + "_editorHTML", editorHTML);
    localStorage.setItem(storageKey + "_fontSize", fontSize);
    localStorage.setItem(storageKey + "_xp", xp);
    localStorage.setItem(storageKey + "_badges", JSON.stringify(badges));
    localStorage.setItem(storageKey + "_theme", theme);
    localStorage.setItem(storageKey + "_unlocked", JSON.stringify(unlocked));
  }, [editorHTML, fontSize, xp, badges, theme, unlocked]);

  // --- Utility functions ---
  const awardXp = (amt) => setXp(prev => prev + amt);
  const awardBadge = (name) => setBadges(prev => prev.includes(name) ? prev : [...prev, name]);

  const exec = (cmd, val=null) => {
    if (!editorRef.current) return;
    editorRef.current.focus();
    document.execCommand(cmd,false,val);
    setTimeout(()=>setEditorHTML(editorRef.current.innerHTML),50);
  }

  const insertImage = (file) => {
    if (!file || !editorRef.current) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = document.createElement("img");
      img.src = ev.target.result;
      img.style.maxWidth="100%";
      img.alt = file.name;
      editorRef.current.appendChild(img);
      setEditorHTML(editorRef.current.innerHTML);
      awardXp(2);
    };
    reader.readAsDataURL(file);
  }

  const insertTable = (rows=2,cols=2) => {
    if (!editorRef.current) return;
    const table = document.createElement("table");
    table.style.border="1px solid #888";
    table.style.borderCollapse="collapse";
    table.style.width="100%";
    for(let r=0;r<rows;r++){
      const tr=document.createElement("tr");
      for(let c=0;c<cols;c++){
        const td=document.createElement("td");
        td.style.border="1px solid #888";
        td.style.padding="6px";
        td.textContent=r===0?`Header ${c+1}`:"Data";
        tr.appendChild(td);
      }
      table.appendChild(tr);
    }
    editorRef.current.appendChild(table);
    setEditorHTML(editorRef.current.innerHTML);
    awardXp(3);
  }

  const downloadHTML = () => {
    const blob = new Blob([`<html><body>${editorRef.current?.innerHTML}</body></html>`], {type:"text/html"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href=url; a.download="demo-document.html"; a.click();
    URL.revokeObjectURL(url);
    awardXp(2);
  }

  const submitMcq = (choice) => {
    const q = mcqBank[mcqIndex];
    setMcqAnswer(choice);
    if(choice===q.a){
      setMcqFeedback("Correct! 🎉");
      awardXp(5);
      awardBadge("MCQ Star");
      setTimeout(()=>{
        if(mcqIndex<mcqBank.length-1){
          setMcqIndex(i=>i+1);
          setMcqAnswer(null);
          setMcqFeedback(null);
        }
      },900);
    } else setMcqFeedback("Incorrect ❌");
  }

  // --- Unlock form ---
  const handleUnlock = e => {
    e.preventDefault();
    if(codeInput.trim()===passcode){
      setUnlocked(true);
      awardXp(10);
      awardBadge("Unlocked");
    } else alert("Incorrect passcode.");
    setCodeInput("");
  }

  // --- Styles ---
  const s = {
    app:{fontFamily:"Arial,sans-serif", minHeight:"100vh", background:theme==="dark"?"#121318":"#f0f4f8", color:theme==="dark"?"#fff":"#111", padding:20, transition:"all 0.3s"},
    card:{background:theme==="dark"?"#1a1f2b":"#fff", padding:16, borderRadius:12, boxShadow:"0 4px 10px rgba(0,0,0,0.1)", marginBottom:18},
    header:{display:"flex", justifyContent:"space-between", alignItems:"center"},
    btn:{padding:"8px 12px", borderRadius:8, border:"none", cursor:"pointer", fontWeight:700},
    primary:{background:"#2563eb", color:"#fff"},
    ghost:{background:"transparent", border:"1px solid #888", color:theme==="dark"?"#fff":"#111"},
    toolbarBtn:{padding:"6px 10px", borderRadius:6, marginRight:6, cursor:"pointer"},
    input:{padding:"6px 8px", borderRadius:6, border:"1px solid #ccc"},
    select:{padding:"6px 8px", borderRadius:6, border:"1px solid #ccc"},
    editor:{minHeight:200, padding:12, border:"1px solid #888", borderRadius:8, background:theme==="dark"?"#121318":"#fff", color:theme==="dark"?"#fff":"#111", marginTop:10, fontSize:fontSize, lineHeight:1.5}
  };

  if(!unlocked){
    return <div style={s.app}>
      <div style={s.card}>
        <h2>Student Assignment - MS Word Demo</h2>
        <form onSubmit={handleUnlock} style={{display:"flex", gap:8, alignItems:"center"}}>
          <input type="password" value={codeInput} onChange={e=>setCodeInput(e.target.value)} placeholder="Enter passcode" style={s.input}/>
          <button type="submit" style={{...s.btn,...s.primary}}>Unlock</button>
        </form>
        <div style={{marginTop:12}}>
          <button style={{...s.btn,...s.ghost}} onClick={()=>setTheme(theme==="light"?"dark":"light")}>Toggle Theme</button>
        </div>
      </div>
    </div>
  }

  return <div style={s.app}>
    {/* Header */}
    <div style={s.header}>
      <h2>MS Word Learning App 🎓</h2>
      <div>
        <span style={{marginRight:12}}>XP: {xp}</span>
        <span>Badges: {badges.length}</span>
        <button style={{...s.btn,...s.ghost, marginLeft:12}} onClick={()=>{setUnlocked(false)}}>Lock</button>
      </div>
    </div>

    {/* Interactive Demo */}
    <div style={s.card}>
      <h3>Interactive MS Word Demo 📝</h3>
      <div style={{marginBottom:6}}>
        {/* Toolbar */}
        <button style={s.toolbarBtn} onClick={()=>exec("bold")}>B</button>
        <button style={s.toolbarBtn} onClick={()=>exec("italic")}>I</button>
        <button style={s.toolbarBtn} onClick={()=>exec("underline")}>U</button>
        <button style={s.toolbarBtn} onClick={()=>exec("justifyLeft")}>⬅️</button>
        <button style={s.toolbarBtn} onClick={()=>exec("justifyCenter")}>↔️</button>
        <button style={s.toolbarBtn} onClick={()=>exec("justifyRight")}>➡️</button>
        <button style={s.toolbarBtn} onClick={()=>exec("foreColor",prompt("Enter text color e.g. red"))}>🎨 Color</button>
        <button style={s.toolbarBtn} onClick={()=>exec("hiliteColor",prompt("Enter highlight color e.g. yellow"))}>🖍️ Highlight</button>
        <button style={s.toolbarBtn} onClick={()=>exec("undo")}>↩️ Undo</button>
        <button style={s.toolbarBtn} onClick={()=>exec("redo")}>↪️ Redo</button>
        <label style={{cursor:"pointer", marginLeft:6}}>🖼️ Image<input type="file" accept="image/*" style={{display:"none"}} onChange={e=>insertImage(e.target.files[0])}/></label>
        <button style={s.toolbarBtn} onClick={()=>insertTable()}>📊 Table</button>
        <button style={s.toolbarBtn} onClick={()=>exec("removeFormat")}>🧹 Clear</button>
        <button style={{...s.btn,...s.primary, marginLeft:6}} onClick={downloadHTML}>Save</button>
      </div>

      <div ref={editorRef} contentEditable suppressContentEditableWarning onInput={()=>setEditorHTML(editorRef.current.innerHTML)} style={s.editor} dangerouslySetInnerHTML={{__html:editorHTML}}/>
    </div>

    {/* Assignments */}
    <div style={s.card}>
      <h3>Assignments (Write in your exercise book)</h3>
      <ol>
        {assignments.map((a,i)=><li key={i} style={{marginBottom:6}}>{a}</li>)}
      </ol>
    </div>

    {/* MCQ Quiz */}
    <div style={s.card}>
      <h3>MCQ Quiz 🎯</h3>
      <div>{mcqBank[mcqIndex].q}</div>
      <div style={{marginTop:6}}>
        {mcqBank[mcqIndex].choices.map((c,i)=>(
          <button key={i} onClick={()=>submitMcq(i)} style={{...s.btn,...s.ghost, display:"block", marginTop:4, background:mcqAnswer===i?"#d1e7ff":undefined}}>{c}</button>
        ))}
      </div>
      {mcqFeedback && <div style={{marginTop:6}}>{mcqFeedback}</div>}
    </div>
  </div>
}