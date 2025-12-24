import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import emailjs from "emailjs-com";

export default function Accountform() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("student");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  async function createAccount(e) {
    e.preventDefault();

    if (password.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }

    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const cred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await sendEmailVerification(cred.user);

      await setDoc(doc(db, "users", cred.user.uid), {
        uid: cred.user.uid,
        name,
        email,
        role,
        country: "Ghana",
        status: "active",
        createdAt: new Date(),
      });

      await emailjs.send(
        "service_4dt6s3i",
        "template_wwdrjbl",
        {
          to_name: name,
          user_email: email,
          mays_msg:
            "Your account has been created successfully.\n\n" +
            "Please check your email and VERIFY your account before logging in.",
        },
        "VIB8bKSD-ZS3RCCHD"
      );

      alert("Account created! Please verify your email before login.");

      setName("");
      setEmail("");
      setPassword("");
      setConfirm("");
      setRole("student");
    } catch (err) {
      alert(err.message);
    }

    setLoading(false);
  }

  /* ---------- INLINE STYLES ---------- */
  const page = {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6f8",
    padding: "20px",
  };

  const card = {
    width: "100%",
    maxWidth: "420px",
    background: "#ffffff",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  };

  const title = {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "20px",
    fontWeight: "600",
    color: "#333",
  };

  const input = {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
  };

  const select = {
    ...input,
    cursor: "pointer",
  };

  const button = {
    width: "100%",
    padding: "12px",
    borderRadius: "6px",
    border: "none",
    background: "#2563eb",
    color: "#fff",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "10px",
    opacity: loading ? 0.7 : 1,
  };

  const hint = {
    fontSize: "12px",
    color: "#666",
    marginBottom: "10px",
    textAlign: "center",
  };

  return (
    <section style={page}>
      <div style={card}>
        <div style={title}>Create Account</div>

        <form onSubmit={createAccount}>
          <input
            style={input}
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            style={input}
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            style={input}
            type="password"
            placeholder="Password (min 8 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            style={input}
            type="password"
            placeholder="Confirm Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />

          <select
            style={select}
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="student">Student</option>
            <option value="staff">Teacher</option>
            <option value="parent">Parent</option>
          </select>

          <div style={hint}>
            A verification email will be sent after account creation.
          </div>

          <button type="submit" style={button} disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>
      </div>
    </section>
  );
}