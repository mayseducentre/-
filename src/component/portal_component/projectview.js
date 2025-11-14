import React, { useState, useEffect } from 'react';

// ProjectView.jsx // Single-file React component. No external CSS files required — uses inline styles + a small style block. // Features: // - Replaces broken remote URL fetch with inline JSON (editable) // - Responsive, pro-looking card grid with subtle glassmorphism and animations // - Search, sort, like (heart), favourite, and modal preview // - Add new project via Google Drive share link (auto-parses to preview URL) // - LocalStorage persistence for added projects

const INITIAL_PROJECTS = [ { id: 'p1', title: 'Smart Garden (Team A)', description: 'A sensor-based garden monitor built with Arduino. Shows moisture, temp and auto-watering logic. Includes diagrams and demo video.', author: 'Ama & Kojo', tags: ['IoT', 'Arduino', 'Sustainability'], driveShare: 'https://drive.google.com/file/d/1abcDEFghi/view?usp=sharing' }, { id: 'p2', title: 'Math Game (Primary)', description: 'An interactive math game for primary students built in Scratch. Levels, scores and teacher dashboard included.', author: 'Kwesi', tags: ['Scratch', 'Education', 'Game'], driveShare: 'https://drive.google.com/file/d/1xyZ_ExampleID/view?usp=sharing' }, { id: 'p3', title: 'Portfolio Website (HTML/CSS)', description: 'A modern responsive portfolio to showcase student works and CV. Built with HTML/CSS and vanilla JS.', author: 'Efua', tags: ['Web', 'HTML', 'CSS'], driveShare: 'https://drive.google.com/file/d/1AnotherID/view?usp=sharing' } ];

export default function ProjectView() { // Load from localStorage first, fallback to INITIAL_PROJECTS const [projects, setProjects] = useState(() => { try { const raw = localStorage.getItem('student_projects_v1'); return raw ? JSON.parse(raw) : INITIAL_PROJECTS; } catch (e) { return INITIAL_PROJECTS; } });

const [query, setQuery] = useState(''); const [sortBy, setSortBy] = useState('new'); const [selected, setSelected] = useState(null); // project for modal const [newLink, setNewLink] = useState(''); const [message, setMessage] = useState(null);

useEffect(() => { try { localStorage.setItem('student_projects_v1', JSON.stringify(projects)); } catch (e) { console.warn('Could not persist projects', e); } }, [projects]);

// Utility: parse Google Drive link and return embeddable preview URL function parseGoogleDrivePreview(url) { if (!url) return null; // try to extract file id from common share URL variants const regex = /(?:drive.google.com/(?:file/d/|open?id=|uc?id=)|id=)([a-zA-Z0-9_-]{10,})/; const m = url.match(regex); const id = m ? m[1] : null; if (!id) return null; return https://drive.google.com/file/d/${id}/preview; }

function addProjectFromDrive() { const preview = parseGoogleDrivePreview(newLink.trim()); if (!preview) { setMessage({ type: 'error', text: 'Could not parse Google Drive link. Make sure it is a share link.' }); setTimeout(() => setMessage(null), 3500); return; }

const id = `p_${Date.now()}`;
const titleGuess = guessTitleFromLink(newLink) || 'Student Project';
const newProj = {
  id,
  title: titleGuess,
  description: 'Uploaded project — preview available below.',
  author: 'Unknown',
  tags: ['Student Upload'],
  driveShare: newLink.trim()
};

setProjects((s) => [newProj, ...s]);
setNewLink('');
setMessage({ type: 'success', text: 'Project added! Click View to preview.' });
setTimeout(() => setMessage(null), 3000);

}

function guessTitleFromLink(link) { try { const u = new URL(link); // if file name is included in query params (rare), use it, else fallback if (u.searchParams.get('name')) return u.searchParams.get('name'); return null; } catch (e) { return null; } }

function toggleLike(id) { setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, liked: !p.liked } : p))); }

function toggleFavorite(id) { setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, fav: !p.fav } : p))); }

