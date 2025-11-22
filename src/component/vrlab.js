// VirtualLabs.jsx
import React, { useState, useRef, useEffect } from "react";

/**
 * VirtualLabs - All-in-one single-file React component
 * - No external packages
 * - Pure inline CSS
 * - Responsive, pro-style UI
 *
 * Usage: <VirtualLabs />
 */

export default function VirtualLabs() {
  const [lab, setLab] = useState(null);
  const containerStyle = {
    minHeight: "100vh",
    padding: "28px 16px",
    fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Arial",
    background:
      "linear-gradient(180deg, #071029 0%, #0f1724 40%, #0b1220 100%)",
    color: "#e6eef8",
    boxSizing: "border-box",
  };

  return (
    <div style={containerStyle}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Header lab={lab} setLab={setLab} />

        {!lab && <LabSelector onChoose={setLab} />}

        {lab === "physics" && <PhysicsLab onBack={() => setLab(null)} />}

        {lab === "chemistry" && <ChemistryLab onBack={() => setLab(null)} />}

        {lab === "biology" && <BiologyLab onBack={() => setLab(null)} />}

        {lab === "ict" && <ICTLab onBack={() => setLab(null)} />}
      </div>
    </div>
  );
}

/* ---------------- Header ---------------- */
function Header({ lab, setLab }) {
  const headerStyle = {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 22,
  };
  const logoStyle = {
    width: 56,
    height: 56,
    borderRadius: 12,
    background:
      "linear-gradient(135deg,#60a5fa 0%, #7c3aed 40%, #06b6d4 100%)",
    display: "grid",
    placeItems: "center",
    boxShadow: "0 8px 30px rgba(12,20,40,0.6)",
    fontWeight: 800,
    color: "#fff",
    fontSize: 20,
  };
  const titleStyle = { margin: 0, fontSize: 20, fontWeight: 700 };
  const subtitleStyle = { margin: 0, fontSize: 13, color: "#cfe7ff" };

  return (
    <div style={headerStyle}>
      <div style={logoStyle}>MEC</div>
      <div style={{ flex: 1 }}>
        <h1 style={titleStyle}>Virtual Labs — Science & ICT</h1>
        <p style={subtitleStyle}>
          Interactive experiments for Physics, Chemistry, Biology and ICT
        </p>
      </div>

      {lab && (
        <button
          onClick={() => setLab(null)}
          style={{
            padding: "8px 12px",
            borderRadius: 10,
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.04)",
            color: "#e6eef8",
            cursor: "pointer",
          }}
        >
          ← Back to Labs
        </button>
      )}
    </div>
  );
}

