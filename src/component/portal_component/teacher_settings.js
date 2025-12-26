import React, { useEffect, useState } from "react";
import {
  getAuth,
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { doc, deleteDoc, setDoc, getDoc } from "firebase/firestore";
import { db } from ".//./firebase";

export default function TeacherSettings({ user }) {
  const auth = getAuth();
  const [currentUser, setCurrentUser] = useState(null);

  const [activeSection, setActiveSection] = useState("profile");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  /* ================= AUTH GUARD ================= */
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => {
      if (!u) return;
      setCurrentUser(u);
      setDisplayName(user?.name || "");
    });
    return () => unsub();
  }, [auth, user]);

  if (!currentUser) {
    return <p style={{ padding: 20 }}>Loading settings...</p>;
  }

  /* ================= UPDATE PROFILE ================= */
  async function updateProfile() {
    if (!displayName.trim()) {
      alert("Name cannot be empty");
      return;
    }

    try {
      setLoading(true);

      const ref = doc(db, "users", currentUser.uid);
      const snap = await getDoc(ref);

      await setDoc(
        ref,
        {
          name: displayName,
          email: currentUser.email,
          updatedAt: new Date(),
        },
        { merge: true }
      );

      alert("Profile updated successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  }

  /* ================= DELETE ACCOUNT ================= */
  async function handleDeleteAccount() {
    if (!password) {
      alert("Enter your password to confirm");
      return;
    }

    if (!window.confirm("This action is permanent. Continue?")) return;

    try {
      setLoading(true);

      const credential = EmailAuthProvider.credential(
        currentUser.email,
        password
      );

      await reauthenticateWithCredential(currentUser, credential);

      await deleteDoc(doc(db, "users", currentUser.uid));
      await deleteUser(currentUser);

      alert("Account deleted successfully");
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      alert(err.message || "Account deletion failed");
    } finally {
      setLoading(false);
    }
  }

  /* ================= UI ================= */
  return (
    <div style={styles.wrapper}>
      <aside style={styles.side}>
        {["profile", "security", "danger"].map((tab) => (
          <button
            key={tab}
            style={{
              ...styles.sideBtn,
              background: activeSection === tab ? "#7a5018" : "transparent",
              color: activeSection === tab ? "#fff" : "#333",
            }}
            onClick={() => setActiveSection(tab)}
          >
            {tab === "profile" && "Profile"}
            {tab === "security" && "Security"}
            {tab === "danger" && "Danger Zone"}
          </button>
        ))}
      </aside>

      <section style={styles.content}>
        {activeSection === "profile" && (
          <Block title="Profile Information">
            <input
              style={styles.input}
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Full Name"
            />
            <input
              style={{ ...styles.input, background: "#f5f5f5" }}
              value={currentUser.email}
              disabled
            />
            <button
              style={styles.primaryBtn}
              onClick={updateProfile}
              disabled={loading}
            >
              Save Changes
            </button>
          </Block>
        )}

        {activeSection === "security" && (
          <Block title="Account Security">
            <p style={styles.text}>
              Your authentication is securely handled by Firebase.
            </p>
          </Block>
        )}

        {activeSection === "danger" && (
          <Block title="Danger Zone">
            <p style={styles.dangerText}>
              This action permanently deletes your account.
            </p>
            <input
              type="password"
              placeholder="Confirm password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
            <button
              style={styles.dangerBtn}
              onClick={handleDeleteAccount}
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete Account"}
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
  wrapper: { display: "flex", minHeight: "100vh", background: "#f4f7fb" },
  side: {
    width: 220,
    background: "#fff",
    padding: 15,
    borderRight: "1px solid #eee",
  },
  sideBtn: {
    width: "100%",
    padding: 12,
    borderRadius: 10,
    border: "none",
    marginBottom: 10,
    cursor: "pointer",
    fontWeight: 600,
  },
  content: { flex: 1, padding: 25 },
  block: {
    background: "#fff",
    borderRadius: 14,
    padding: 25,
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    maxWidth: 520,
  },
  blockTitle: { marginBottom: 15, color: "#7a5018" },
  input: {
    width: "100%",
    padding: 12,
    borderRadius: 10,
    border: "1px solid #ccc",
    marginBottom: 12,
  },
  primaryBtn: {
    background: "#7a5018",
    color: "#fff",
    padding: 12,
    border: "none",
    borderRadius: 10,
    fontWeight: 600,
    cursor: "pointer",
  },
  dangerBtn: {
    background: "#b91c1c",
    color: "#fff",
    padding: 12,
    border: "none",
    borderRadius: 10,
    fontWeight: 600,
    cursor: "pointer",
  },
  text: { fontSize: 14, color: "#555" },
  dangerText: { color: "#b91c1c", fontWeight: 600 },
};