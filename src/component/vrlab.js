// VirtualLabs.jsx
import React, { useState, useRef, useEffect } from "react";

/**
 * VirtualLabs - Advanced Interactive Labs
 * Physics, Chemistry, Biology, ICT
 * Realistic outcomes, animations, and fun interactions
 */

export default function VirtualLabs() {
  const [currentLab, setCurrentLab] = useState(null);

  // ------------------- Common Styles -------------------
  const containerStyle = {
    fontFamily: "Arial, sans-serif",
    minHeight: "100vh",
    margin: 0,
    padding: 0,
    background: "linear-gradient(to right, #f0f4ff, #d9e4ff)",
    color: "#333",
  };

  const headerStyle = {
    background: "linear-gradient(to right, #4facfe, #00f2fe)",
    padding: "20px",
    color: "white",
    textAlign: "center",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
  };

  const backButtonStyle = {
    position: "absolute",
    left: "20px",
    top: "20px",
    background: "white",
    border: "none",
    borderRadius: "50%",
    padding: "10px",
    cursor: "pointer",
    fontSize: "1rem",
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
  };

  const labGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
    gap: "20px",
    padding: "20px",
  };

  const labCardStyle = {
    background: "white",
    borderRadius: "15px",
    padding: "20px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    cursor: "pointer",
    transition: "0.2s all",
  };

  const tagStyle = {
    display: "inline-block",
    background: "#e0e0e0",
    color: "#555",
    borderRadius: "12px",
    padding: "2px 8px",
    margin: "2px",
    fontSize: "0.8rem",
  };

  const toolboxStyle = {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    marginBottom: "10px",
  };

  const toolboxItemStyle = {
    padding: "10px 15px",
    background: "linear-gradient(to right,#ffecd2,#fcb69f)",
    borderRadius: "10px",
    cursor: "grab",
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
    userSelect: "none",
  };

  const workspaceStyle = {
    minHeight: "250px",
    border: "2px dashed #aaa",
    borderRadius: "15px",
    padding: "10px",
    background: "rgba(255,255,255,0.85)",
    position: "relative",
    overflow: "hidden",
  };

  const buttonStyle = {
    padding: "10px 20px",
    margin: "10px 5px 0 0",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    background: "linear-gradient(to right,#43e97b,#38f9d7)",
    color: "#fff",
    fontWeight: "bold",
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
    transition: "0.2s all",
  };

  // ------------------- Lab Definitions -------------------
  const labs = [
    { key: "physics", title: "Physics ⚡", description: "Build electrical circuits interactively.", tags: ["Interactive","Safe","Fun"] },
    { key: "chemistry", title: "Chemistry 🧪", description: "Mix chemicals and observe reactions.", tags: ["Interactive","Safe","Colorful"] },
    { key: "biology", title: "Biology 🔬", description: "Assemble cell organelles and explore functions.", tags: ["Interactive","Safe","Educational"] },
    { key: "ict", title: "ICT 💻", description: "Set up networks and test connections.", tags: ["Interactive","Fun","Realistic"] },
  ];

  // ------------------- Physics Lab -------------------
  const physicsTools = [
    { name:"Battery 🔋", type:"battery"},
    { name:"Bulb 💡", type:"bulb"},
    { name:"Wire 〰️", type:"wire"},
    { name:"Switch 🔘", type:"switch", state:"off"},
    { name:"Resistor 🟥", type:"resistor"},
  ];
  const [physicsWorkspace, setPhysicsWorkspace] = useState([]);
  const [dragItem, setDragItem] = useState(null);

  const toggleSwitch = (id) => {
    setPhysicsWorkspace(prev => prev.map(i => i.id===id ? {...i, state: i.state==="off"?"on":"off"} : i));
  }

  const testPhysicsCircuit = () => {
    const types = physicsWorkspace.map(i=>i.type);
    const battery = types.includes("battery");
    const bulb = types.includes("bulb");
    const wire = types.includes("wire");
    const switchComp = physicsWorkspace.find(i=>i.type==="switch");
    const switchOn = !switchComp || switchComp.state==="on";
    if(battery && bulb && wire && switchOn) alert("✅ Circuit Complete! Bulb Glows!");
    else alert("⚠️ Circuit Incomplete! Check connections and switch.");
  };
  const clearPhysics = () => setPhysicsWorkspace([]);

  // ------------------- Chemistry Lab -------------------
  const chemistryTools = [
    { name:"Acid HCl 🧴", type:"acid"},
    { name:"Base NaOH 🧪", type:"base"},
    { name:"Indicator 🧷", type:"indicator"},
    { name:"Metal Zn 🔩", type:"metal"},
    { name:"Salt NaCl 🧂", type:"salt"},
    { name:"Sugar 🍬", type:"sugar"},
  ];
  const [chemWorkspace,setChemWorkspace]=useState([]);
  const [chemObservation,setChemObservation]=useState("Beaker is empty");

  useEffect(()=>{
    const types=chemWorkspace.map(i=>i.type);
    if(types.includes("acid") && types.includes("indicator")) setChemObservation("🔴 Pink/Red appears!");
    else if(types.includes("base") && types.includes("indicator")) setChemObservation("🟢 Blue/Green appears!");
    else if(types.includes("acid") && types.includes("metal")) setChemObservation("⚪ Fizzing observed!");
    else if(types.length===0) setChemObservation("Beaker is empty");
    else setChemObservation("No observable reaction yet.");
  },[chemWorkspace]);

  const clearChem = () => { setChemWorkspace([]); setChemObservation("Beaker is empty"); }

  // ------------------- Biology Lab -------------------
  const biologyTools = [
    {name:"Nucleus 🟣", type:"nucleus"},
    {name:"Mitochondrion 🟠", type:"mitochondrion"},
    {name:"Chloroplast 🟢", type:"chloroplast"},
    {name:"Ribosome 🔵", type:"ribosome"},
    {name:"Endoplasmic Reticulum 🟡", type:"er"},
  ];
  const [bioWorkspace,setBioWorkspace]=useState([]);
  const [bioMessage,setBioMessage]=useState("");

  const checkBio = ()=>{
    const types=bioWorkspace.map(i=>i.type);
    const allPlaced=["nucleus","mitochondrion","chloroplast","ribosome","er"].every(t=>types.includes(t));
    setBioMessage(allPlaced?"✅ Cell Complete! All organelles placed.":"⚠️ Some organelles missing.");
  }
  const clearBio=()=>{setBioWorkspace([]);setBioMessage("");}

  // ------------------- ICT Lab -------------------
  const ictTools = [
    {name:"PC 🖥️", type:"pc"},
    {name:"Router 📡", type:"router"},
    {name:"Switch 🔀", type:"switch"},
    {name:"Firewall 🛡️", type:"firewall"},
    {name:"Server 🗄️", type:"server"},
    {name:"Laptop 💻", type:"laptop"},
  ];
  const [ictWorkspace,setIctWorkspace]=useState([]);
  const [connections,setConnections]=useState([]);
  const [selectedDevice,setSelectedDevice]=useState(null);
  const workspaceRef = useRef(null);

  const addIctDevice=(item)=>{
    const newDevice={...item,id:Date.now()+Math.random(),x:20,y:20};
    setIctWorkspace([...ictWorkspace,newDevice]);
  }

  const handleDeviceMove=(e,device)=>{
    e.preventDefault();
    const rect=workspaceRef.current.getBoundingClientRect();
    const x=(e.clientX||e.touches[0].clientX)-rect.left-50;
    const y=(e.clientY||e.touches[0].clientY)-rect.top-20;
    setIctWorkspace(prev=>prev.map(d=>d.id===device.id?{...d,x,y}:d));
  }

  const selectDevice=(device)=>{
    if(!selectedDevice) setSelectedDevice(device);
    else { if(selectedDevice.id!==device.id) setConnections([...connections,{from:selectedDevice.id,to:device.id}]); setSelectedDevice(null);}
  }

  const removeDevice=id=>{
    setIctWorkspace(ictWorkspace.filter(d=>d.id!==id));
    setConnections(connections.filter(c=>c.from!==id && c.to!==id));
  }
  const clearIct=()=>{setIctWorkspace([]);setConnections([]);setSelectedDevice(null);}

  const testIctNetwork=()=>{
    const allIds=ictWorkspace.map(d=>d.id);
    const connectedIds=[...connections.map(c=>c.from),...connections.map(c=>c.to)];
    const unconnected=allIds.filter(id=>!connectedIds.includes(id));
    alert(unconnected.length===0?"✅ Network OK! All devices connected.":"⚠️ Some devices not connected.");
  }

  // ------------------- Render Lab Functions -------------------
  const renderWorkspace=(tools,workspace,setWorkspace,tip,testFunc,clearFunc)=>{
    return (
      <div style={{padding:"20px"}}>
        <div style={toolboxStyle}>
          {tools.map(item=>(
            <div key={item.type} style={toolboxItemStyle} draggable
              onDragStart={()=>setDragItem(item)}
              onTouchStart={()=>setWorkspace([...workspace,{...item,id:Date.now()+Math.random()}])}
            >{item.name}</div>
          ))}
        </div>
        <div style={workspaceStyle} onDragOver={e=>e.preventDefault()} onDrop={()=>handleDrop(setWorkspace,workspace,dragItem)}>
          {workspace.map(item=><div key={item.id}>{item.name} {item.state==="on"?"💡":"⚪"}</div>)}
        </div>
        {tip && <small>{tip}</small>}
        <div>
          {testFunc && <button style={buttonStyle} onClick={testFunc}>Test</button>}
          {clearFunc && <button style={buttonStyle} onClick={clearFunc}>Clear</button>}
        </div>
      </div>
    )
  }

  const renderPhysicsLab=()=>renderWorkspace(physicsTools,physicsWorkspace,setPhysicsWorkspace,"Tip: Battery → Wire → Bulb. Click switch to toggle.",testPhysicsCircuit,clearPhysics);
  const renderChemistryLab=()=>(
    <div style={{padding:"20px"}}>
      <div style={toolboxStyle}>
        {chemistryTools.map(item=>(
          <div key={item.type} style={toolboxItemStyle} draggable
            onDragStart={()=>setDragItem(item)}
            onTouchStart={()=>setChemWorkspace([...chemWorkspace,{...item,id:Date.now()+Math.random()}])}
          >{item.name}</div>
        ))}
      </div>
      <div style={{...workspaceStyle,minHeight:"300px",backgroundColor:"#fff8"}} onDragOver={e=>e.preventDefault()} onDrop={()=>handleDrop(setChemWorkspace,chemWorkspace,dragItem)}>
        {chemWorkspace.map(item=><div key={item.id}>{item.name}</div>)}
      </div>
      <p><strong>Observation:</strong> {chemObservation}</p>
      <button style={buttonStyle} onClick={clearChem}>Reset</button>
    </div>
  );

  const renderBiologyLab=()=>(
    <div style={{padding:"20px"}}>
      <div style={toolboxStyle}>
        {biologyTools.map(item=>(
          <div key={item.type} style={toolboxItemStyle} draggable
            onDragStart={()=>setDragItem(item)}
            onTouchStart={()=>setBioWorkspace([...bioWorkspace,{...item,id:Date.now()+Math.random()}])}
          >{item.name}</div>
        ))}
      </div>
      <div style={workspaceStyle} onDragOver={e=>e.preventDefault()} onDrop={()=>handleDrop(setBioWorkspace,bioWorkspace,dragItem)}>
        {bioWorkspace.map(item=><div key={item.id}>{item.name}</div>)}
      </div>
      <small>Tip: Place organelles correctly.</small>
      <div>
        <button style={buttonStyle} onClick={checkBio}>Check</button>
        <button style={buttonStyle} onClick={clearBio}>Reset</button>
      </div>
      {bioMessage && <p>{bioMessage}</p>}
    </div>
  );

  const renderIctLab=()=>(
    <div style={{padding:"20px"}}>
      <div style={toolboxStyle}>
        {ictTools.map(item=>(
          <div key={item.type} style={toolboxItemStyle} onClick={()=>addIctDevice(item)}>{item.name}</div>
        ))}
      </div>
      <div style={{...workspaceStyle,minHeight:"400px"}} ref={workspaceRef}>
        <svg style={{position:"absolute",width:"100%",height:"100%",pointerEvents:"none"}}>
          {connections.map((c,idx)=>{
            const from=ictWorkspace.find(d=>d.id===c.from);
            const to=ictWorkspace.find(d=>d.id===c.to);
            if(!from||!to) return null;
            return <line key={idx} x1={from.x+50} y1={from.y+20} x2={to.x+50} y2={to.y+20} stroke="blue" strokeWidth="2"/>;
          })}
        </svg>
        {ictWorkspace.map(device=>(
          <div key={device.id} style={{position:"absolute",left:device.x,top:device.y,cursor:"grab",padding:"10px",background:"#fff",borderRadius:"10px",boxShadow:"0 2px 5px rgba(0,0,0,0.3)",userSelect:"none"}} draggable
            onDrag={(e)=>handleDeviceMove(e,device)}
            onTouchMove={(e)=>handleDeviceMove(e,device)}
            onClick={()=>selectDevice(device)}
          >{device.name} <span style={{color:"red",cursor:"pointer"}} onClick={()=>removeDevice(device.id)}>❌</span></div>
        ))}
      </div>
      <div>
        <button style={buttonStyle} onClick={testIctNetwork}>Test Network</button>
        <button style={buttonStyle} onClick={clearIct}>Clear All</button>
      </div>
    </div>
  );

  // ------------------- Main Render -------------------
  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        {currentLab && <button style={backButtonStyle} onClick={()=>setCurrentLab(null)}>⬅️</button>}
        <h1>Virtual Labs — Science & ICT</h1>
        <p>Explore interactive labs in Physics, Chemistry, Biology, and ICT</p>
      </header>

      {!currentLab?(
        <div style={labGridStyle}>
          {labs.map(lab=>(
            <div key={lab.key} style={labCardStyle} onClick={()=>setCurrentLab(lab.key)}
              onMouseEnter={e=>e.currentTarget.style.transform="translateY(-5px)"}
              onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}
            >
              <h2>{lab.title}</h2>
              <p>{lab.description}</p>
              <div>{lab.tags.map((t,i)=><span key={i} style={tagStyle}>{t}</span>)}</div>
            </div>
          ))}
        </div>
      ):(
        <div>
          {currentLab==="physics" && renderPhysicsLab()}
          {currentLab==="chemistry" && renderChemistryLab()}
          {currentLab==="biology" && renderBiologyLab()}
          {currentLab==="ict" && renderIctLab()}
        </div>
      )}
    </div>
  );
}

// ------------------- Helper -------------------
function handleDrop(setWorkspace,workspace,dragItem){
  if(!dragItem) return;
  const newItem={...dragItem,id:Date.now()+Math.random()};
  setWorkspace([...workspace,newItem]);
}