const filtered = projects .filter((p) => { const q = query.trim().toLowerCase(); if (!q) return true; return ( p.title.toLowerCase().includes(q) || (p.description && p.description.toLowerCase().includes(q)) || (p.author && p.author.toLowerCase().includes(q)) || (p.tags && p.tags.join(' ').toLowerCase().includes(q)) ); }) .sort((a, b) => { if (sortBy === 'alpha') return a.title.localeCompare(b.title); if (sortBy === 'fav') return (b.fav ? 1 : 0) - (a.fav ? 1 : 0); // 'new' default - by id timestamp when created return (b.id || '').localeCompare(a.id || ''); });

return ( <div className="pv-root" style={{ fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial" }}> {/* Inline styles for the component (keyframes, responsive grid, glass effect) */} <style>{` .pv-root { padding: 20px; max-width: 1100px; margin: 0 auto; } .pv-header { display:flex; gap:12px; align-items:center; justify-content:space-between; margin-bottom:18px } .pv-title { font-size:20px; font-weight:700; letter-spacing:0.2px } .pv-sub { font-size:13px; color:#7a7f86 }

.pv-controls { display:flex; gap:8px; align-items:center; flex-wrap:wrap }
    .pv-search { padding:10px 12px; border-radius:10px; border:1px solid rgba(255,255,255,0.06); min-width:180px }
    .pv-select { padding:10px 12px; border-radius:10px; border:1px solid rgba(255,255,255,0.06) }

    .pv-grid { display:grid; grid-template-columns: repeat(3, 1fr); gap:16px; margin-top:18px }
    @media (max-width: 980px) { .pv-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 620px) { .pv-grid { grid-template-columns: 1fr; } .pv-header { flex-direction:column; align-items:flex-start } }

    .pv-card { background: linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01)); border-radius:14px; padding:14px; box-shadow: 0 6px 20px rgba(13,20,30,0.35); backdrop-filter: blur(6px); position:relative; overflow:hidden; transition: transform .28s cubic-bezier(.2,.9,.25,1), box-shadow .28s }
    .pv-card:hover { transform: translateY(-8px) scale(1.01); box-shadow: 0 18px 40px rgba(10,20,40,0.45) }

    .pv-tags { display:flex; gap:8px; flex-wrap:wrap; margin-top:8px }
    .pv-tag { font-size:11px; padding:6px 8px; border-radius:999px; background: linear-gradient(90deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01)); border:1px solid rgba(255,255,255,0.03) }

    .pv-actions { display:flex; gap:8px; margin-top:12px }
    .pv-btn { padding:8px 12px; border-radius:8px; border:none; cursor:pointer; font-weight:600 }
    .pv-btn.ghost { background:transparent; border:1px solid rgba(255,255,255,0.06) }
    .pv-btn.primary { background: linear-gradient(90deg,#6ee7b7,#60a5fa); color:#04243a }

    .pv-meta { display:flex; gap:8px; align-items:center; justify-content:space-between }
    .pv-author { font-weight:600; font-size:13px }

    /* subtle float animation when new projects are added */
    @keyframes floatIn { from { transform: translateY(10px) scale(.98); opacity:0 } to { transform:translateY(0) scale(1); opacity:1 } }
    .pv-card { animation: floatIn .45s ease both }

    /* Modal */
    .pv-modal { position:fixed; inset:0; display:flex; align-items:center; justify-content:center; z-index:90 }
    .pv-backdrop { position:absolute; inset:0; background:linear-gradient(180deg,rgba(2,6,23,0.6),rgba(2,6,23,0.8)); backdrop-filter: blur(3px) }
    .pv-modal-inner { position:relative; z-index:91; width: min(1100px, 95%); max-height:90vh; overflow:auto; border-radius:12px; padding:18px; background: linear-gradient(180deg,#04111b, #07202b); box-shadow:0 30px 80px rgba(2,6,23,0.8) }

    .pv-preview { width:100%; height:480px; border-radius:8px; border:none }

    .pv-msg { margin-top:12px; padding:8px 12px; border-radius:10px }
    .pv-msg.success { background:linear-gradient(90deg,#052e1a,#08303a); color:#bff2d8 }
    .pv-msg.error { background:linear-gradient(90deg,#2e041a,#3a031f); color:#ffc7d0 }

    /* Tiny confetti accent — decorative only */
    .confetti { position:absolute; right:-30px; top:-30px; width:180px; height:180px; pointer-events:none; opacity:.06 }
    .pv-card .spark { width:6px; height:6px; border-radius:2px; position:absolute; animation:spin 3s linear infinite }
    @keyframes spin { to { transform: rotate(360deg) } }
  `}</style>

  <div className="pv-header">
    <div>
      <div className="pv-title">Student Projects</div>
      <div className="pv-sub">A bright showcase — inline JSON used (no server needed)</div>
    </div>

    <div className="pv-controls">
      <input
        className="pv-search"
        placeholder="Search by title, tag or author"
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

  <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12, flexWrap: 'wrap' }}>
    <input
      placeholder="Paste Google Drive share link (example: drive.google.com/file/d/FILE_ID/view)"
      value={newLink}
      onChange={(e) => setNewLink(e.target.value)}
      style={{ flex: 1, minWidth: 280, padding: 10, borderRadius: 10, border: '1px solid rgba(255,255,255,0.05)' }}
      aria-label="New project Google Drive link"
    />
    <button className="pv-btn primary" onClick={addProjectFromDrive} aria-label="Add project">Add Project</button>
  </div>

  {message && <div className={`pv-msg ${message.type === 'success' ? 'success' : 'error'}`}>{message.text}</div>}

  <div className="pv-grid">
    {filtered.map((p) => (
      <article key={p.id} className="pv-card" role="article" aria-labelledby={`title-${p.id}`}>
        {/* decorative confetti (random small sparks) */}
        <svg className="confetti" viewBox="0 0 200 200" aria-hidden>
          <rect x="20" y="40" width="6" height="6" rx="1" fill="#ffd166" />
          <rect x="70" y="20" width="5" height="5" rx="1" fill="#06d6a0" />
          <rect x="140" y="60" width="4" height="4" rx="1" fill="#ef476f" />
        </svg>

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
          <div>
            <div id={`title-${p.id}`} style={{ fontSize: 16, fontWeight: 800 }}>{p.title}</div>
            <div style={{ marginTop: 6, color: '#9fb0bd', fontSize: 13 }}>{p.description}</div>
            <div className="pv-tags">
              {(p.tags || []).map((t, i) => (
                <span key={i} className="pv-tag">{t}</span>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end' }}>
            <div className="pv-author">{p.author}</div>
            <div style={{ display: 'flex', gap: 6 }}>
              <button
                className="pv-btn ghost"
                title="Like"
                onClick={() => toggleLike(p.id)}
                aria-pressed={!!p.liked}
                aria-label={`Like ${p.title}`}
              >
                {p.liked ? '💖 Liked' : '🤍 Like'}
              </button>
              <button
                className="pv-btn ghost"
                title="Favorite"
                onClick={() => toggleFavorite(p.id)}
                aria-pressed={!!p.fav}
                aria-label={`Favorite ${p.title}`}
              >
                {p.fav ? '⭐ Fav' : '☆ Fav'}
              </button>
            </div>
          </div>
        </div>

        <div className="pv-actions">
          <button
            className="pv-btn"
            onClick={() => setSelected(p)}
            aria-label={`View ${p.title}`}
          >
            View
          </button>

          <a
            className="pv-btn ghost"
            href={p.driveShare}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
          >
            Open Share Link
          </a>
        </div>
      </article>
    ))}
  </div>

  {/* Modal for preview */}
  {selected && (
    <div className="pv-modal" role="dialog" aria-modal="true">
      <div className="pv-backdrop" onClick={() => setSelected(null)} />
      <div className="pv-modal-inner">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800 }}>{selected.title}</div>
            <div style={{ color: '#9fb0bd', fontSize: 13 }}>{selected.author}</div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="pv-btn" onClick={() => { navigator.clipboard?.writeText(selected.driveShare); setMessage({ type: 'success', text: 'Share link copied to clipboard' }); setTimeout(()=>setMessage(null),2000) }}>
              Copy Link
            </button>
            <button className="pv-btn ghost" onClick={() => setSelected(null)}>Close</button>
          </div>
        </div>

        <div style={{ marginTop: 12 }}>
          {/* compute preview URL */}
          {parseGoogleDrivePreview(selected.driveShare) ? (
            <iframe
              className="pv-preview"
              title={`preview-${selected.id}`}
              src={parseGoogleDrivePreview(selected.driveShare)}
            />
          ) : (
            <div style={{ padding: 18, borderRadius: 8, background: '#03121a' }}>
              <div style={{ color: '#cbd5dd' }}>Preview not available. Use a Google Drive share link that looks like:</div>
              <code style={{ display: 'block', marginTop: 8, color: '#98c0d6' }}>https://drive.google.com/file/d/FILE_ID/view?usp=sharing</code>
            </div>
          )}
        </div>

        <div style={{ marginTop: 12, display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <button className="pv-btn ghost" onClick={() => setSelected(null)}>Close</button>
        </div>
      </div>
    </div>
  )}

  <div style={{ marginTop: 18, color: '#94a7b4', fontSize: 13 }}>
    Tip: Add a Google Drive share link for a file (PDF/HTML/video). The component converts it into a preview. Projects are stored locally in your browser.
  </div>
</div>

); }
