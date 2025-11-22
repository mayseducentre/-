// VirtualLabs.jsx
import React, { useState, useRef, useEffect } from "react";

/**
 * VirtualLabs - All-in-one single-file React component
 * - Fully responsive and modern UI
 * - Physics, Chemistry, Biology, ICT labs
 * - Drag & drop support on PC and mobile
 * - Inline CSS only
 */

export default function VirtualLabs() {
  const [currentLab, setCurrentLab] = useState(null);

  // --------------------------- Shared Styles ---------------------------
  const containerStyle = {
    fontFamily: "Arial, sans-serif",
    minHeight: "100vh",
    background: "linear-gradient(to right, #f0f4ff, #d9e4ff)",
    color: "#333",
    padding: "0",
    margin: "0",
  };

  const headerStyle = {
    background: "linear-gradient(to right, #4facfe, #00f2fe)",
    padding: "20px",
    textAlign: "center",
    color: "white",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  };

  const titleStyle = { margin: "0", fontSize: "2rem" };
  const subtitleStyle = { margin: "5px 0 0", fontSize: "1rem", fontWeight: "300" };

  const backButtonStyle = {
    position: "absolute",
    left: "20px",
    top: "20px",
    background: "white",
    border: "none",
    borderRadius: "50%",
    padding: "10px",
    cursor: "pointer",
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
    fontSize: "1rem",
  };

  const labGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    padding: "20px",
  };

  const labCardStyle = {
    background: "white",
    borderRadius: "15px",
    padding: "20px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    transition: "transform 0.2s, box-shadow 0.2s",
    cursor: "pointer",
  };

  const labCardHoverStyle = {
    transform: "translateY(-5px)",
    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
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
    padding: "10px",
    flexWrap: "wrap",
    marginBottom: "10px",
  };

  const toolboxItemStyle = {
    padding: "10px 15px",
    background: "linear-gradient(to right, #ffecd2, #fcb69f)",
    borderRadius: "10px",
    cursor: "grab",
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
    userSelect: "none",
  };

  const workspaceStyle = {
    minHeight: "200px",
    border: "2px dashed #aaa",
    borderRadius: "15px",
    padding: "10px",
    background: "rgba(255,255,255,0.7)",
    position: "relative",
  };

  const buttonStyle = {
    padding: "10px 20px",
    margin: "10px 5px 0 0",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    background: "linear-gradient(to right, #43e97b, #38f9d7)",
    color: "#fff",
    fontWeight: "bold",
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
    transition: "transform 0.2s",
  };

  const buttonHoverStyle = {
    transform: "scale(1.05)",
  };

  // --------------------------- Lab Data ---------------------------
  const labs = [
    {
      key: "physics",
      title: "Physics ⚡",
      description: "Build and test electrical circuits interactively.",
      tags: ["Interactive", "Safe", "Responsive"],
    },
    {
      key: "chemistry",
      title: "Chemistry 🧪",
      description: "Mix reagents and observe chemical reactions safely.",
      tags: ["Interactive", "Safe", "Responsive"],
    },
    {
      key: "biology",
      title: "Biology 🔬",
      description: "Assemble cell organelles and learn their functions.",
      tags: ["Interactive", "Safe", "Responsive"],
    },
    {
      key: "ict",
      title: "ICT 💻",
      description: "Connect devices and explore network setups.",
      tags: ["Interactive", "Safe", "Responsive"],
    },
  ];

  // --------------------------- Physics Lab State ---------------------------
  const [physicsWorkspace, setPhysicsWorkspace] = useState([]);
  const [dragItem, setDragItem] = useState(null);
  const physicsItems = [
    { name: "Battery 🔋", type: "battery" },
    { name: "Bulb 💡", type: "bulb" },
    { name: "Wire 〰️", type: "wire" },
  ];

  // --------------------------- Chemistry Lab State ---------------------------
  const [chemWorkspace, setChemWorkspace] = useState([]);
  const chemItems = [
    { name: "Acid (HCl) 🧴", type: "acid" },
    { name: "Base (NaOH) 🧪", type: "base" },
    { name: "Indicator 🧷", type: "indicator" },
    { name: "Metal (Zn) 🔩", type: "metal" },
  ];
  const [chemObservation, setChemObservation] = useState("Beaker is empty");

  // --------------------------- Biology Lab State ---------------------------
  const [bioWorkspace, setBioWorkspace] = useState([]);
  const bioItems = [
    { name: "Nucleus 🟣", type: "nucleus" },
    { name: "Mitochondrion 🟠", type: "mitochondrion" },
    { name: "Chloroplast 🟢", type: "chloroplast" },
  ];
  const [bioMessage, setBioMessage] = useState("");

  // --------------------------- ICT Lab State ---------------------------
  const [ictWorkspace, setIctWorkspace] = useState([]);
  const ictItems = [
    { name: "PC 🖥️", type: "pc" },
    { name: "Router 📡", type: "router" },
    { name: "Switch 🔀", type: "switch" },
  ];
  const [connections, setConnections] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);

  // --------------------------- Drag & Drop Handlers ---------------------------
  const handleDragStart = (item) => setDragItem(item);

  const handleDrop = (workspaceSetter, workspaceState, item) => {
    const newItem = { ...item, id: Date.now() + Math.random() };
    workspaceSetter([...workspaceState, newItem]);
    setDragItem(null);
  };

  const handleTouchDrag = (item, workspaceSetter, workspaceState) => {
    const newItem = { ...item, id: Date.now() + Math.random() };
    workspaceSetter([...workspaceState, newItem]);
  };

  // --------------------------- Physics Lab Functions ---------------------------
  const testCircuit = () => {
    const types = physicsWorkspace.map((i) => i.type);
    if (types.includes("battery") && types.includes("bulb") && types.includes("wire")) {
      alert("✅ Circuit complete — the bulb lights up!");
    } else {
      alert("⚠️ Circuit incomplete");
    }
  };

  const clearPhysics = () => setPhysicsWorkspace([]);

  // --------------------------- Chemistry Lab Functions ---------------------------
  useEffect(() => {
    const types = chemWorkspace.map((i) => i.type);
    if (types.length === 0) setChemObservation("Beaker is empty");
    else if (types.includes("acid") && types.includes("indicator")) setChemObservation("Pink/Red color observed!");
    else if (types.includes("base") && types.includes("indicator")) setChemObservation("Blue/Green color observed!");
    else if (types.includes("acid") && types.includes("metal")) setChemObservation("Fizzing observed!");
    else setChemObservation("No observable reaction yet.");
  }, [chemWorkspace]);

  const clearChem = () => {
    setChemWorkspace([]);
    setChemObservation("Beaker is empty");
  };

  // --------------------------- Biology Lab Functions ---------------------------
  const checkBio = () => {
    const types = bioWorkspace.map((i) => i.type);
    if (types.includes("nucleus") && types.includes("mitochondrion") && types.includes("chloroplast")) {
      setBioMessage("✅ Correct! All organelles placed properly.");
    } else {
      setBioMessage("⚠️ Some organelles are missing or misplaced.");
    }
  };
  const clearBio = () => {
    setBioWorkspace([]);
    setBioMessage("");
  };

  // --------------------------- ICT Lab Functions ---------------------------
  const selectDevice = (device) => {
    if (!selectedDevice) {
      setSelectedDevice(device);
    } else {
      if (selectedDevice.id !== device.id) {
        setConnections([...connections, { from: selectedDevice.name, to: device.name }]);
      }
      setSelectedDevice(null);
    }
  };

  const removeDevice = (id) => {
    setIctWorkspace(ictWorkspace.filter((d) => d.id !== id));
    setConnections(connections.filter((c) => c.from !== id && c.to !== id));
  };

  const clearIct = () => {
    setIctWorkspace([]);
    setConnections([]);
    setSelectedDevice(null);
  };

  // --------------------------- Lab Renderers ---------------------------
  const renderPhysicsLab = () => (
    <div style={{ padding: "20px" }}>
      <div style={toolboxStyle}>
        {physicsItems.map((item) => (
          <div
            key={item.type}
            style={toolboxItemStyle}
            draggable
            onDragStart={() => handleDragStart(item)}
            onTouchStart={() => handleTouchDrag(item, setPhysicsWorkspace, physicsWorkspace)}
          >
            {item.name}
          </div>
        ))}
      </div>
      <div
        style={workspaceStyle}
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => handleDrop(setPhysicsWorkspace, physicsWorkspace, dragItem)}
      >
        {physicsWorkspace.map((item) => (
          <div key={item.id} style={{ margin: "5px" }}>
            {item.name}
          </div>
        ))}
      </div>
      <small>Tip: Arrange battery → wire → bulb for a closed loop.</small>
      <div>
        <button style={buttonStyle} onClick={testCircuit}>Test Circuit</button>
        <button style={buttonStyle} onClick={clearPhysics}>Clear Workspace</button>
      </div>
    </div>
  );

  const renderChemistryLab = () => (
    <div style={{ padding: "20px" }}>
      <div style={toolboxStyle}>
        {chemItems.map((item) => (
          <div
            key={item.type}
            style={toolboxItemStyle}
            draggable
            onDragStart={() => handleDragStart(item)}
            onTouchStart={() => handleTouchDrag(item, setChemWorkspace, chemWorkspace)}
          >
            {item.name}
          </div>
        ))}
      </div>
      <div
        style={workspaceStyle}
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => handleDrop(setChemWorkspace, chemWorkspace, dragItem)}
      >
        {chemWorkspace.map((item) => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div>
      <p><strong>Observation:</strong> {chemObservation}</p>
      <div>
        <button style={buttonStyle} onClick={clearChem}>Reset Beaker</button>
      </div>
    </div>
  );

  const renderBiologyLab = () => (
    <div style={{ padding: "20px" }}>
      <div style={toolboxStyle}>
        {bioItems.map((item) => (
          <div
            key={item.type}
            style={toolboxItemStyle}
            draggable
            onDragStart={() => handleDragStart(item)}
            onTouchStart={() => handleTouchDrag(item, setBioWorkspace, bioWorkspace)}
          >
            {item.name}
          </div>
        ))}
      </div>
      <div style={workspaceStyle}
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => handleDrop(setBioWorkspace, bioWorkspace, dragItem)}
      >
        {bioWorkspace.map((item) => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div>
      <small>Tip: Place organelles in the correct cell area.</small>
      <div>
        <button style={buttonStyle} onClick={checkBio}>Check</button>
        <button style={buttonStyle} onClick={clearBio}>Reset</button>
      </div>
      {bioMessage && <p>{bioMessage}</p>}
    </div>
  );

  const renderIctLab = () => (
    <div style={{ padding: "20px" }}>
      <div style={toolboxStyle}>
        {ictItems.map((item) => (
          <div
            key={item.type}
            style={toolboxItemStyle}
            draggable
            onDragStart={() => handleDragStart(item)}
            onTouchStart={() => handleTouchDrag(item, setIctWorkspace, ictWorkspace)}
          >
            {item.name}
          </div>
        ))}
      </div>
      <div
        style={{ ...workspaceStyle, minHeight: "300px" }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => handleDrop(setIctWorkspace, ictWorkspace, dragItem)}
      >
        {ictWorkspace.map((item) => (
          <div
            key={item.id}
            style={{ margin: "5px", cursor: "pointer" }}
            onClick={() => selectDevice(item)}
          >
            {item.name} <span style={{ cursor: "pointer", color: "red" }} onClick={() => removeDevice(item.id)}>❌</span>
          </div>
        ))}
      </div>
      <div>
        <button style={buttonStyle} onClick={clearIct}>Clear All</button>
      </div>
      <div>
        <p><strong>Connections:</strong></p>
        <ul>
          {connections.map((c, idx) => <li key={idx}>{c.from} → {c.to}</li>)}
        </ul>
      </div>
    </div>
  );

  // --------------------------- Main Render ---------------------------
  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        {currentLab && (
          <button style={backButtonStyle} onClick={() => setCurrentLab(null)}>⬅️</button>
        )}
        <h1 style={titleStyle}>Virtual Labs — Science & ICT</h1>
        <p style={subtitleStyle}>
          Explore interactive labs in Physics, Chemistry, Biology, and ICT
        </p>
      </header>

      {!currentLab ? (
        <div style={labGridStyle}>
          {labs.map((lab) => (
            <div
              key={lab.key}
              style={labCardStyle}
              onClick={() => setCurrentLab(lab.key)}
              onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              <h2>{lab.title}</h2>
              <p>{lab.description}</p>
              <div>
                {lab.tags.map((tag, idx) => <span key={idx} style={tagStyle}>{tag}</span>)}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          {currentLab === "physics" && renderPhysicsLab()}
          {currentLab === "chemistry" && renderChemistryLab()}
          {currentLab === "biology" && renderBiologyLab()}
          {currentLab === "ict" && renderIctLab()}
        </div>
      )}
    </div>
  );
}