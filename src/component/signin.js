import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

import StudentPortal from "../portal/student_portal";
import ParentPortal from "../portal/parent_portal";
import TeachersPortal from "../portal/teachers_portal";

export default function SignLog() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [portal, setPortal] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1️⃣ Login
      const cred = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // 2️⃣ Refresh user to get latest verification status
      await cred.user.reload();

      if (!cred.user.emailVerified) {
        throw new Error("Email not verified");
      }

      // 3️⃣ Load profile
      const snap = await getDoc(doc(db, "users", cred.user.uid));
      if (!snap.exists()) {
        throw new Error("Profile not found");
      }

      const user = snap.data();

      // 4️⃣ Route by role
      if (user.role === "student") setPortal("student");
      else if (user.role === "staff") setPortal("staff");
      else if (user.role === "parent") setPortal("parent");
      else throw new Error("Invalid role");
    } catch (err) {
      if (err.message.includes("verify")) {
        setError("Please verify your email before logging in.");
      } else {
        setError("Invalid email or password.");
      }
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

  if (portal === "student") return <StudentPortal />;
  if (portal === "staff") return <TeachersPortal />;
  if (portal === "parent") return <ParentPortal />;

  return (
    <section className="containerS" id="portalogin">
      <div className="formpage login">
        <form onSubmit={handleLogin}>
          {error && <p style={{ color: "red" }}>{error}</p>}

          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <p
            style={{ cursor: "pointer", color: "blue" }}
            onClick={forgotPassword}
          >
            Forgot password?
          </p>

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </section>
  );
}