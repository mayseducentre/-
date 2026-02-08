import React, { useEffect, useState } from "react";
import {
  getAuth,
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { doc, deleteDoc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function StudentSettings() {
  const auth = getAuth();
  const [currentUser, setCurrentUser] = useState(null);
  const [activeSection, setActiveSection] = useState("profile");

  // Basic student fields
  const [fullName, setFullName] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [guardianContact, setGuardianContact] = useState("");
  const [email, setEmail] = useState("");
  const [profilePic, setProfilePic] = useState("");

  // Danger zone
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  /* ================= RESPONSIVE ================= */
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const resize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  /* ================= AUTH GUARD ================= */
  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (u) => {
      if (!u) return;
      setCurrentUser(u);

      const snap = await getDoc(doc(db, "users", u.uid));
      if (snap.exists()) {
        const data = snap.data();
        setFullName(data.name || "");
        setClassLevel(data.classLevel || "");
        setGuardianContact(data.guardianContact || "");
        setEmail(data.email || "");
        setProfilePic(data.photoURL || "");
      }
    });
    return () => unsub();
  }, [auth]);

  if (!currentUser) {
    return <p style={{ padding: 20 }}>Loading profile...</p>;
  }

  /* ================= UPDATE PROFILE ================= */
  async function updateProfile() {
    if (!fullName.trim()) {
      alert("Please enter your full name");
      return;
    }
    if (!classLevel) {
      alert("Please enter your class");
      return;
    }

    try {
      setLoading(true);
      await setDoc(
        doc(db, "users", currentUser.uid),
        {
          name: fullName,
          classLevel,
          guardianContact,
          photoURL: profilePic,
          updatedAt: new Date(),
        },
        { merge: true }
      );
      alert("Profile updated successfully");
    } catch (err) {
      console.error(err);
      alert("Could not update profile");
    } finally {
      setLoading(false);
    }
  }

  /* ================= DELETE ACCOUNT ================= */
  async function handleDeleteAccount() {
    if (!password) {
      alert("Enter password to continue");
      return;
    }
    if (!window.confirm("This will permanently delete this account. Continue?"))
      return;

    try {
      setLoading(true);
      const credential = EmailAuthProvider.credential(
        currentUser.email,
        password
      );
      await reauthenticateWithCredential(currentUser, credential);
      await deleteDoc(doc(db, "users", currentUser.uid));
      await deleteUser(currentUser);
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      alert("Account deletion failed");
    } finally {
      setLoading(false);
    }
  }

  /* ================= UI ================= */
  return (
    <div
      style={{
        ...styles.wrapper,
        flexDirection: isMobile ? "column" : "row",
      }}
    >
      {/* SIDEBAR */}
      <aside
        style={{
          ...styles.side,
          width: isMobile ? "100%" : 220,
        }}
      >
        {["profile", "danger"].map((tab) => (
          <button
            key={tab}
            style={{
              ...styles.sideBtn,
              background:
                activeSection === tab ? "#7a5018" : "transparent",
              color: activeSection === tab ? "#fff" : "#333",
            }}
            onClick={() => setActiveSection(tab)}
          >
            {tab === "profile" && "My Profile"}
            {tab === "danger" && "Delete Account"}
          </button>
        ))}
      </aside>

      {/* CONTENT */}
      <section style={styles.content}>
        {activeSection === "profile" && (
          <Block title="Student Profile">
            <input
              style={{ ...styles.input, background: "#f5f5f5" }}
              value={email}
              disabled
              placeholder="Email"
            />

            <input
              style={styles.input}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full Name"
            />

            <input
              style={styles.input}
              value={classLevel}
              onChange={(e) => setClassLevel(e.target.value)}
              placeholder="Class (e.g. P5, JHS 2)"
            />

            <input
              style={styles.input}
              value={guardianContact}
              onChange={(e) => setGuardianContact(e.target.value)}
              placeholder="Parent / Guardian Contact"
            />

            <input
              style={styles.input}
              value={profilePic}
              onChange={(e) => setProfilePic(e.target.value)}
              placeholder="Profile Picture URL (optional)"
            />

            <button
              style={styles.primaryBtn}
              onClick={updateProfile}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </Block>
        )}

        {activeSection === "danger" && (
          <Block title="Delete Account">
            <p style={styles.dangerText}>
              This action is permanent. Please ask a parent or teacher before
              continuing.
            </p>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
            <button
              style={styles.dangerBtn}
              onClick={handleDeleteAccount}
              disabled={loading}
            >
              Delete Account
            </button>
          </Block>
        )}
      </section>
    </div>
  );
}

/* ================= UI BLOCK ================= */
const Block = ({ title, children }) => (
  <div style={styles.block}>
    <h3 style={styles.blockTitle}>{title}</h3>
    {children}
  </div>
);

/* ================= STYLES ================= */
const styles = {
  wrapper: {
    display: "flex",
    minHeight: "100vh",
    background: "#f4f7fb",
  },
  side: {
    background: "#fff",
    padding: 10,
  },
  sideBtn: {
    width: "100%",
    padding: 12,
    borderRadius: 10,
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
    marginBottom: 8,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  block: {
    background: "#fff",
    borderRadius: 14,
    padding: 20,
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    maxWidth: 500,
    margin: "0 auto",
  },
  blockTitle: {
    marginBottom: 15,
    color: "#7a5018",
  },
  input: {
    width: "100%",
    padding: 14,
    borderRadius: 10,
    border: "1px solid #ccc",
    marginBottom: 12,
    fontSize: 15,
  },
  primaryBtn: {
    background: "#7a5018",
    color: "#fff",
    padding: 14,
    width: "100%",
    border: "none",
    borderRadius: 10,
    fontWeight: 600,
    cursor: "pointer",
  },
  dangerBtn: {
    background: "#b91c1c",
    color: "#fff",
    padding: 14,
    width: "100%",
    border: "none",
    borderRadius: 10,
    fontWeight: 600,
    cursor: "pointer",
  },
  dangerText: {
    color: "#b91c1c",
    fontWeight: 600,
    marginBottom: 10,
    fontSize: 14,
  },
};