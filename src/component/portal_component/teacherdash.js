import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import MeetStaff from "./meet_teachers";

export default function TeacherDash() {
  const auth = getAuth();
  const user = auth.currentUser;

  const [stats, setStats] = useState({
    students: 0,
    teachers: 0,
    parents: 0,
    subjects: 0,
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const snap = await getDocs(collection(db, "users"));
        const users = snap.docs.map((d) => d.data());

        const staff = users.filter((u) => u.role === "staff");

        setStats({
          students: users.filter((u) => u.role === "student").length,
          teachers: staff.length,
          parents: users.filter((u) => u.role === "parent").length,
          subjects: [...new Set(staff.map((u) => u.subject).filter(Boolean))]
            .length,
        });
      } catch (e) {
        console.error(e);
      }
    }
    fetchStats();
  }, []);

  return (
    <div style={styles.container}>
      {/* ===== HEADER ===== */}
      <header style={styles.header}>
        <div style={styles.profile}>
          <img
            src={user?.photoURL || "https://i.pravatar.cc/100"}
            alt="profile"
            style={styles.avatar}
          />
          <div>
            <h3 style={styles.name}>
              {user?.displayName || "Staff Member"}
            </h3>
            <p style={styles.meta}>{user?.email}</p>
            <small style={styles.id}>ID: {user?.uid}</small>
          </div>
        </div>
      </header>

      {/* ===== STATS ===== */}
      <section style={styles.statsGrid}>
        <StatCard label="Students" value={stats.students} />
        <StatCard label="Teachers" value={stats.teachers} />
        <StatCard label="Parents" value={stats.parents} />
        <StatCard label="Subjects" value={stats.subjects} />
      </section>

      {/* ===== STAFF ===== */}
      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>Meet Staff</h3>
        <MeetStaff />
      </section>

      {/* ===== ANNOUNCEMENTS ===== */}
      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>Announcements</h3>
        <div style={styles.announcementGrid}>
          <Announcement
            title="School Closed Friday"
            text="Maintenance work ongoing."
          />
          <Announcement
            title="Weekly Assessment"
            text="Prepare students for quizzes."
          />
        </div>
      </section>
    </div>
  );
}

/* ================= COMPONENTS ================= */

const StatCard = ({ label, value }) => (
  <div style={styles.statCard}>
    <p style={styles.statLabel}>{label}</p>
    <h2 style={styles.statValue}>{value}</h2>
  </div>
);

const Announcement = ({ title, text }) => (
  <div style={styles.announcement}>
    <h4>{title}</h4>
    <p>{text}</p>
  </div>
);

/* ================= STYLES ================= */

const styles = {
  container: {
    padding: 20,
    maxWidth: 1200,
    margin: "0 auto",
    fontFamily: "Inter, system-ui, sans-serif",
    background: "#f7f8fa",
  },

  header: {
    background: "linear-gradient(135deg,#f97316,#fb923c)",
    borderRadius: 16,
    padding: 20,
    color: "#fff",
    marginBottom: 25,
  },

  profile: {
    display: "flex",
    alignItems: "center",
    gap: 15,
    flexWrap: "wrap",
  },

  avatar: {
    width: 70,
    height: 70,
    borderRadius: "50%",
    objectFit: "cover",
    border: "3px solid #fff",
  },

  name: { margin: 0, fontSize: 20 },
  meta: { margin: "2px 0", opacity: 0.9 },
  id: { fontSize: 12, opacity: 0.8 },

  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
    gap: 15,
    marginBottom: 30,
  },

  statCard: {
    background: "#fff",
    borderRadius: 14,
    padding: 20,
    boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
  },

  statLabel: {
    fontSize: 14,
    color: "#777",
  },

  statValue: {
    fontSize: 28,
    fontWeight: 600,
    marginTop: 5,
  },

  section: { marginBottom: 35 },

  sectionTitle: {
    fontSize: 20,
    marginBottom: 15,
    color: "#7a5018",
  },

  announcementGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
    gap: 15,
  },

  announcement: {
    background: "#fff",
    padding: 16,
    borderRadius: 12,
    boxShadow: "0 4px 14px rgba(0,0,0,0.05)",
  },
};