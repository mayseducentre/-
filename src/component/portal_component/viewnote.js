import React, { useEffect, useState } from 'react';
import Header from "../header";
import Breadcrumb from "../breadcrumb";
import ScrollToTop from "react-scroll-to-top"

export default function NoteView() {
  const notedb = process.env.REACT_APP_NOTE_DB;
  const [lessonNotes, setLessonNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWeek, setSelectedWeek] = useState('');

  useEffect(() => {
    fetchLessonNotes();
  }, []);

  useEffect(() => {
    filterNotes();
  }, [searchTerm, selectedWeek, lessonNotes]);

  const fetchLessonNotes = async () => {
    try {
      const response = await fetch(`${notedb}/note`);
      const data = await response.json();
      setLessonNotes(data);
    } catch (error) {
      console.error('Error fetching lesson notes:', error);
    }
  };

  const filterNotes = () => {
    const filtered = lessonNotes.filter((note) => {
      const matchesSearch =
        note.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesWeek = selectedWeek ? note.week === selectedWeek : true;
      return matchesSearch && matchesWeek;
    });
    setFilteredNotes(filtered);
  };

  const handleMark = async (id) => {
    try {
      const response = await fetch(`${notedb}/note/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'Reviewed' }),
      });

      if (response.ok) {
        alert('Lesson note marked as reviewed.');
        fetchLessonNotes();
      } else {
        alert('Failed to mark lesson note.');
      }
    } catch (error) {
      console.error('Error marking lesson note:', error);
    }
  };

  const handleMarkAll = async () => {
    try {
      const promises = filteredNotes.map((note) =>
        fetch(`${notedb}/note/${note.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: 'Reviewed' }),
        })
      );
      await Promise.all(promises);
      alert('All visible notes marked as reviewed.');
      fetchLessonNotes();
    } catch (error) {
      console.error('Error marking all notes:', error);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <Header />
      <Breadcrumb title="View Lesson Note" />
      <br />
      <a href="#/admin">Sign in as Admin</a>
      <br />
      <br />
      <div style={{ marginLeft: "5px" }}>
        <h2>Lesson Notes for Review</h2>

        {/* Search and Filter Controls */}
        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Search by Topic, Subject, or Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "10px 12px",
              width: "250px",
              borderRadius: "20px",
              marginRight: "10px",
            }}
          />

          <br />
          <br />
          <select
            value={selectedWeek}
            onChange={(e) => setSelectedWeek(e.target.value)}
            style={{ padding: "8px", borderRadius: "5px", marginRight: "10px" }}
          >
            <option value="">All Weeks</option>
            {[...new Set(lessonNotes.map((note) => note.week))].map((week) => (
              <option key={week} value={week}>
                Week {week}
              </option>
            ))}
          </select>
          <br />
          <br/>
          <button
            onClick={handleMarkAll}
            style={{
              borderRadius: "10px",
              padding: "10px 12px",
              background: "orange",
              color: "white",
              marginRight: "10px",
            }}
          >
            Mark All as Reviewed
          </button>
          <br />
          <br />
          <button
            onClick={handlePrint}
            style={{border:"none",
              borderRadius: "10px",
              padding: "10px 12px",
              background: "skyblue",
              color: "white",
            }}
          >
            Print Notes
          </button>
        </div>

        {/* Lesson Notes */}
        {filteredNotes.length > 0 ? (
          <ul className="lesson-notes-list">
            {filteredNotes.map((note) => (
              <li
                key={note.id}
                className="lesson-note-item"
                style={{
                  border: "1px solid #ccc",
                  padding: "15px",
                  borderRadius: "10px",
                  marginBottom: "20px",
                }}
              >
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
                <p><strong>Objectives:</strong></p>
                <pre style={{ whiteSpace: "pre-wrap" }}>{note.objectives}</pre>
                <p><strong>RPK:</strong></p>
                <pre style={{ whiteSpace: "pre-wrap" }}>{note.rpk}</pre>
                <p><strong>TLMs:</strong></p>
                <pre style={{ whiteSpace: "pre-wrap" }}>{note.tlms}</pre>
                <p><strong>Introduction:</strong></p>
                <pre style={{ whiteSpace: "pre-wrap" }}>{note.introduction}</pre>
                <p><strong>Core Point:</strong></p>
                <pre style={{ whiteSpace: "pre-wrap" }}>{note.contentDevelopment}</pre>
                <p><strong>Activity:</strong></p>
                <pre style={{ whiteSpace: "pre-wrap" }}>{note.activity}</pre>
                <p><strong>Conclusion:</strong></p>
                <pre style={{ whiteSpace: "pre-wrap" }}>{note.conclusion}</pre>
                <p><strong>Evaluation:</strong></p>
                <pre style={{ whiteSpace: "pre-wrap" }}>{note.evaluation}</pre>
                <p><strong>Assignment:</strong></p>
                <pre style={{ whiteSpace: "pre-wrap" }}>{note.assignment}</pre>
                <div>
                  <br />
                  <button
                    onClick={() => handleMark(note.id)}
                    className="mark-button"
                    style={{
                      borderRadius: "10px",
                      padding: "10px 12px",
                      background: "orange",
                      color: "white",
                    }}
                  >
                    Mark as Reviewed
                  </button>
                </div>
                {note.status && <p><strong>Status:</strong> {note.status}</p>}
              </li>
            ))}
          </ul>
        ) : (
          <p>
            <div className="loadery"></div> <br /> No lesson notes available.
          </p>
        )}
      </div>
      <br />
      <br />
      <ScrollToTop smooth className="scrolly" /> 
    </>
  );
}