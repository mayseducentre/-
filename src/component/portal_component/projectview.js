// ProjectView.jsx
import React, { useEffect, useState } from "react";

/**
 * ProjectView - Light mode, high-contrast PRO UI
 * - Inline JSON contains the five links & authors you provided
 * - Google Slides embed & Drive preview
 * - Fixed regex: /(?:\/d\/|id=)([A-Za-z0-9_-]{10,})/
 * - Responsive, accessible, inline CSS
 */

const INITIAL_PROJECTS = [
  {
    id: "p_wesley",
    title: "Wesley — Presentation",
    description: "Student presentation by Wesley (Google Slides)",
    author: "wesley",
    tags: ["Slides", "Presentation"],
    rawLink:
      "https://docs.google.com/presentation/d/1WcY7dkDJ7BgixPpwqVFNlcllKvFaTcTN/edit?usp=drivesdk&ouid=103978726471940972435&rtpof=true&sd=true"
  },
  {
    id: "p_tornam",
    title: "Tornam — Presentation",
    description: "Student presentation by Tornam (Google Slides)",
    author: "tornam",
    tags: ["Slides", "Presentation"],
    rawLink:
      "https://docs.google.com/presentation/d/13969CrEr7l211QVImjOcg5fFBbRBPUhN/edit?usp=drivesdk&ouid=103978726471940972435&rtpof=true&sd=true"
  },
  {
    id: "p_lydia",
    title: "Lydia — Presentation",
    description: "Student presentation by Lydia (Google Slides)",
    author: "lydia",
    tags: ["Slides", "Presentation"],
    rawLink:
      "https://docs.google.com/presentation/d/1-h5I9sNWtG_xz2-7Tp9dk-o3-SIcDB6F/edit?usp=drivesdk&ouid=103978726471940972435&rtpof=true&sd=true"
  },
  {
    id: "p_shula",
    title: "Shula — Presentation",
    description: "Student presentation by Shula (Google Slides)",
    author: "shula",
    tags: ["Slides", "Presentation"],
    rawLink:
      "https://docs.google.com/presentation/d/1E9hI5l8t4kOalz7scHWKqlitTDW-Z9C1/edit?usp=drivesdk&ouid=103978726471940972435&rtpof=true&sd=true"
  },
  {
    id: "p_yanelle",
    title: "Yanelle — Project File",
    description: "Project file uploaded (Drive file) by Yanelle",
    author: "Yanelle",
    tags: ["Drive", "File"],
    rawLink:
      "https://drive.google.com/file/d/1oZ57UhMv923PtY6oZ6HZxBARH_n6Zvpb/view?usp=drivesdk"
  }
];

