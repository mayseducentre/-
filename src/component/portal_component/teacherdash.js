import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../firebase";
import MeetStaff from "./meet_teachers";

export default function TeacherDash() {
  const auth = getAuth();
  const user = auth.currentUser;

  const [profile, setProfile] = useState(null);

  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [parents, setParents] = useState([]);
  const [subjects, setSubjects] = useState([]);

  /* ================= FETCH LOGGED-IN STAFF PROFILE ================= */
  useEffect(() => {
    if (!user) return;

    async function fetchProfile() {
      try {
        const snap = await getDoc(doc(db, "users", user.uid));
        if (snap.exists()) {
          setProfile(snap.data());
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    }

    fetchProfile();
  }, [user]);

  /* ================= FETCH COUNTS ================= */
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
      {/* ================= HEADER / PROFILE ================= */}
      <div style={styles.header}>
        <div style={styles.profileRow}>
          <img
            src={profile?.photoURL || "/default-avatar.png"}
            alt="profile"
            style={styles.avatar}
          />

          <div>
            <h2 style={styles.username}>
              {profile?.name || "Staff Member"}
            </h2>

            <p style={styles.email}>
              {profile?.email || user?.email}
            </p>

            <p style={styles.uid}>
              Staff ID: {profile?.uniqueId || "—"}
            </p>
          </div>
        </div>
      </div>

      {/* ================= STATS ================= */}
      <div style={styles.cardsContainer}>
        <StatCard title="Students" value={students.length} />
        <StatCard title="Teachers" value={teachers.length} />
        <StatCard title="Parents" value={parents.length} />
        <StatCard title="Subjects" value={subjects.length} />
      </div>

      {/* ================= MEET STAFF ================= */}
      <section style={{ marginTop: 40 }}>
        <h3 style={styles.sectionTitle}>Meet Your Staff</h3>
        <MeetStaff />
      </section>
    </div>
  );
}

/* ================= STAT CARD ================= */
const StatCard = ({ title, value }) => (
  <div style={styles.card}>
    <span style={styles.cardTitle}>{title}</span>
    <span style={styles.cardValue}>{value}</span>
  </div>
);

/* ================= STYLES ================= */
const styles = {
  wrapper: {
    padding: 20,
    width:"100%"
    margin: "0 auto",
    fontFamily: "Inter, system-ui, sans-serif",
  },

  header: {
    background: "linear-gradient(135deg, #ffedd5, #fed7aa)",
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,

  },

  profileRow: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    flexWrap: "wrap",
    width:"100%"
  },

  avatar: {
    width: 82,
    height: 82,
    borderRadius: "50%",
    objectFit: "cover",
    background: "#fff",
    border: "3px solid #fff",
  },

  username: {
    fontSize: 22,
    fontWeight: 600,
    margin: 0,
  },

  email: {
    fontSize: 14,
    color: "#555",
    marginTop: 2,
  },

  uid: {
    fontSize: 13,
    color: "#7a5018",
    fontWeight: 600,
    marginTop: 4,
  },

  cardsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: 16,
  },

  card: {
    background: "#fff",
    borderRadius: 14,
    padding: 18,
    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
    textAlign: "center",
  },

  cardTitle: {
    fontSize: 13,
    color: "#777",
  },

  cardValue: {
    fontSize: 26,
    fontWeight: 700,
    color: "#7a5018",
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 600,
    marginBottom: 16,
  },
};