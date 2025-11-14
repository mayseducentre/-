// ProjectView.jsx
import React, { useState, useEffect } from 'react';

// PRO UI Project View
// - Inline JSON uses the user's links + authors
// - Google Slides embed & Drive preview
// - Fixed regex: /(?:\/d\/|id=)([A-Za-z0-9_-]{10,})/
// - Responsive, glassy cards, subtle animations
// - localStorage persistence

const INITIAL_PROJECTS = [
  {
    id: 'p_wesley',
    title: 'Wesley — Presentation',
    description: 'Student presentation by Wesley (Google Slides)',
    author: 'wesley',
    tags: ['Slides', 'Presentation'],
    rawLink:
      'https://docs.google.com/presentation/d/1WcY7dkDJ7BgixPpwqVFNlcllKvFaTcTN/edit?usp=drivesdk&ouid=103978726471940972435&rtpof=true&sd=true'
  },
  {
    id: 'p_tornam',
    title: 'Tornam — Presentation',
    description: 'Student presentation by Tornam (Google Slides)',
    author: 'tornam',
    tags: ['Slides', 'Presentation'],
    rawLink:
      'https://docs.google.com/presentation/d/13969CrEr7l211QVImjOcg5fFBbRBPUhN/edit?usp=drivesdk&ouid=103978726471940972435&rtpof=true&sd=true'
  },
  {
    id: 'p_lydia',
    title: 'Lydia — Presentation',
    description: 'Student presentation by Lydia (Google Slides)',
    author: 'lydia',
    tags: ['Slides', 'Presentation'],
    rawLink:
      'https://docs.google.com/presentation/d/1-h5I9sNWtG_xz2-7Tp9dk-o3-SIcDB6F/edit?usp=drivesdk&ouid=103978726471940972435&rtpof=true&sd=true'
  },
  {
    id: 'p_shula',
    title: 'Shula — Presentation',
    description: 'Student presentation by Shula (Google Slides)',
    author: 'shula',
    tags: ['Slides', 'Presentation'],
    rawLink:
      'https://docs.google.com/presentation/d/1E9hI5l8t4kOalz7scHWKqlitTDW-Z9C1/edit?usp=drivesdk&ouid=103978726471940972435&rtpof=true&sd=true'
  },
  {
    id: 'p_yanelle',
    title: 'Yanelle — Project File',
    description: 'Project file uploaded (Drive file) by Yanelle',
    author: 'Yanelle',
    tags: ['Drive', 'File'],
    rawLink: 'https://drive.google.com/file/d/1oZ57UhMv923PtY6oZ6HZxBARH_n6Zvpb/view?usp=drivesdk'
  }
];

