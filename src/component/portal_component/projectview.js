// ProjectView.jsx
import React, { useState, useEffect } from 'react';

// Projects component with inline JSON containing the user's provided links and authors.
// - Paste into a React app (Create React App / Vite / Next.js client component).
// - No external CSS: inline style block inside component.
// - Features: search, sort, like, favorite, add link, modal preview (Google Slides embed & Drive preview).
// - Note: Embedding depends on Google Drive sharing permissions (set to "Anyone with the link can view").

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
      console.warn('Could not persist projects', e);
    }
  }, [projects]);

  // Create embed info for slides vs drive files from a provided link
  function makeEmbed(link) {
    if (!link) return null;

    // Look for /d/FILE_ID or id=FILE_ID
    const idMatch = link.match(/(?:\\/d\\/|id=)([a-zA-Z0-9_-]{10,})/);
    const id = idMatch ? idMatch[1] : null;
    if (!id) return null;

    if (link.includes('docs.google.com/presentation') || link.includes('/presentation/d/')) {
      return {
        url: `https://docs.google.com/presentation/d/${id}/embed?start=false&loop=false&delayms=3000`,
        type: 'slides'
      };
    }

    // Fallback: Drive preview
    return { url: `https://drive.google.com/file/d/${id}/preview`, type: 'drive' };
  }

  function addProjectFromDrive() {
    const trimmed = newLink.trim();
    if (!trimmed) {
      setMessage({ type: 'error', text: 'Paste a Google Drive or Slides share link first.' });
      setTimeout(() => setMessage(null), 2500);
      return;
    }

    const embed = makeEmbed(trimmed);
    if (!embed) {
      setMessage({ type: 'error', text: 'Could not parse the link. Use a Google Drive or Slides share link.' });
      setTimeout(() => setMessage(null), 3500);
      return;
    }

    const id = `p_${Date.now()}`;
    const newProj = {
      id,
      title: `New Project ${projects.length + 1}`,
      description: 'Uploaded project — preview available below.',
      author: 'Unknown',
      tags: ['Student Upload'],
      rawLink: trimmed
    };

    setProjects((s) => [newProj, ...s]);
    setNewLink('');
    setMessage({ type: 'success', text: 'Project added! Click View to preview.' });
    setTimeout(() => setMessage(null), 3000);
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
      <style>{`
        .pv-root { padding: 20px; max-width: 1100px; margin: 0 auto; }
        .pv-header { display:flex; gap:12px; align-items:center; justify-content:space-between; margin-bottom:18px }
        .pv-title { font-size:20px; font-weight:700; letter-spacing:0.2px }
        .pv-sub { font-size:13px; color:#7a7f86 }
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
        @keyframes floatIn { from { transform: translateY(10px) scale(.98); opacity:0 } to { transform:translateY(0) scale(1); opacity:1 } }
        .pv-card { animation: floatIn .45s ease both }
        .pv-modal { position:fixed; inset:0; display:flex; align-items:center; justify-content:center; z-index:90 }
        .pv-backdrop { position:absolute; inset:0; background:linear-gradient(180deg,rgba(2,6,23,0.6),rgba(2,6,23,0.8)); backdrop-filter: blur(3px) }
        .pv-modal-inner { position:relative; z-index:91; width: min(1100px, 95%); max-height:90vh; overflow:auto; border-radius:12px; padding:18px; background: linear-gradient(180deg,#04111b, #07202b); box-shadow:0 30px 80px rgba(2,6,23,0.8) }
        .pv-preview { width:100%; height:480px; border-radius:8px; border:none }
        .pv-msg { margin-top:12px; padding:8px 12px; border-radius:10px }
        .pv-msg.success { background:linear-gradient(90deg,#052e1a,#08303a); color:#bff2d8 }
        .pv-msg.error { background:linear-gradient(90deg,#2e041a,#3a031f); color:#ffc7d0 }
        .confetti { position:absolute; right:-30px; top:-30px; width:180px; height:180px; pointer-events:none; opacity:.06 }
      `}</style>

      <div className="pv-header">
        <div>
          <div className="pv-title">Student Projects</div>
          <div className="pv-sub">Inline JSON with your provided Google Drive/Slides links</div>
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
          style={{ flex: 1, minWidth: 280, padding: 10, borderRadius: 10, border: '1px solid rgba(255,255,255,0.05)' }}
          aria-label="New project Google Drive link"
        />
        <button className="pv-btn primary" onClick={addProjectFromDrive} aria-label="Add project">Add Project</button>
      </div>

      {message && <div className={`pv-msg ${message.type === 'success' ? 'success' : 'error'}`}>{message.text}</div>}

      <div className="pv-grid">
        {filtered.map((p) => (
          <article key={p.id} className="pv-card" role="article" aria-labelledby={`title-${p.id}`}>
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
                href={p.rawLink}
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
                <button className="pv-btn" onClick={() => { navigator.clipboard?.writeText(selected.rawLink); setMessage({ type: 'success', text: 'Share link copied to clipboard' }); setTimeout(()=>setMessage(null),2000) }}>
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
                <div style={{ padding: 18, borderRadius: 8, background: '#03121a' }}>
                  <div style={{ color: '#cbd5dd' }}>Preview not available. Use a Google Drive or Slides share link that contains a file id.</div>
                  <code style={{ display: 'block', marginTop: 8, color: '#98c0d6' }}>https://docs.google.com/presentation/d/FILE_ID/edit or https://drive.google.com/file/d/FILE_ID/view</code>
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
        Tip: Presentations will embed using the Google Slides embed URL when possible. Files will preview using Drive's preview endpoint.
        If a link doesn't preview, check sharing permissions in Google Drive (set to 'Anyone with the link can view').
      </div>
    </div>
  );
}
