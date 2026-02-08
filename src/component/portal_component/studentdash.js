import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  getDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../firebase";
import MeetST from "./meet_students";

export default function StudentDash() {
  const auth = getAuth();
  const user = auth.currentUser;

  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState({
    students: 0,
    teachers: 0,
    parents: 0,
  });

  /* ================= FETCH PROFILE ================= */
  useEffect(() => {
    if (!user) return;

    async function fetchProfile() {
      const snap = await getDoc(doc(db, "users", user.uid));
      if (snap.exists()) setProfile(snap.data());
    }

    fetchProfile();
  }, [user]);

  /* ================= FETCH STATS ================= */
  useEffect(() => {
    async function fetchUsers() {
      const q = query(collection(db, "users"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      const users = snap.docs.map((d) => d.data());

      const staff = users.filter((u) => u.role === "staff");

      setStats({
        students: users.filter((u) => u.role === "student").length,
        teachers: staff.length,
        parents: users.filter((u) => u.role === "parent").length,
      });
    }

    fetchUsers();
  }, []);

  return (
    <div style={styles.page}>
      {/* ================= HERO ================= */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <img
            src={profile?.photoURL || "/default-avatar.png"}
            alt="profile"
            style={styles.avatar}
          />

          <div>
            <h2 style={styles.name}>{profile?.name || "Teacher"}</h2>
            <p style={styles.email}>{profile?.email || user?.email}</p>
            <span style={styles.staffId}>
              Staff ID: {profile?.uniqueId || "—"}
            </span>
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section style={styles.grid}>
        <StatCard title="Students" value={stats.students} icon="🎓" />
        <StatCard title="Teachers" value={stats.teachers} icon="👩🏽‍🏫" />
        <StatCard title="Parents" value={stats.parents} icon="👨‍👩‍👧" />
       
      </section>

      {/* ================= STAFF ================= */}
      <section style={{ marginTop: 50 }}>
        <h3 style={styles.sectionTitle}>Meet Students</h3>
        <MeetST />
      </section>
    </div>
  );
}

/* ================= STAT CARD ================= */
const StatCard = ({ title, value, icon }) => (
  <div
    style={styles.card}
    onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-6px)")}
    onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
  >
    <div style={styles.cardIcon}>{icon}</div>
    <div>
      <p style={styles.cardTitle}>{title}</p>
      <h2 style={styles.cardValue}>{value}</h2>
    </div>
  </div>
);

/* ================= STYLES ================= */
const styles = {
  page: {
    padding: 20,
    maxWidth: 1300,
    margin: "0 auto",
    fontFamily: "Inter, system-ui, sans-serif",
    animation: "fadeIn 0.6s ease",
  },

  hero: {
    background:
      "linear-gradient(135deg, #7a5018, #d6a75c)",
    borderRadius: 22,
    padding: 24,
    color: "#fff",
    marginBottom: 35,
    boxShadow: "0 20px 40px rgba(0,0,0,0.18)",
  },

  heroContent: {
    display: "flex",
    alignItems: "center",
    gap: 18,
    flexWrap: "wrap",
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: "50%",
    objectFit: "cover",
    border: "3px solid rgba(255,255,255,0.7)",
  },

  name: {
    fontSize: 24,
    fontWeight: 700,
    margin: 0,
  },

  email: {
    fontSize: 14,
    opacity: 0.9,
    marginTop: 4,
  },

  staffId: {
    display: "inline-block",
    marginTop: 6,
    padding: "4px 10px",
    borderRadius: 999,
    background: "rgba(255,255,255,0.15)",
    fontSize: 13,
    fontWeight: 600,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 20,
  },

  card: {
    background: "rgba(255,255,255,0.9)",
    backdropFilter: "blur(8px)",
    borderRadius: 18,
    padding: 22,
    display: "flex",
    alignItems: "center",
    gap: 16,
    boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
    transition: "all 0.3s ease",
    cursor: "pointer",
  },

  cardIcon: {
    fontSize: 34,
  },

  cardTitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },

  cardValue: {
    fontSize: 28,
    fontWeight: 700,
    color: "#7a5018",
    margin: 0,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: 700,
    marginBottom: 16,
  },
};