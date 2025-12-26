import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
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
        const allUsers = snap.docs.map((doc) => doc.data());

        setStudents(allUsers.filter((u) => u.role === "student"));
        const staff = allUsers.filter((u) => u.role === "staff");
        setTeachers(staff);
        setParents(allUsers.filter((u) => u.role === "parent"));

        // Unique subjects from teachers
        const subjList = staff.map((u) => u.subject).filter(Boolean);
        setSubjects([...new Set(subjList)]);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    }
    fetchUsers();
  }, []);

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.heading}>Teacher Dashboard</h2>

      {/* Dashboard Cards */}
      <div style={styles.cardsContainer}>
        <Card title="Total Students" value={students.length} color="#16a34a" />
        <Card title="Total Teachers" value={teachers.length} color="#2563eb" />
        <Card title="Total Parents" value={parents.length} color="#f59e0b" />
        <Card title="Subjects Taught" value={subjects.length} color="#7a5018" />
      </div>

      {/* Meet Staff */}
      <section style={{ marginTop: 40 }}>
        <h3 style={styles.subHeading}>Meet Your Staff</h3>
        <MeetStaff />
      </section>

      {/* Recent Activity Placeholder */}
      <section style={{ marginTop: 40 }}>
        <h3 style={styles.subHeading}>Recent Announcements</h3>
        <div style={styles.activityGrid}>
          <ActivityCard
            title="School Closed on Friday"
            desc="All classes are suspended due to maintenance."
            time="2 hours ago"
          />
          <ActivityCard
            title="Math Quiz This Week"
            desc="All students must prepare for the Math Quiz scheduled on Wednesday."
            time="1 day ago"
          />
        </div>
      </section>
    </div>
  );
}

/* ================= CARD COMPONENT ================= */
const Card = ({ title, value, color }) => (
  <div
    style={{
      ...styles.card,
      borderLeft: `5px solid ${color}`,
    }}
  >
    <h4 style={styles.cardTitle}>{title}</h4>
    <p style={{ ...styles.cardValue, color }}>{value}</p>
  </div>
);

/* ================= ACTIVITY CARD ================= */
const ActivityCard = ({ title, desc, time }) => (
  <div style={styles.activityCard}>
    <h4 style={{ marginBottom: 8 }}>{title}</h4>
    <p style={{ marginBottom: 8, color: "#555" }}>{desc}</p>
    <small style={{ color: "#888" }}>{time}</small>
  </div>
);

/* ================= STYLES ================= */
const styles = {
  wrapper: {
    padding: 20,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#333",
  },
  heading: {
    fontSize: 28,
    fontWeight: 600,
    marginBottom: 20,
    color: "#2563eb",
  },
  subHeading: {
    fontSize: 22,
    fontWeight: 600,
    marginBottom: 15,
    color: "#7a5018",
  },
  cardsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: 20,
  },
  card: {
    background: "#fff",
    borderRadius: 12,
    padding: 20,
    boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    cursor: "pointer",
    transition: "transform 0.2s",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 500,
    marginBottom: 10,
  },
  cardValue: {
    fontSize: 28,
    fontWeight: 600,
  },
  activityGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: 20,
  },
  activityCard: {
    background: "#fff",
    borderRadius: 12,
    padding: 20,
    boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
    transition: "transform 0.2s",
    cursor: "pointer",
  },
};