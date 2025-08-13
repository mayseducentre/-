import React from "react";

export default function LessonList({
  notes,
  filters,
  onChangeFilters,
  search,
  onChangeSearch,
  onEdit,
  onView,
  onDelete,
  onExport
}) {
  const handleFilter = (key, val) => onChangeFilters({ ...filters, [key]: val });

  return (
    <div className="card">
      <h2>My Lesson Notes (Preloaded + Saved)</h2>

      {/* Filters */}
      <div className="grid-4">
        <div>
          <label>Class</label>
          <input
            value={filters.class}
            onChange={(e) => handleFilter("class", e.target.value)}
            placeholder="e.g., B3, JHS 1"
          />
        </div>
        <div>
          <label>Subject</label>
          <input
            value={filters.subject}
            onChange={(e) => handleFilter("subject", e.target.value)}
            placeholder="e.g., Science, ICT"
          />
        </div>
        <div>
          <label>Term</label>
          <input
            value={filters.term}
            onChange={(e) => handleFilter("term", e.target.value)}
            placeholder="e.g., Term 1"
          />
        </div>
        <div>
          <label>Search Topic/Week</label>
          <input
            value={search}
            onChange={(e) => onChangeSearch(e.target.value)}
            placeholder="type to search..."
          />
        </div>
      </div>

      {/* List */}
      <div>
        {notes.length === 0 ? (
          <p>No lesson notes found.</p>
        ) : (
          notes.map((n) => (
            <div key={n.id} className="lesson-item">
              <div>
                <div><strong>{n.topic}</strong> <span className="badge">{n.subject}</span></div>
                <div className="meta">
                  {n.class} • {n.term} • {n.week} {String(n.id).startsWith("seed-") ? "• Preloaded" : "• Saved"}
                </div>
              </div>
              <div>
                <button className="notebtn" onClick={() => onView(n)}>View</button>
                <button className="notebtn" onClick={() => onExport(n)}>Print / PDF</button>
                {!String(n.id).startsWith("seed-") && (
                  <>
                    <button className="notebtn" onClick={() => onEdit(n)}>Edit</button>
                    <button className="notebtn danger" onClick={() => onDelete(n.id)}>Delete</button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}