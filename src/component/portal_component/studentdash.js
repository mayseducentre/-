import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../../firebase";

export default function StudentDash() {
  const auth = getAuth();

  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState({
    students: 0,
    teachers: 0,
  });

  /* ================= AUTH ================= */
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u || null);
    });
    return () => unsub();
  }, [auth]);

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
      const snap = await getDocs(collection(db, "users"));
      const users = snap.docs.map((d) => d.data());

      setStats({
        students: users.filter((u) => u.role === "student").length,
        teachers: users.filter((u) => u.role === "staff").length,
      });
    }

    fetchUsers();
  }, []);

  if (!user || !profile) {
    return <p style={{ padding: 20 }}>Loading dashboard...</p>;
  }

  return (
    <div style={styles.page}>
      {/* ================= HERO ================= */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <img
            src={profile.photoURL || "/default-avatar.png"}
            alt="profile"
            style={styles.avatar}
          />

          <div>
            <h2 style={styles.name}>{profile.name}</h2>
            <p style={styles.email}>{profile.email || user.email}</p>
            <span style={styles.classTag}>
              Class: {profile.classLevel || "—"}
            </span>
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section style={styles.grid}>
        <StatCard title="Students" value={stats.students} icon="🎓" />
        <StatCard title="Teachers" value={stats.teachers} icon="👩🏽‍🏫" />
      </section>
    </div>
  );
}

/* ================= STAT CARD ================= */
const StatCard = ({ title, value, icon }) => (
  <div style={styles.card}>
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
    maxWidth: 1200,
    margin: "0 auto",
    fontFamily: "Inter, system-ui, sans-serif",
  },

  hero: {
    background: "linear-gradient(135deg, #7a5018, #d6a75c)",
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

  classTag: {
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
    background: "#fff",
    borderRadius: 18,
    padding: 22,
    display: "flex",
    alignItems: "center",
    gap: 16,
    boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
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
};