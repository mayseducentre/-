import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "../../firebase";
import MeetStaff from "./meet_teachers";

export default function TeacherDash() {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [parents, setParents] = useState([]);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const q = query(collection(db, "users"), orderBy("createdAt", "desc"));
        const snap = await getDocs(q);
        const allUsers = snap.docs.map(doc => doc.data());

        setStudents(allUsers.filter(u => u.role === "student"));
        const staff = allUsers.filter(u => u.role === "staff");
        setTeachers(staff);
        setParents(allUsers.filter(u => u.role === "parent"));

        // Unique subjects from teachers
        const subjList = staff.map(u => u.subject).filter(Boolean);
        setSubjects([...new Set(subjList)]);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    }
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: 15 }}>
      <h5 style={{ marginBottom: 20, color: "teal" }}>Teacher Dashboard</h5>

      {/* Dashboard Cards */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
        <Card title="Total Students" value={students.length} />
        <Card title="Total Teachers" value={teachers.length} />
        <Card title="Total Parents" value={parents.length} />
        <Card title="Subjects Taught" value={subjects.length} />
      </div>

      {/* Meet Staff */}
      <div style={{ marginTop: 40 }}>
        <h3 style={{ color: "#7a5018", marginBottom: 15 }}>Meet Your Staff</h3>
        <MeetStaff />
      </div>
    </div>
  );
}

// Reusable Card Component
const Card = ({ title, value }) => (
  <div
    style={{
      flex: "1 1 220px",
      background: "#fff",
      padding: 15,
      borderRadius: 12,
      boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
      minHeight: 100,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      transition: "transform 0.2s",
      cursor: "pointer",
    }}
    onMouseEnter={e => e.currentTarget.style.transform="scale(1.05)"}
    onMouseLeave={e => e.currentTarget.style.transform="scale(1)"}
  >
    <h5 style={{ marginBottom: 10, color: "#333" }}>{title}</h5>
    <h3 style={{ color: "#7a5018" }}>{value}</h3>
  </div>
);