export default function ProjectView() {
  const [projects, setProjects] = useState(() => {
    try {
      const raw = localStorage.getItem("student_projects_v1");
      return raw ? JSON.parse(raw) : INITIAL_PROJECTS;
    } catch (e) {
      return INITIAL_PROJECTS;
    }
  });

  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("new");
  const [selected, setSelected] = useState(null);
  const [newLink, setNewLink] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem("student_projects_v1", JSON.stringify(projects));
    } catch (e) {
      // ignore
    }
  }, [projects]);

  // Extract file id from google docs/drive links (fixed regex)
  function extractId(link) {
    if (!link) return null;
    const match = link.match(/(?:\/d\/|id=)([A-Za-z0-9_-]{10,})/);
    return match ? match[1] : null;
  }

  // Build embed for slides or drive preview
  function makeEmbed(link) {
    const id = extractId(link);
    if (!id) return null;
    if (link.includes("docs.google.com/presentation")) {
      return {
        type: "slides",
        url: `https://docs.google.com/presentation/d/${id}/embed?start=false&loop=false&delayms=3000`
      };
    }
    return {
      type: "drive",
      url: `https://drive.google.com/file/d/${id}/preview`
    };
  }

  function addProjectFromDrive() {
    const trimmed = newLink.trim();
    if (!trimmed) {
      setMessage({ type: "error", text: "Paste a Google Drive/Slides share link first." });
      setTimeout(() => setMessage(null), 2200);
      return;
    }
    const id = extractId(trimmed);
    if (!id) {
      setMessage({ type: "error", text: "Could not parse link. Use a Drive or Slides share link." });
      setTimeout(() => setMessage(null), 3000);
      return;
    }
    const newProj = {
      id: `p_${Date.now()}`,
      title: `New Project ${projects.length + 1}`,
      description: "Uploaded project — preview available below.",
      author: "Unknown",
      tags: ["Student Upload"],
      rawLink: trimmed
    };
    setProjects((s) => [newProj, ...s]);
    setNewLink("");
    setMessage({ type: "success", text: "Project added — open View to preview." });
    setTimeout(() => setMessage(null), 2500);
  }

  function toggleLike(id) {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, liked: !p.liked } : p)));
  }

  function toggleFavorite(id) {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, fav: !p.fav } : p)));
  }

  const filtered = projects
    .filter((p) => {
      const q = query.trim().toLowerCase();
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q)) ||
        (p.author && p.author.toLowerCase().includes(q)) ||
        (p.tags && p.tags.join(" ").toLowerCase().includes(q))
      );
    })
    .sort((a, b) => {
      if (sortBy === "alpha") return a.title.localeCompare(b.title);
      if (sortBy === "fav") return (b.fav ? 1 : 0) - (a.fav ? 1 : 0);
      return (b.id || "").localeCompare(a.id || "");
    });

  return (
    <div className="pv-root" style={{ fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Arial", background: "#f6f8fb", padding: 20 }}>
      {/* Inline styles (light-mode friendly) */}
      <style>{`
        .pv-container { max-width:1100px; margin:0 auto; color:#0b2533; }
        .pv-header { display:flex; gap:12px; align-items:center; justify-content:space-between; margin-bottom:18px; }
        .pv-title { font-size:22px; font-weight:800; color:#042b3a; }
        .pv-sub { font-size:13px; color:#476b79; margin-top:4px; }
        .pv-controls { display:flex; gap:8px; align-items:center; flex-wrap:wrap; }
        .pv-search { padding:10px 12px; border-radius:10px; border:1px solid #d6e6ef; min-width:200px; background: white; color: #042b3a; box-shadow: 0 2px 8px rgba(16,24,32,0.04); }
        .pv-select { padding:10px 12px; border-radius:10px; border:1px solid #d6e6ef; background: white; color: #042b3a; }
        .pv-grid { display:grid; grid-template-columns: repeat(3, 1fr); gap:18px; margin-top:18px; }
        @media (max-width: 1024px) { .pv-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px) { .pv-grid { grid-template-columns: 1fr; } .pv-header { flex-direction:column; align-items:flex-start } }

        .pv-card { background: linear-gradient(180deg,#ffffff,#f2f6fb); border-radius:14px; padding:14px; box-shadow: 0 6px 18px rgba(16,24,32,0.06); position:relative; overflow:hidden; transition: transform .22s cubic-bezier(.2,.9,.25,1), box-shadow .22s; display:flex; flex-direction:column; justify-content:space-between; min-height:150px; }
        .pv-card:hover { transform: translateY(-8px); box-shadow: 0 18px 40px rgba(16,24,32,0.12); }
        .pv-tags { display:flex; gap:8px; flex-wrap:wrap; margin-top:10px; }
        .pv-tag { font-size:12px; padding:6px 10px; border-radius:999px; background: #eef7fb; border: 1px solid #d7eef7; color:#0b4a5f; }
        .pv-actions { display:flex; gap:8px; margin-top:12px; align-items:center; }
        .pv-btn { padding:8px 12px; border-radius:10px; border:none; cursor:pointer; font-weight:700; background: #eef6ff; color: #042b3a; box-shadow: 0 4px 10px rgba(16,24,32,0.04); }
        .pv-btn.ghost { background:transparent; border:1px solid #e2eef7; color:#042b3a; }
        .pv-btn.primary { background: linear-gradient(90deg,#3fb3ff,#6ee7b7); color:#042b3a; }
        .pv-author { font-weight:700; font-size:13px; color:#043a4a; text-transform:capitalize; }
        .pv-desc { color:#476b79; font-size:13px; margin-top:6px; }
        .pv-preview { width:100%; height:520px; border-radius:8px; border: 1px solid #e6f2f8; background: white; display:block; }
        .pv-modal { position:fixed; inset:0; display:flex; align-items:center; justify-content:center; z-index:120; }
        .pv-backdrop { position:absolute; inset:0; background: rgba(11,16,20,0.32); backdrop-filter: blur(3px); }
        .pv-modal-inner { position:relative; z-index:121; width: min(1100px, 95%); max-height:92vh; overflow:auto; border-radius:12px; padding:18px; background: white; box-shadow:0 30px 60px rgba(16,24,32,0.12); }
        .pv-msg { margin-top:12px; padding:8px 12px; border-radius:10px; display:inline-block; }
        .pv-msg.success { background: #e6f9ef; color:#0b4a3a; border: 1px solid #c7f0da; }
        .pv-msg.error { background: #fff3f2; color:#6d1410; border: 1px solid #ffd6d2; }
        .tag-row { margin-top:8px; display:flex; gap:6px; align-items:center; flex-wrap:wrap; }
      `}</style>

      <div className="pv-container">
        <div className="pv-header">
          <div>
            <div className="pv-title">Student Projects</div>
            <div className="pv-sub">High-contrast, light-mode pro UI — Google Slides & Drive preview</div>
          </div>

          <div className="pv-controls">
            <input
              className="pv-search"
              placeholder="Search by title, tag, or author"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search projects"
            />
            <select className="pv-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)} aria-label="Sort projects">
              <option value="new">Newest</option>
              <option value="alpha">A → Z</option>
              <option value="fav">Favorites</option>
            </select>
          </div>
        </div>

        <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12, flexWrap: "wrap" }}>
          <input
            placeholder="Paste Google Drive/Slides share link"
            value={newLink}
            onChange={(e) => setNewLink(e.target.value)}
            style={{ flex: 1, minWidth: 280, padding: 10, borderRadius: 10, border: "1px solid #d6e6ef", background: "white", color: "#042b3a" }}
            aria-label="New project Google Drive link"
          />
          <button className="pv-btn primary" onClick={addProjectFromDrive} aria-label="Add project">Add Project</button>
        </div>

        {message && (
          <div className={`pv-msg ${message.type === "success" ? "success" : "error"}`}>
            {message.text}
          </div>
        )}

        <div className="pv-grid" role="list">
          {filtered.map((p) => (
            <article key={p.id} className="pv-card" role="listitem" aria-labelledby={`title-${p.id}`}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <div id={`title-${p.id}`} style={{ fontSize: 16, fontWeight: 800, color: "#042b3a" }}>{p.title}</div>
                  <div className="pv-desc">{p.description}</div>
                  <div className="pv-tags">
                    {(p.tags || []).map((t, i) => (
                      <span key={i} className="pv-tag">{t}</span>
                    ))}
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
                  <div className="pv-author">{p.author}</div>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button
                      className="pv-btn ghost"
                      title="Like"
                      onClick={() => toggleLike(p.id)}
                      aria-pressed={!!p.liked}
                      aria-label={`Like ${p.title}`}
                    >
                      {p.liked ? "💖 Liked" : "🤍 Like"}
                    </button>
                    <button
                      className="pv-btn ghost"
                      title="Favorite"
                      onClick={() => toggleFavorite(p.id)}
                      aria-pressed={!!p.fav}
                      aria-label={`Favorite ${p.title}`}
                    >
                      {p.fav ? "⭐ Fav" : "☆ Fav"}
                    </button>
                  </div>
                </div>
              </div>

              <div className="pv-actions">
                <button className="pv-btn" onClick={() => setSelected(p)} aria-label={`View ${p.title}`}>View</button>
                <a className="pv-btn ghost" href={p.rawLink} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>Open Share Link</a>
              </div>
            </article>
          ))}
        </div>

        {/* Modal preview */}
        {selected && (
          <div className="pv-modal" role="dialog" aria-modal="true">
            <div className="pv-backdrop" onClick={() => setSelected(null)} />
            <div className="pv-modal-inner" role="document" onClick={(e) => e.stopPropagation()}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: "#042b3a" }}>{selected.title}</div>
                  <div style={{ color: "#476b79", fontSize: 13 }}>{selected.author}</div>
                </div>

                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    className="pv-btn"
                    onClick={() => {
                      try {
                        navigator.clipboard?.writeText(selected.rawLink);
                        setMessage({ type: "success", text: "Share link copied to clipboard" });
                        setTimeout(() => setMessage(null), 1800);
                      } catch (e) {
                        setMessage({ type: "error", text: "Copy failed" });
                        setTimeout(() => setMessage(null), 1800);
                      }
                    }}
                  >
                    Copy Link
                  </button>
                  <button className="pv-btn ghost" onClick={() => setSelected(null)}>Close</button>
                </div>
              </div>

              <div style={{ marginTop: 12 }}>
                {makeEmbed(selected.rawLink) ? (
                  <iframe
                    className="pv-preview"
                    title={`preview-${selected.id}`}
                    src={makeEmbed(selected.rawLink).url}
                  />
                ) : (
                  <div style={{ padding: 18, borderRadius: 8, background: "#fff8f8", color: "#6d1410" }}>
                    <div>Preview not available. Use a Google Drive or Slides share link that contains a file id.</div>
                    <code style={{ display: "block", marginTop: 8 }}>Example: https://docs.google.com/presentation/d/FILE_ID/edit or https://drive.google.com/file/d/FILE_ID/view</code>
                  </div>
                )}
              </div>

              <div style={{ marginTop: 12, display: "flex", gap: 8, justifyContent: "flex-end" }}>
                <button className="pv-btn ghost" onClick={() => setSelected(null)}>Close</button>
              </div>
            </div>
          </div>
        )}

        <div style={{ marginTop: 18, color: "#476b79", fontSize: 13 }}>
          Tip: If a preview is blank, set the file's sharing to <strong>Anyone with the link → Viewer</strong>.
        </div>
      </div>
    </div>
  );
}
