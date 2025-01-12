import React, { useState, useEffect } from 'react';
import Breadcrumb from "../breadcrumb";

export default function LNote() {
  const notedb = process.env.REACT_APP_NOTE_DB;
  const [formData, setFormData] = useState({
    subject: '',
    classLevel: '',
    date: new Date().toISOString().split('T')[0],
    duration: '',
    week: '',
    day: '',
    topic: '',
    subTopic: '',
    reference: '',
    objectives: '',
    rpk: '',
    tlms: '',
    introduction: '',
    contentDevelopment: '',
    activity: '',
    conclusion: '',
    evaluation: '',
    assignment: ''
  });

  const [lessonNotes, setLessonNotes] = useState([]); // State to hold fetched lesson notes

  useEffect(() => {
    setFormData({ ...formData, date: new Date().toISOString().split('T')[0] });
    fetchLessonNotes(); // Fetch existing notes on component mount
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${notedb}/note`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Lesson note submitted successfully!');
        setFormData({
          subject: '',
          classLevel: '',
          date: new Date().toISOString().split('T')[0],
          duration: '',
          week: '',
          day: '',
          topic: '',
          subTopic: '',
          reference: '',
          objectives: '',
          rpk: '',
          tlms: '',
          introduction: '',
          contentDevelopment: '',
          activity: '',
          conclusion: '',
          evaluation: '',
          assignment: ''
        });
        fetchLessonNotes(); // Refresh notes after submission
      } else {
        alert('Failed to submit lesson note.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred.');
    }
  };

  const fetchLessonNotes = async () => {
    try {
      const response = await fetch(`${notedb}/note`);
      const data = await response.json();
      setLessonNotes(data); // Store notes in state
    } catch (error) {
      console.error('Error fetching lesson notes:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${notedb}/note/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        alert('Lesson note deleted successfully!');
        fetchLessonNotes(); // Refresh notes after deletion
      } else {
        alert('Failed to delete lesson note.');
      }
    } catch (error) {
      console.error('Error deleting lesson note:', error);
    }
  };

  return (
    <>
    <Breadcrumb title="Create Lesson Note" />
    <div>
      <form onSubmit={handleSubmit} className="lesson-note-form">
        <label>Subject:</label>
        <input type="text" name="subject" value={formData.subject} onChange={handleChange} required />

        <label>Class:</label>
        <input type="text" name="classLevel" value={formData.classLevel} onChange={handleChange} required />

        <label>Date:</label>
        <input type="text" name="date" value={formData.date} readOnly />

        <label>Duration:</label>
        <input type="text" name="duration" value={formData.duration} onChange={handleChange} />

        <label>Week:</label>
        <input type="number" name="week" value={formData.week} onChange={handleChange} required />

        <label>Day:</label>
        <input type="text" name="day" value={formData.day} onChange={handleChange} />

        <label>Topic:</label>
        <input type="text" name="topic" value={formData.topic} onChange={handleChange} required />

        <label>Sub-Topic:</label>
        <input type="text" name="subTopic" value={formData.subTopic} onChange={handleChange} required />

        <label>Reference:</label>
        <input type="text" name="reference" value={formData.reference} onChange={handleChange} required />

        <label>Objectives:</label>
        <textarea name="objectives" value={formData.objectives} onChange={handleChange} required />

        <label>RPK:</label>
        <textarea name="rpk" value={formData.rpk} onChange={handleChange} required />

        <label>TLMs:</label>
        <textarea name="tlms" value={formData.tlms} onChange={handleChange} required />

        <label>Introduction:</label>
        <textarea name="introduction" value={formData.introduction} onChange={handleChange} required />

        <label>Content Development:</label>
        <textarea name="contentDevelopment" value={formData.contentDevelopment} onChange={handleChange} required />

        <label>Activity:</label>
        <textarea name="activity" value={formData.activity} onChange={handleChange} required />

        <label>Conclusion:</label>
        <textarea name="conclusion" value={formData.conclusion} onChange={handleChange} required />

        <label>Evaluation:</label>
        <textarea name="evaluation" value={formData.evaluation} onChange={handleChange} required />

        <label>Assignment:</label>
        <textarea name="assignment" value={formData.assignment} onChange={handleChange} required />

        <button type="submit">Submit Lesson Note</button>
      </form>

      <h2>Lesson Notes</h2>
      <ul>
        {lessonNotes.map((note) => (
          <li key={note.id}>
            <p><strong>Topic:</strong> {note.topic}</p>
            <p><strong>Class:</strong> {note.classLevel}</p>
            <p><strong>Date:</strong> {note.date}</p>
            <button onClick={() => handleDelete(note.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
}
