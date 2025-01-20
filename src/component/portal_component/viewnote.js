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
    <div style={{marginLeft:"5px"}}>
      <h2>Lesson Notes for Review</h2>
      {lessonNotes.length > 0 ? (
        <ul className="lesson-notes-list">
          {lessonNotes.map((note) => (
            <li key={note.id} className="lesson-note-item">
              <h6>Posted by {note.name}</h6>
              <p><strong>Subject:</strong> {note.subject}</p>
              <p><strong>Class:</strong> {note.classLevel}</p>
              <p><strong>Date Posted:</strong> {note.date}</p>
              <p><strong>Duration:</strong> {note.duration}</p>
              <p><strong>Week:</strong> {note.week}</p>
              <p><strong>Day / Date:</strong> {note.day}</p>
              <p><strong>Topic:</strong> {note.topic}</p>
              <p><strong>Sub-Topic:</strong> {note.subTopic}</p>
              <p><strong>Reference:</strong> {note.reference}</p>
              <p><strong>Objectives:</strong></p><textarea style={{height:"350px",border:"none"}} readOnly>{note.objectives}</textarea>
              <p><strong>RPK:</strong> {note.rpk}</p>
              <p><strong>TLMs:</strong> {note.tlms}</p>
              <p><strong>Introduction:</strong></p> <textarea style={{border:"none", height:"350px"}} readOnly> {note.introduction}</textarea>
              <p><strong>Content Development:</strong></p><textarea style={{border:"none", height:"350px"}} readOnly> {note.contentDevelopment}</textarea>
              <p><strong>Activity:</strong> {note.activity}</p>
              <p><strong>Conclusion:</strong> {note.conclusion}</p>
              <p><strong>Evaluation:</strong> {note.evaluation}</p>
              <p><strong>Assignment:</strong> {note.assignment}</p>
              <div>
                <br/>
              
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
<br/>
<br/>
    
    </>
  );
}

