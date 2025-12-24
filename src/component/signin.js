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
import Daycarestaffportal from "../portal/daycarestaff";

export default function SignLog() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [portal, setPortal] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 1️⃣ Login
      const cred = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // 2️⃣ Block unverified emails
      if (!cred.user.emailVerified) {
        throw new Error("Email not verified");
      }

      // 3️⃣ Load profile
      const snap = await getDoc(doc(db, "users", cred.user.uid));
      if (!snap.exists()) throw new Error("Profile missing");

      const user = snap.data();

      // 4️⃣ Route by role
      if (user.role === "student") setPortal("student");
      if (user.role === "staff") setPortal("staff");
      if (user.role === "parent") setPortal("parent");
      if (user.role === "daycare") setPortal("daycare");
    } catch (err) {
      if (err.message.includes("verify")) {
        setError("Please verify your email. Check your inbox.");
      } else {
        setError("Invalid email or password");
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
      alert("Password reset email sent. Check your inbox.");
    } catch {
      alert("Failed to send reset email.");
    }
  }

  if (portal === "student") return <StudentPortal />;
  if (portal === "staff") return <TeachersPortal />;
  if (portal === "parent") return <ParentPortal />;
  if (portal === "daycare") return <Daycarestaffportal />;

  return (
    <section className="containerS" id="portalogin">
      <div className="formpage login">
        <form onSubmit={handleLogin}>
          {error && (
            <input
              readOnly
              value={error}
              style={{ color: "red", border: "none", width: "100%" }}
            />
          )}

          <div className="field input-field">
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="field input-field">
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <a style={{ cursor: "pointer" }} onClick={forgotPassword}>
              Forgot password
            </a>
          </div>

          <div className="field button-field">
            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}