/* ---------------- Lab Selector ---------------- */
function LabSelector({ onChoose }) {
  const grid = {
    display: "grid",
    gridTemplateColumns: "repeat(1, 1fr)",
    gap: 16,
  };
  const card = {
    borderRadius: 16,
    padding: 18,
    background: "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
    border: "1px solid rgba(255,255,255,0.06)",
    boxShadow: "0 12px 40px rgba(6,12,24,0.5)",
    cursor: "pointer",
    transition: "transform .16s ease, box-shadow .16s ease",
    display: "flex",
    gap: 14,
    alignItems: "center",
  };

  // Responsive columns
  const mediaCols = () => {
    if (typeof window === "undefined") return {};
    const w = window.innerWidth;
    if (w > 980) return { gridTemplateColumns: "repeat(4, 1fr)" };
    if (w > 720) return { gridTemplateColumns: "repeat(2, 1fr)" };
    return { gridTemplateColumns: "repeat(1, 1fr)" };
  };

  const [cols, setCols] = useState(mediaCols());
  useEffect(() => {
    const onResize = () => setCols(mediaCols());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const labs = [
    { id: "physics", title: "Physics Lab", emoji: "⚡", desc: "Circuit builder: drag components and test." },
    { id: "chemistry", title: "Chemistry Lab", emoji: "🧪", desc: "Drag reagents into beaker to simulate reactions." },
    { id: "biology", title: "Biology Lab", emoji: "🔬", desc: "Build cells by placing organelles correctly." },
    { id: "ict", title: "ICT Lab", emoji: "💻", desc: "Drag devices to workspace and connect them." },
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
        <h2 style={{ margin: 0 }}>Choose a Lab</h2>
        <div style={{ color: "#98c1ff", fontSize: 13 }}>No installs — runs in browser</div>
      </div>

      <div style={{ ...grid, ...cols }}>
        {labs.map((l) => (
          <div
            key={l.id}
            style={card}
            onClick={() => onChoose(l.id)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow = "0 18px 50px rgba(6,12,30,0.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 12px 40px rgba(6,12,24,0.5)";
            }}
          >
            <div style={{
              width: 84,
              height: 84,
              borderRadius: 14,
              display: "grid",
              placeItems: "center",
              fontSize: 36,
              background: "linear-gradient(135deg,#112240,#20314a)",
              boxShadow: "inset 0 2px 8px rgba(255,255,255,0.02)",
            }}>{l.emoji}</div>

            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 18, fontWeight: 700 }}>{l.title}</div>
              <div style={{ marginTop: 8, color: "#bcd7ff" }}>{l.desc}</div>
              <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
                <div style={pillStyle}>Interactive</div>
                <div style={pillStyle}>Safe</div>
                <div style={pillStyle}>Responsive</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const pillStyle = {
  padding: "6px 8px",
  borderRadius: 999,
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.03)",
  fontSize: 12,
  color: "#dbeeff",
};

/* ---------------- Physics Lab: drag & drop circuit builder ----------------
   Simple model:
   - Toolbox: battery, bulb, wire
   - Workspace: drop placed components (ordered)
   - Test Circuit: we consider circuit complete when there's at least 1 battery, 1 bulb and 1 wire.
   - This is intentionally simple for clarity and easy extensibility.
-------------------------------------------------------------------------- */
function PhysicsLab({ onBack }) {
  const [dropped, setDropped] = useState([]); // array of {id, label}
  const [message, setMessage] = useState("");

  const components = [
    { id: "battery", label: "Battery", emoji: "🔋" },
    { id: "bulb", label: "Bulb", emoji: "💡" },
    { id: "wire", label: "Wire", emoji: "〰️" },
  ];

  useEffect(() => {
    setMessage("");
  }, []);

  const onDragStart = (e, id) => {
    e.dataTransfer.setData("component", id);
  };

  const onDrop = (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("component");
    if (!id) return;
    const comp = components.find((c) => c.id === id);
    if (!comp) return;
    // allow many wires and components
    setDropped((prev) => [...prev, { ...comp, uid: Date.now() + Math.random() }]);
  };

  const onDragOver = (e) => e.preventDefault();

  const removeItem = (uid) => setDropped((prev) => prev.filter((p) => p.uid !== uid));

  const testCircuit = () => {
    const ids = dropped.map((d) => d.id);
    const hasBattery = ids.includes("battery");
    const hasBulb = ids.includes("bulb");
    const hasWire = ids.includes("wire");
    if (hasBattery && hasBulb && hasWire) {
      setMessage("✅ Circuit complete — the bulb lights up! (simulate current flow)");
    } else {
      setMessage("⚠️ Circuit incomplete — add at least a battery, a bulb and a wire.");
    }
  };

  const workspaceStyle = {
    minHeight: 260,
    borderRadius: 14,
    border: "1px dashed rgba(255,255,255,0.06)",
    padding: 14,
    background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
  };

  return (
    <div style={{ marginTop: 10 }}>
      <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
        <div style={{ flexBasis: 260, minWidth: 220 }}>
          <h3 style={{ marginTop: 0 }}>Components</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {components.map((c) => (
              <div
                key={c.id}
                draggable
                onDragStart={(e) => onDragStart(e, c.id)}
                style={{
                  padding: "10px 12px",
                  borderRadius: 12,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.04)",
                  cursor: "grab",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
                title={`Drag ${c.label} to workspace`}
              >
                <div style={{ fontSize: 22 }}>{c.emoji}</div>
                <div style={{ fontWeight: 700 }}>{c.label}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 14 }}>
            <button
              onClick={() => {
                setDropped([]);
                setMessage("");
              }}
              style={smallButtonStyle}
            >
              Clear Workspace
            </button>
            <button onClick={testCircuit} style={{ ...smallButtonStyle, marginLeft: 8 }}>
              Test Circuit
            </button>
          </div>

          <div style={{ marginTop: 10, color: "#cfe7ff", fontSize: 13 }}>{message}</div>
        </div>

        <div style={{ flex: 1 }}>
          <h3 style={{ marginTop: 0 }}>Workspace</h3>

          <div onDrop={onDrop} onDragOver={onDragOver} style={workspaceStyle}>
            {dropped.length === 0 && <div style={{ color: "#bcd7ff" }}>Drag components here to build your circuit</div>}

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 8 }}>
              {dropped.map((d) => (
                <div
                  key={d.uid}
                  style={{
                    padding: "10px 14px",
                    borderRadius: 12,
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.04)",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    minWidth: 86,
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  <div style={{ fontSize: 20 }}>{d.emoji}</div>
                  <div style={{ fontSize: 13, opacity: 0.95 }}>{d.label}</div>
                  <button
                    onClick={() => removeItem(d.uid)}
                    title="Remove"
                    style={{
                      position: "absolute",
                      top: -8,
                      right: -8,
                      width: 22,
                      height: 22,
                      borderRadius: 99,
                      border: "none",
                      background: "#ff6b6b",
                      color: "#fff",
                      cursor: "pointer",
                      fontSize: 11,
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 18 }}>
              <small style={{ color: "#9fc7ff" }}>
                Tip: Try assembling battery → wire → bulb → wire to simulate a closed loop.
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const smallButtonStyle = {
  padding: "8px 10px",
  borderRadius: 10,
  border: "1px solid rgba(255,255,255,0.06)",
  background: "rgba(255,255,255,0.03)",
  color: "#e6f3ff",
  cursor: "pointer",
};

/* ---------------- Chemistry Lab: Drag reagents into beaker ----------------
   Behavior:
   - Toolbox reagents: acid, base, neutralizer, salt
   - Drop reagents into beaker area (order recorded)
   - Reaction rules implemented by checking combinations
-------------------------------------------------------------------------- */
function ChemistryLab({ onBack }) {
  const reagents = [
    { id: "acid", name: "Acid (HCl)", emoji: "🧴" },
    { id: "base", name: "Base (NaOH)", emoji: "🧪" },
    { id: "indicator", name: "Indicator", emoji: "🧷" },
    { id: "metal", name: "Metal (Zn)", emoji: "🔩" },
  ];

  const [inBeaker, setInBeaker] = useState([]);
  const [result, setResult] = useState("");

  useEffect(() => {
    // compute simple reaction summary when inBeaker changes
    const ids = inBeaker.map((r) => r.id);
    if (ids.includes("acid") && ids.includes("indicator")) {
      setResult("Solution turned pink/red — indicator shows acidic solution.");
    } else if (ids.includes("base") && ids.includes("indicator")) {
      setResult("Solution turned blue/green — indicator shows basic solution.");
    } else if (ids.includes("acid") && ids.includes("metal")) {
      setResult("Fizzing observed — gas released (simulate H2 gas).");
    } else if (ids.length === 0) {
      setResult("Beaker is empty.");
    } else {
      setResult("No observable reaction yet. Try combining reagents.");
    }
  }, [inBeaker]);

  const onDragStart = (e, id) => e.dataTransfer.setData("reagent", id);

  const onDrop = (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("reagent");
    const r = reagents.find((x) => x.id === id);
    if (!r) return;
    setInBeaker((prev) => [...prev, { ...r, uid: Date.now() + Math.random() }]);
  };

  const onDragOver = (e) => e.preventDefault();

  const clearBeaker = () => {
    setInBeaker([]);
    setResult("");
  };

  return (
    <div style={{ marginTop: 10 }}>
      <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
        <div style={{ flexBasis: 260, minWidth: 220 }}>
          <h3 style={{ marginTop: 0 }}>Reagents</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {reagents.map((r) => (
              <div
                key={r.id}
                draggable
                onDragStart={(e) => onDragStart(e, r.id)}
                style={{
                  padding: "10px 12px",
                  borderRadius: 12,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.04)",
                  cursor: "grab",
                  display: "flex",
                  gap: 10,
                  alignItems: "center",
                }}
              >
                <div style={{ fontSize: 20 }}>{r.emoji}</div>
                <div style={{ fontWeight: 700 }}>{r.name}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 14 }}>
            <button onClick={clearBeaker} style={smallButtonStyle}>
              Reset Beaker
            </button>
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <h3 style={{ marginTop: 0 }}>Beaker</h3>

          <div
            onDrop={onDrop}
            onDragOver={onDragOver}
            style={{
              minHeight: 260,
              borderRadius: 14,
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
              border: "1px dashed rgba(255,255,255,0.06)",
              padding: 14,
            }}
          >
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {inBeaker.length === 0 && <div style={{ color: "#bcd7ff" }}>Drag reagents here</div>}
              {inBeaker.map((r) => (
                <div
                  key={r.uid}
                  style={{
                    padding: "8px 10px",
                    borderRadius: 12,
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.04)",
                    display: "flex",
                    gap: 8,
                    alignItems: "center",
                  }}
                >
                  <div style={{ fontSize: 18 }}>{r.emoji}</div>
                  <div style={{ fontSize: 14 }}>{r.name}</div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 18 }}>
              <div style={{ fontWeight: 700, color: "#dbeeff" }}>Observation</div>
              <div style={{ marginTop: 8, color: "#cfe7ff" }}>{result}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Biology Lab: drag organelles into cell ----------------
   - A simple cell silhouette with drop slots (nucleus, mitochondrion, chloroplast)
   - Toolbox has organelles that must be dropped into correct slots
   - Check correctness and give feedback
-------------------------------------------------------------------------- */
function BiologyLab({ onBack }) {
  const organelles = [
    { id: "nucleus", name: "Nucleus", emoji: "🟣" },
    { id: "mito", name: "Mitochondrion", emoji: "🟠" },
    { id: "chlor", name: "Chloroplast", emoji: "🟢" },
  ];

  const [placed, setPlaced] = useState({}); // slotId => organelle
  const [message, setMessage] = useState("");

  const slots = [
    { id: "slot-nucleus", label: "Nucleus" },
    { id: "slot-mito", label: "Mitochondrion" },
    { id: "slot-chlor", label: "Chloroplast" },
  ];

  useEffect(() => setMessage(""), []);

  const onDragStart = (e, id) => e.dataTransfer.setData("org", id);

  const onDropToSlot = (e, slotId) => {
    e.preventDefault();
    const orgId = e.dataTransfer.getData("org");
    if (!orgId) return;
    // set organelle into slot
    setPlaced((p) => ({ ...p, [slotId]: organelles.find((o) => o.id === orgId) }));
  };

  const onDragOver = (e) => e.preventDefault();

  const checkCell = () => {
    // simple correctness: nucleus->slot-nucleus, mito->slot-mito, chlor->slot-chlor
    const correct =
      placed["slot-nucleus"]?.id === "nucleus" &&
      placed["slot-mito"]?.id === "mito" &&
      placed["slot-chlor"]?.id === "chlor";
    setMessage(correct ? "✅ Correct! Cell assembled." : "❌ Some organelles are incorrect or missing.");
  };

  const reset = () => {
    setPlaced({});
    setMessage("");
  };

  return (
    <div style={{ marginTop: 10 }}>
      <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
        <div style={{ flexBasis: 260, minWidth: 220 }}>
          <h3 style={{ marginTop: 0 }}>Organelles</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {organelles.map((o) => (
              <div
                key={o.id}
                draggable
                onDragStart={(e) => onDragStart(e, o.id)}
                style={{
                  padding: "10px 12px",
                  borderRadius: 12,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.04)",
                  cursor: "grab",
                  display: "flex",
                  gap: 10,
                  alignItems: "center",
                }}
                title={`Drag ${o.name} to the correct cell slot`}
              >
                <div style={{ fontSize: 18 }}>{o.emoji}</div>
                <div style={{ fontWeight: 700 }}>{o.name}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 14 }}>
            <button onClick={checkCell} style={smallButtonStyle}>
              Check Cell
            </button>
            <button onClick={reset} style={{ ...smallButtonStyle, marginLeft: 8 }}>
              Reset
            </button>
          </div>

          <div style={{ marginTop: 10, color: "#cfe7ff" }}>{message}</div>
        </div>

        <div style={{ flex: 1 }}>
          <h3 style={{ marginTop: 0 }}>Cell Workspace</h3>

          <div
            style={{
              minHeight: 280,
              borderRadius: 14,
              background: "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
              border: "1px dashed rgba(255,255,255,0.06)",
              padding: 18,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
            }}
          >
            {slots.map((s) => {
              const placedOrg = placed[s.id];
              return (
                <div
                  key={s.id}
                  onDrop={(e) => onDropToSlot(e, s.id)}
                  onDragOver={onDragOver}
                  style={{
                    minHeight: 100,
                    borderRadius: 12,
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.03)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    gap: 8,
                    padding: 12,
                  }}
                >
                  <div style={{ color: "#bcd7ff", fontSize: 13 }}>{s.label}</div>
                  {placedOrg ? (
                    <>
                      <div style={{ fontSize: 30 }}>{placedOrg.emoji}</div>
                      <div style={{ fontSize: 13, fontWeight: 700 }}>{placedOrg.name}</div>
                    </>
                  ) : (
                    <div style={{ color: "#95bfff" }}>Drop here</div>
                  )}
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: 12 }}>
            <small style={{ color: "#9fc7ff" }}>
              Tip: Place each organelle into the correct labeled slot. Use the "Check Cell" button to validate.
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- ICT Lab: drag devices and connect ----------------
   Behavior:
   - Toolbox: PC, Router, Switch
   - Drop to workspace to add device
   - Click a device to select, click another to connect them (record connection list)
-------------------------------------------------------------------------- */
function ICTLab({ onBack }) {
  const devicesList = [
    { id: "pc", name: "PC", emoji: "🖥️" },
    { id: "router", name: "Router", emoji: "📡" },
    { id: "switch", name: "Switch", emoji: "🔀" },
  ];

  const [devices, setDevices] = useState([]); // {uid, id, left, top, name}
  const [connections, setConnections] = useState([]); // [{aUid,bUid}]
  const [selected, setSelected] = useState(null);
  const workspaceRef = useRef(null);

  useEffect(() => {
    // reset selection when devices removed
    if (!devices.find((d) => d.uid === selected)) setSelected(null);
  }, [devices, selected]);

  const onDragStart = (e, id) => e.dataTransfer.setData("dev", id);

  const onDrop = (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("dev");
    const devDef = devicesList.find((d) => d.id === id);
    if (!devDef) return;

    // compute position relative to workspace
    const rect = workspaceRef.current.getBoundingClientRect();
    const left = Math.max(12, e.clientX - rect.left - 40);
    const top = Math.max(12, e.clientY - rect.top - 24);

    const newDev = {
      uid: Date.now() + Math.random(),
      id: devDef.id,
      name: devDef.name,
      emoji: devDef.emoji,
      left,
      top,
    };
    setDevices((prev) => [...prev, newDev]);
  };

  const onDragOver = (e) => e.preventDefault();

  const removeDevice = (uid) => {
    setDevices((prev) => prev.filter((d) => d.uid !== uid));
    setConnections((prev) => prev.filter((c) => c.a !== uid && c.b !== uid));
  };

  const handleDeviceClick = (uid) => {
    if (!selected) {
      setSelected(uid);
    } else if (selected === uid) {
      setSelected(null);
    } else {
      // create connection (avoid duplicates)
      const exists = connections.find(
        (c) => (c.a === selected && c.b === uid) || (c.a === uid && c.b === selected)
      );
      if (!exists) {
        setConnections((prev) => [...prev, { a: selected, b: uid }]);
      }
      setSelected(null);
    }
  };

  const clearAll = () => {
    setDevices([]);
    setConnections([]);
    setSelected(null);
  };

  return (
    <div style={{ marginTop: 10 }}>
      <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
        <div style={{ flexBasis: 260, minWidth: 220 }}>
          <h3 style={{ marginTop: 0 }}>Network Devices</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {devicesList.map((d) => (
              <div
                key={d.id}
                draggable
                onDragStart={(e) => onDragStart(e, d.id)}
                style={{
                  padding: "10px 12px",
                  borderRadius: 12,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.04)",
                  cursor: "grab",
                  display: "flex",
                  gap: 10,
                  alignItems: "center",
                }}
              >
                <div style={{ fontSize: 18 }}>{d.emoji}</div>
                <div style={{ fontWeight: 700 }}>{d.name}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 14 }}>
            <button onClick={clearAll} style={smallButtonStyle}>
              Clear Network
            </button>
            <div style={{ marginTop: 10, color: "#cfe7ff", fontSize: 13 }}>
              Instructions: Drag a device into the workspace. Click one device, then click another to connect them.
            </div>
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <h3 style={{ marginTop: 0 }}>Workspace</h3>

          <div
            ref={workspaceRef}
            onDrop={onDrop}
            onDragOver={onDragOver}
            style={{
              minHeight: 360,
              borderRadius: 14,
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.01), rgba(255,255,255,0.01))",
              border: "1px dashed rgba(255,255,255,0.06)",
              padding: 6,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Devices */}
            {devices.map((d) => (
              <div
                key={d.uid}
                onClick={() => handleDeviceClick(d.uid)}
                style={{
                  position: "absolute",
                  left: d.left,
                  top: d.top,
                  width: 90,
                  height: 56,
                  borderRadius: 10,
                  background: selected === d.uid ? "linear-gradient(90deg,#60a5fa,#7c3aed)" : "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  cursor: "pointer",
                  color: selected === d.uid ? "#fff" : "#e6f3ff",
                  boxShadow: selected === d.uid ? "0 12px 30px rgba(12,20,40,0.6)" : "none",
                }}
                title={`${d.name} — click to select / connect`}
              >
                <div style={{ fontSize: 20 }}>{d.emoji}</div>
                <div style={{ fontSize: 12, fontWeight: 700 }}>{d.name}</div>

                <button
                  onClick={(ev) => {
                    ev.stopPropagation();
                    removeDevice(d.uid);
                  }}
                  style={{
                    position: "absolute",
                    right: -8,
                    top: -8,
                    width: 20,
                    height: 20,
                    borderRadius: 99,
                    background: "#ff6b6b",
                    color: "#fff",
                    border: "none",
                    fontSize: 11,
                    cursor: "pointer",
                  }}
                >
                  ×
                </button>
              </div>
            ))}

            {/* Connections list (textual) */}
            <div style={{ position: "absolute", right: 8, bottom: 8, background: "rgba(255,255,255,0.03)", padding: 8, borderRadius: 8, fontSize: 13 }}>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>Connections</div>
              {connections.length === 0 && <div style={{ color: "#bcd7ff" }}>No connections yet</div>}
              {connections.map((c, i) => {
                const a = devices.find((d) => d.uid === c.a);
                const b = devices.find((d) => d.uid === c.b);
                if (!a || !b) return null;
                return (
                  <div key={i} style={{ marginBottom: 6 }}>
                    <span style={{ color: "#9fe1ff" }}>{a.name}</span> ↔ <span style={{ color: "#9fe1ff" }}>{b.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}