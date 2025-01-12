import React, { useEffect, useState } from 'react';
import Header from "../header";
import Breadcrumb from "../breadcrumb"

function LessonNoteList() {
  const [lessonNotes, setLessonNotes] = useState([]);
const notedb=process.env.REACT_APP_NOTE_DB 

  useEffect(() => {
    fetchLessonNotes();
  }, []);

  const fetchLessonNotes = async () => {
    try {
      const response = await fetch(`${notedb}/note`);
      if (response.ok) {
        const data = await response.json();
        setLessonNotes(data);
      } else {
        alert('Failed to fetch lesson notes.');
      }
    } catch (error) {
      console.error('Error fetching lesson notes:', error);
      alert('An error occurred while fetching lesson notes.');
    }
  };

  return (
    <div>
      <Header />
      <Breadcrumb title="View Lesson Notes" />
      <br />
      <br />

      
      {lessonNotes.length === 0 ? (
        <center> 
        <p>No lesson notes available.</p>
        </center>
      ) : (
        lessonNotes.map((note, index) => (
          <div key={index} className="lesson-note">
            <h3>Posted by {note.username} on {note.date}</h3>
            <h3>{note.subject} - {note.class}</h3>
            <p><strong>Week:</strong> {note.week}</p>
            <p><strong>Day:</strong> {note.day}</p>
            <p><strong>Topic:</strong> {note.topic}</p>
            <p><strong>Sub-Topic:</strong> {note.subTopic}</p>
            <p><strong>Introduction:</strong> {note.introduction}</p>
            <p><strong>Teaching Aids:</strong> {note.teachingAids}</p>
            <p><strong>Objectives:</strong> {note.objectives}</p>
            <p><strong>Main Content:</strong> {note.mainContent}</p>
            <p><strong>Conclusion:</strong> {note.conclusion}</p>
            <p><strong>Evaluation:</strong> {note.evaluation}</p>
            <p><strong>References:</strong> {note.references}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default LessonNoteList;