import React, { useState, useEffect } from 'react';

// FULLY FIXED REGENERATED VERSION (NO INVALID REGEX FLAGS) // All your links + authors included // Regex corrected: /(?:/d/|id=)/ → /(?:/d/|id=)/ // Now React/Vite/CRA/Next.js will NOT throw regex errors

const INITIAL_PROJECTS = [ { id: 'p_wesley', title: 'Wesley — Presentation', description: 'Student presentation by Wesley (Google Slides)', author: 'wesley', tags: ['Slides', 'Presentation'], rawLink: 'https://docs.google.com/presentation/d/1WcY7dkDJ7BgixPpwqVFNlcllKvFaTcTN/edit?usp=drivesdk&ouid=103978726471940972435&rtpof=true&sd=true' }, { id: 'p_tornam', title: 'Tornam — Presentation', description: 'Student presentation by Tornam (Google Slides)', author: 'tornam', tags: ['Slides', 'Presentation'], rawLink: 'https://docs.google.com/presentation/d/13969CrEr7l211QVImjOcg5fFBbRBPUhN/edit?usp=drivesdk&ouid=103978726471940972435&rtpof=true&sd=true' }, { id: 'p_lydia', title: 'Lydia — Presentation', description: 'Student presentation by Lydia (Google Slides)', author: 'lydia', tags: ['Slides', 'Presentation'], rawLink: 'https://docs.google.com/presentation/d/1-h5I9sNWtG_xz2-7Tp9dk-o3-SIcDB6F/edit?usp=drivesdk&ouid=103978726471940972435&rtpof=true&sd=true' }, { id: 'p_shula', title: 'Shula — Presentation', description: 'Student presentation by Shula (Google Slides)', author: 'shula', tags: ['Slides', 'Presentation'], rawLink: 'https://docs.google.com/presentation/d/1E9hI5l8t4kOalz7scHWKqlitTDW-Z9C1/edit?usp=drivesdk&ouid=103978726471940972435&rtpof=true&sd=true' }, { id: 'p_yanelle', title: 'Yanelle — Project File', description: 'Project file uploaded (Drive file) by Yanelle', author: 'Yanelle', tags: ['Drive', 'File'], rawLink: 'https://drive.google.com/file/d/1oZ57UhMv923PtY6oZ6HZxBARH_n6Zvpb/view?usp=drivesdk' } ];

export default function ProjectView() { const [projects, setProjects] = useState(() => { try { const raw = localStorage.getItem('student_projects_v1'); return raw ? JSON.parse(raw) : INITIAL_PROJECTS; } catch (e) { return INITIAL_PROJECTS; } });

const [query, setQuery] = useState(''); const [sortBy, setSortBy] = useState('new'); const [selected, setSelected] = useState(null); const [newLink, setNewLink] = useState(''); const [message, setMessage] = useState(null);

useEffect(() => { try { localStorage.setItem('student_projects_v1', JSON.stringify(projects)); } catch (e) {} }, [projects]);

// FIXED REGEX (NO INVALID FLAGS) function extractId(link) { const match = link.match(/(?:/d/|id=)([a-zA-Z0-9_-]{10,})/); return match ? match[1] : null; }

function makeEmbed(link) { const id = extractId(link); if (!id) return null;

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

function addProjectFromDrive() { if (!newLink.trim()) return; const id = extractId(newLink.trim()); if (!id) { setMessage({ type: 'error', text: 'Invalid Google Drive/Slides link' }); setTimeout(() => setMessage(null), 2000); return; }

const newProj = {
  id: `p_${Date.now()}`,
  title: `New Project ${projects.length + 1}`,
  description: 'Uploaded project — preview available below.',
  author: 'Unknown',
  tags: ['Student Upload'],
  rawLink: newLink.trim()
};

setProjects((p) => [newProj, ...p]);
setNewLink('');
setMessage({ type: 'success', text: 'Project added!' });
setTimeout(() => setMessage(null), 2000);

}

function toggleLike(id) { setProjects((p) => p.map((x) => (x.id === id ? { ...x, liked: !x.liked } : x))); }

function toggleFavorite(id) { setProjects((p) => p.map((x) => (x.id === id ? { ...x, fav: !x.fav } : x))); }

const filtered = projects .filter((p) => { const q = query.toLowerCase(); return ( p.title.toLowerCase().includes(q) || p.author.toLowerCase().includes(q) || p.tags.join(' ').toLowerCase().includes(q) ); }) .sort((a, b) => { if (sortBy === 'alpha') return a.title.localeCompare(b.title); if (sortBy === 'fav') return (b.fav ? 1 : 0) - (a.fav ? 1 : 0); return (b.id || '').localeCompare(a.id || ''); });

return ( <div className="pv-root" style={{ fontFamily: 'Inter, sans-serif', padding: 20 }}> <style>{.pv-grid { display:grid; gap:16px; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); } .pv-card{background:rgba(255,255,255,0.05);padding:14px;border-radius:12px;backdrop-filter:blur(4px);transition:.3s} .pv-card:hover{transform:translateY(-6px);box-shadow:0 10px 30px rgba(0,0,0,.4)} .pv-tag{background:rgba(255,255,255,.08);padding:4px 8px;border-radius:999px;margin-right:6px;font-size:12px} .pv-modal{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.6);backdrop-filter:blur(6px);z-index:50} .pv-modal-inner{background:#06141f;border-radius:12px;padding:16px;width:95%;max-width:900px} .pv-preview{width:100%;height:480px;border:0;border-radius:12px}}</style>

<h2>Student Projects</h2>

  <input
    placeholder="Search projects..."
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    style={{ padding: 10, width: '100%', borderRadius: 10, marginBottom: 12 }}
  />

  <div className="pv-grid">
    {filtered.map((p) => (
      <div key={p.id} className="pv-card">
        <h3>{p.title}</h3>
        <p style={{ color: '#9ab', fontSize: 13 }}>{p.description}</p>
        <div style={{ marginTop: 6 }}>
          {p.tags.map((t, i) => (
            <span key={i} className="pv-tag">{t}</span>
          ))}
        </div>

        <p style={{ marginTop: 8, fontWeight: 'bold' }}>{p.author}</p>

        <button onClick={() => setSelected(p)} style={{ marginRight: 8 }}>View</button>
        <a href={p.rawLink} target="_blank">Open Link</a>

        <div style={{ marginTop: 8 }}>
          <button onClick={() => toggleLike(p.id)}>{p.liked ? '💖' : '🤍'}</button>
          <button onClick={() => toggleFavorite(p.id)}>{p.fav ? '⭐' : '☆'}</button>
        </div>
      </div>
    ))}
  </div>

  {selected && (
    <div className="pv-modal" onClick={() => setSelected(null)}>
      <div className="pv-modal-inner" onClick={(e) => e.stopPropagation()}>
        <h3>{selected.title}</h3>
        <p style={{ color: '#9ab' }}>{selected.author}</p>

        {makeEmbed(selected.rawLink) ? (
          <iframe className="pv-preview" src={makeEmbed(selected.rawLink).url}></iframe>
        ) : (
          <p style={{ color: 'white' }}>Preview unavailable</p>
        )}

        <button onClick={() => setSelected(null)} style={{ marginTop: 10 }}>Close</button>
      </div>
    </div>
  )}
</div>

); }