export default function ProjectView() {
  const [projects, setProjects] = useState(() => {
    try {
      const raw = localStorage.getItem('student_projects_v1');
      return raw ? JSON.parse(raw) : INITIAL_PROJECTS;
    } catch (e) {
      return INITIAL_PROJECTS;
    }
  });

  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('new');
  const [selected, setSelected] = useState(null);
  const [newLink, setNewLink] = useState('');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('student_projects_v1', JSON.stringify(projects));
    } catch (e) {
      // ignore persistence errors
    }
  }, [projects]);

  // Extract the file id from Drive/Slides links
  // FIXED REGEX (no invalid flags)
  function extractId(link) {
    if (!link) return null;
    const match = link.match(/(?:\/d\/|id=)([A-Za-z0-9_-]{10,})/);
    return match ? match[1] : null;
  }

  // Build an embed object { type, url } for slides vs drive preview
  function makeEmbed(link) {
    const id = extractId(link);
    if (!id) return null;
    if (link.includes('docs.google.com/presentation')) {
      return {
        type: 'slides',
        url: `https://docs.google.com/presentation/d/${id}/embed?start=false&loop=false&delayms=3000`
      };
    }
    return {
      type: 'drive',
      url: `https://drive.google.com/file/d/${id}/preview`
    };
  }

  function addProjectFromDrive() {
    const trimmed = newLink.trim();
    if (!trimmed) {
      setMessage({ type: 'error', text: 'Paste a Google Drive/Slides share link first.' });
      setTimeout(() => setMessage(null), 2200);
      return;
    }
    const id = extractId(trimmed);
    if (!id) {
      setMessage({ type: 'error', text: 'Could not parse link. Use a Google Drive or Slides share link.' });
      setTimeout(() => setMessage(null), 3000);
      return;
    }
    const newProj = {
      id: `p_${Date.now()}`,
      title: `New Project ${projects.length + 1}`,
      description: 'Uploaded project — preview available below.',
      author: 'Unknown',
      tags: ['Student Upload'],
      rawLink: trimmed
    };
    setProjects((s) => [newProj, ...s]);
    setNewLink('');
    setMessage({ type: 'success', text: 'Project added! Click View to preview.' });
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
        (p.tags && p.tags.join(' ').toLowerCase().includes(q))
      );
    })
    .sort((a, b) => {
      if (sortBy === 'alpha') return a.title.localeCompare(b.title);
      if (sortBy === 'fav') return (b.fav ? 1 : 0) - (a.fav ? 1 : 0);
      return (b.id || '').localeCompare(a.id || '');
    });

  return (
    <div className="pv-root" style={{ fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial" }}>
      {/* Inline CSS block */}
      <style>{`
        .pv-root { padding: 22px; max-width: 1100px; margin: 0 auto; color: #e6f2f8; }
        .pv-header { display:flex; gap:12px; align-items:center; justify-content:space-between; margin-bottom:18px; }
        .pv-title { font-size:22px; font-weight:800; letter-spacing:0.2px; color: #dff6ff; }
        .pv-sub { font-size:13px; color:#9fb0bd; margin-top:4px; }
        .pv-controls { display:flex; gap:8px; align-items:center; flex-wrap:wrap; }
        .pv-search { padding:10px 12px; border-radius:10px; border:1px solid rgba(255,255,255,0.06); min-width:200px; background: rgba(255,255,255,0.02); color: inherit; }
        .pv-select { padding:10px 12px; border-radius:10px; border:1px solid rgba(255,255,255,0.06); background: rgba(255,255,255,0.02); color: inherit; }
        .pv-grid { display:grid; grid-template-columns: repeat(3, 1fr); gap:18px; margin-top:18px; }
        @media (max-width: 1024px) { .pv-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px) { .pv-grid { grid-template-columns: 1fr; } .pv-header { flex-direction:column; align-items:flex-start } }
        .pv-card { background: linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01)); border-radius:14px; padding:14px; box-shadow: 0 8px 30px rgba(2,6,23,0.6); backdrop-filter: blur(6px); position:relative; overflow:hidden; transition: transform .28s cubic-bezier(.2,.9,.25,1), box-shadow .28s; min-height:140px; display:flex; flex-direction:column; justify-content:space-between; }
        .pv-card:hover { transform: translateY(-8px) scale(1.01); box-shadow: 0 20px 50px rgba(6,18,30,0.7); }
        .pv-tags { display:flex; gap:8px; flex-wrap:wrap; margin-top:10px; }
        .pv-tag { font-size:12px; padding:6px 10px; border-radius:999px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.03); color: #cfeffb; }
        .pv-actions { display:flex; gap:8px; margin-top:12px; align-items:center; }
        .pv-btn { padding:8px 12px; border-radius:10px; border:none; cursor:pointer; font-weight:700; background: rgba(255,255,255,0.02); color: #dff6ff; }
        .pv-btn.ghost { background:transparent; border:1px solid rgba(255,255,255,0.06); }
        .pv-btn.primary { background: linear-gradient(90deg,#6ee7b7,#60a5fa); color:#04243a; box-shadow: 0 6px 18px rgba(96,165,250,0.12); }
        .pv-author { font-weight:700; font-size:13px; color:#bfeff2; text-transform:capitalize; }
        .pv-desc { color:#9fb0bd; font-size:13px; margin-top:6px; }
        @keyframes floatIn { from { transform: translateY(10px) scale(.98); opacity:0 } to { transform:translateY(0) scale(1); opacity:1 } }
        .pv-card { animation: floatIn .42s ease both; }
        .pv-modal { position:fixed; inset:0; display:flex; align-items:center; justify-content:center; z-index:120; }
        .pv-backdrop { position:absolute; inset:0; background: linear-gradient(180deg, rgba(2,6,23,0.6), rgba(2,6,23,0.85)); backdrop-filter: blur(4px); }
        .pv-modal-inner { position:relative; z-index:121; width: min(1100px, 95%); max-height:92vh; overflow:auto; border-radius:12px; padding:18px; background: linear-gradient(180deg,#04111b, #07202b); box-shadow:0 30px 80px rgba(2,6,23,0.85); }
        .pv-preview { width:100%; height:520px; border-radius:10px; border: none; display:block; }
        .pv-msg { margin-top:12px; padding:8px 12px; border-radius:10px; display:inline-block; }
        .pv-msg.success { background: linear-gradient(90deg,#052e1a,#08303a); color:#bff2d8; }
        .pv-msg.error { background: linear-gradient(90deg,#2e041a,#3a031f); color:#ffc7d0; }
        .sparkle { position:absolute; right:-36px; top:-36px; width:160px; opacity:.06; pointer-events:none; }
      `}</style>

      <div className="pv-header">
        <div>
          <div className="pv-title">Student Projects</div>
          <div className="pv-sub">Pro showcase — inline JSON, Google Slides & Drive preview</div>
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
          placeholder="Paste Google Drive/Slides share link"
          value={newLink}
          onChange={(e) => setNewLink(e.target.value)}
          style={{ flex: 1, minWidth: 280, padding: 10, borderRadius: 10, border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)', color: 'inherit' }}
          aria-label="New project Google Drive link"
        />
        <button className="pv-btn primary" onClick={addProjectFromDrive} aria-label="Add project">Add Project</button>
      </div>

      {message && (
        <div className={`pv-msg ${message.type === 'success' ? 'success' : 'error'}`}>
          {message.text}
        </div>
      )}

      <div className="pv-grid" role="list">
        {filtered.map((p) => (
          <article key={p.id} className="pv-card" role="listitem" aria-labelledby={`title-${p.id}`}>
            <svg className="sparkle" viewBox="0 0 200 200" aria-hidden>
              <rect x="18" y="36" width="6" height="6" rx="1" fill="#ffd166" />
              <rect x="68" y="16" width="5" height="5" rx="1" fill="#06d6a0" />
              <rect x="136" y="58" width="4" height="4" rx="1" fill="#ef476f" />
            </svg>

            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
              <div style={{ flex: 1 }}>
                <div id={`title-${p.id}`} style={{ fontSize: 16, fontWeight: 800 }}>{p.title}</div>
                <div className="pv-desc">{p.description}</div>
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

            <div className="pv-actions" style={{ marginTop: 12 }}>
              <button className="pv-btn" onClick={() => setSelected(p)} aria-label={`View ${p.title}`}>View</button>
              <a className="pv-btn ghost" href={p.rawLink} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>Open Share Link</a>
            </div>
          </article>
        ))}
      </div>

      {/* Modal preview */}
      {selected && (
        <div className="pv-modal" role="dialog" aria-modal="true">
          <div className="pv-backdrop" onClick={() => setSelected(null)} />
          <div className="pv-modal-inner" role="document" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
              <div>
                <div style={{ fontSize: 18, fontWeight: 800 }}>{selected.title}</div>
                <div style={{ color: '#9fb0bd', fontSize: 13 }}>{selected.author}</div>
              </div>

              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  className="pv-btn"
                  onClick={() => {
                    try {
                      navigator.clipboard?.writeText(selected.rawLink);
                      setMessage({ type: 'success', text: 'Share link copied to clipboard' });
                      setTimeout(() => setMessage(null), 1800);
                    } catch (e) {
                      setMessage({ type: 'error', text: 'Copy failed' });
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
                <iframe className="pv-preview" title={`preview-${selected.id}`} src={makeEmbed(selected.rawLink).url} />
              ) : (
                <div style={{ padding: 18, borderRadius: 8, background: '#03121a', color: '#cbd5dd' }}>
                  <div>Preview not available. Use a Google Drive or Slides share link that contains a file id.</div>
                  <code style={{ display: 'block', marginTop: 8, color: '#98c0d6' }}>
                    Example: https://docs.google.com/presentation/d/FILE_ID/edit or https://drive.google.com/file/d/FILE_ID/view
                  </code>
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
        Tip: Presentations embed when Google Slides share links are public to anyone with the link. If preview is blank, set the file's sharing to "Anyone with the link → Viewer".
      </div>
    </div>
  );
}
