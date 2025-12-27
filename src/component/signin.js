import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

import TeachersPortal from "../portal/teachers_portal";
import StudentPortal from "../portal/student_portal";
import ParentPortal from "../portal/parent_portal";

export default function SignLog() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [portal, setPortal] = useState(null);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Preload remembered email
  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberMeEmail");
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRemember(true);
    }
  }, []);

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      await cred.user.reload();

      if (!cred.user.emailVerified) throw new Error("Email not verified");

      const snap = await getDoc(doc(db, "users", cred.user.uid));
      if (!snap.exists()) throw new Error("Profile not found");

      const user = snap.data();
      setUserData(user);

      // Remember Me: store/remove email
      if (remember) localStorage.setItem("rememberMeEmail", email);
      else localStorage.removeItem("rememberMeEmail");

      // Route by role
      if (user.role === "student") setPortal("student");
      else if (user.role === "staff") setPortal("staff");
      else if (user.role === "parent") setPortal("parent");
      else throw new Error("Invalid role");

    } catch (err) {
      console.error(err);
      if (err.message.includes("verify")) setError("Please verify your email.");
      else if (err.message.includes("Profile")) setError("User profile not found.");
      else if (err.message.includes("role")) setError("User role invalid.");
      else setError("Invalid email or password.");
    }

    setLoading(false);
  }

  async function forgotPassword() {
    if (!email) {
      alert("Enter your email first");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent.");
    } catch {
      alert("Failed to send reset email.");
    }
  }

  // Render portals
  if (portal === "student") return <StudentPortal user={userData} />;
  if (portal === "staff") return <TeachersPortal user={userData} />;
  if (portal === "parent") return <ParentPortal user={userData} />;

  // Styles
  const styles = {
    container: { display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f4f6f8", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" },
    formWrapper: { backgroundColor: "#fff", padding: "40px", borderRadius: "12px", boxShadow: "0px 8px 20px rgba(0,0,0,0.15)", width: "100%", maxWidth: "400px", textAlign: "center" },
    input: { width: "100%", padding: "12px 15px", margin: "10px 0", borderRadius: "8px", border: "1px solid #ccc", fontSize: "16px" },
    button: { width: "100%", padding: "12px", marginTop: "15px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "8px", fontSize: "16px", cursor: "pointer", transition: "background 0.3s" },
    forgotPassword: { color: "#007bff", cursor: "pointer", fontSize: "14px", marginTop: "10px", display: "block" },
    error: { color: "red", marginBottom: "10px" },
    checkboxContainer: { display: "flex", alignItems: "center", marginTop: "10px", fontSize: "14px" },
    checkbox: { marginRight: "8px" },
  };

  return (
    <div style={styles.container}>
      <div style={styles.formWrapper}>
        <h2 style={{ marginBottom: "20px" }}>Login</h2>
        <form onSubmit={handleLogin}>
          {error && <p style={styles.error}>{error}</p>}
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.input} required />
          <div style={styles.checkboxContainer}>
            <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} style={styles.checkbox} />
            Remember Me
          </div>
          <span style={styles.forgotPassword} onClick={forgotPassword}>Forgot password?</span>
          <button type="submit" style={styles.button} disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
        </form>
      </div>
    </div>
  );
}