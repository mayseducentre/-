import React, { useEffect, useState } from 'react';
import Header from "../header"
import Breadcrumb from "../breadcrumb"
export default function NoteView() {
  const notedb = process.env.REACT_APP_NOTE_DB;
  const [lessonNotes, setLessonNotes] = useState([]);

  useEffect(() => {
    fetchLessonNotes(); // Fetch notes on load
  }, []);

  const fetchLessonNotes = async () => {
    try {
      const response = await fetch(`${notedb}/note`);
      const data = await response.json();
      setLessonNotes(data);
    } catch (error) {
      console.error('Error fetching lesson notes:', error);
    }
  };

  const handleMark = async (id) => {
    try {
      const response = await fetch(`${notedb}/note/${id}`, {
        method: 'PATCH', // Using PATCH to update the status of the note
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'Reviewed' }), // Mark the note as 'Reviewed'
      });

      if (response.ok) {
        alert('Lesson note marked as reviewed.');
        fetchLessonNotes(); // Refresh the notes list after marking
      } else {
        alert('Failed to mark lesson note.');
      }
    } catch (error) {
      console.error('Error marking lesson note:', error);
    }
  };

  return (
    <>
    <Header />
    <Breadcrumb title="View Lesson Note" />
<br/>
<a href="#/admin">Sign in as Admin</a>
<br/>
<br/>
    <div style={{margin:"5px"}}>
      <h2>Lesson Notes for Review</h2>
      {lessonNotes.length > 0 ? (
        <ul className="lesson-notes-list">
          {lessonNotes.map((note) => (
            <li key={note.id} className="lesson-note-item">
              <h6>Posted by {note.fname} on {note.dateposted}</h6>
              <p><strong>Subject:</strong> {note.subject}</p>
              <p><strong>Class:</strong> {note.classLevel}</p>
              <p><strong>Date:</strong> {note.dateW}</p>
              <p><strong>Duration:</strong> {note.duration}</p>
              <p><strong>Week:</strong> {note.week}</p>
              <p><strong>Day:</strong> {note.day}</p>
              <p><strong>Topic:</strong> {note.topic}</p>
              <p><strong>Sub-Topic:</strong> {note.subTopic}</p>
              <p><strong>Reference:</strong> {note.reference}</p>
              <p><strong>Objectives:</strong> {note.objectives}</p>
              <p><strong>RPK:</strong> {note.rpk}</p>
              <p><strong>TLMs:</strong> {note.tlms}</p>
              <p><strong>Introduction:</strong> {note.introduction}</p>
              <p><strong>Content Development:</strong> {note.contentDevelopment}</p>
              <p><strong>Activity:</strong> {note.activity}</p>
              <p><strong>Conclusion:</strong> {note.conclusion}</p>
              <p><strong>Evaluation:</strong> {note.evaluation}</p>
              <p><strong>Assignment:</strong> {note.assignment}</p>
              <div>
                <button
                  onClick={() => handleMark(note.id)}
                  className="mark-button" style={{borderRadius:"10px",padding:"10px 12px", background:"orange", color:"white"}}
                >
                  Mark as Reviewed
                </button>
              </div>
              {note.status && <p><strong>Status:</strong> {note.status}</p>}
            </li>
          ))}
        </ul>
      ) : (
        <p>No lesson notes available.</p>
      )}
    </div>

    
    </>
  );
}

