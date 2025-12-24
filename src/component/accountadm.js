import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  addDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import emailjs from "emailjs-com";

const ADMIN_PASSCODE = "admin2026"; // 🔐 change this

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null);
  const [creating, setCreating] = useState(false);

  const [passcode, setPasscode] = useState("");
  const [accessGranted, setAccessGranted] = useState(sessionStorage.getItem("adminAccess") === "true");
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "student",
    status: "active",
    password: "",
  });

  /* ---------- AUTH ---------- */
  function verifyPasscode(e) {
    e.preventDefault();
    if (passcode === ADMIN_PASSCODE) {
      sessionStorage.setItem("adminAccess", "true");
      setAccessGranted(true);
      setError("");
    } else setError("Invalid admin passcode");
  }

  /* ---------- FETCH USERS ---------- */
  async function fetchUsers() {
    setLoading(true);
    const snap = await getDocs(collection(db, "users"));
    const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    setUsers(list);
    setLoading(false);
  }

  useEffect(() => {
    if (accessGranted) fetchUsers();
  }, [accessGranted]);

  /* ---------- CRUD ---------- */
  async function saveUser(id, data) {
    await updateDoc(doc(db, "users", id), data);
    setEditing(null);
    fetchUsers();
  }

  async function removeUser(id) {
    if (!window.confirm("Delete this user permanently?")) return;
    await deleteDoc(doc(db, "users", id));
    fetchUsers();
  }

  /* ---------- CREATE USER ---------- */
  async function createUser(e) {
    e.preventDefault();
    if (!formData.password || formData.password.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }

    setLoading(true);
    try {
      // 1️⃣ Create Firebase Auth user
      const cred = await createUserWithEmailAndPassword(auth, formData.email, formData.password);

      // 2️⃣ Send email verification
      await sendEmailVerification(cred.user);

      // 3️⃣ Add user to Firestore
      await setDoc(doc(db, "users", cred.user.uid), {
        uid: cred.user.uid,
        name: formData.name,
        email: formData.email,
        role: formData.role,
        status: formData.status,
        country: "Ghana",
        createdAt: new Date(),
      });

      // 4️⃣ Send notification email using EmailJS
      await emailjs.send(
        "service_4dt6s3i",
        "template_wwdrjbl",
        {
          to_name: formData.name,
          user_email: formData.email,
          mays_msg:
            `Hello ${formData.name},\n\n` +
            "Your account has been created successfully by Admin.\n" +
            "Please check your email to verify your account before logging in.",
        },
        "VIB8bKSD-ZS3RCCHD"
      );

      alert("Account created! Verification email sent.");

      // Reset form
      setFormData({ name: "", email: "", role: "student", status: "active", password: "" });
      setCreating(false);
      fetchUsers();
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);
  }

  /* ---------- STYLES ---------- */
  const page = { minHeight: "100vh", background: "#f4f6f8", fontFamily: "system-ui", padding: "20px" };
  const card = { background: "#fff", padding: "25px", borderRadius: "12px", boxShadow: "0 10px 25px rgba(0,0,0,0.08)", marginBottom: "20px" };
  const input = { width: "100%", padding: "12px", marginBottom: "12px", borderRadius: "6px", border: "1px solid #ccc", fontSize: "14px" };
  const select = { ...input, cursor: "pointer" };
  const button = { padding: "10px 15px", margin: "5px", borderRadius: "6px", border: "none", cursor: "pointer", fontWeight: 600 };
  const primaryBtn = { ...button, background: "#2563eb", color: "#fff" };
  const successBtn = { ...button, background: "#16a34a", color: "#fff" };
  const dangerBtn = { ...button, background: "#ef4444", color: "#fff" };
  const errorText = { color: "red", marginBottom: "10px", textAlign: "center", fontSize: "13px" };

  /* ---------- PASSCODE ---------- */
  if (!accessGranted) {
    return (
      <section style={{ ...page, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <form style={card} onSubmit={verifyPasscode}>
          <h3 style={{ textAlign: "center", marginBottom: "15px" }}>Admin Access</h3>
          {error && <div style={errorText}>{error}</div>}
          <input type="password" placeholder="Enter admin passcode" style={input} value={passcode} onChange={(e) => setPasscode(e.target.value)} required />
          <button style={primaryBtn}>Verify</button>
        </form>
      </section>
    );
  }

  /* ---------- ADMIN DASHBOARD ---------- */
  return (
    <section style={page}>
      <div style={card}>
        <h2>Admin Dashboard – User Management</h2>
        <button style={successBtn} onClick={() => setCreating(!creating)}>
          {creating ? "Cancel" : "Create New User"}
        </button>

        {creating && (
          <form style={{ ...card, marginTop: "15px" }} onSubmit={createUser}>
            <input style={input} placeholder="Full Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
            <input style={input} type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
            <input style={input} type="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
            <select style={select} value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })}>
              <option value="student">Student</option>
              <option value="staff">Teacher</option>
              <option value="parent">Parent</option>
            </select>
            <select style={select} value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <button type="submit" style={primaryBtn} disabled={loading}>{loading ? "Creating..." : "Create User"}</button>
          </form>
        )}

        {loading ? (
          <p>Loading users...</p>
        ) : (
          <div style={{ overflowX: "auto", marginTop: "20px" }}>
            <table style={{ width: "100%", minWidth: "600px", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["Name", "Email", "Role", "Status", "Actions"].map((h) => (
                    <th key={h} style={{ textAlign: "left", padding: "10px", borderBottom: "1px solid #e5e7eb" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td style={{ padding: "8px" }}>{editing === u.id ? <input style={input} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} /> : u.name}</td>
                    <td style={{ padding: "8px" }}>{editing === u.id ? <input style={input} value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} /> : u.email}</td>
                    <td style={{ padding: "8px" }}>{editing === u.id ? <select style={select} value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })}><option value="student">Student</option><option value="staff">Staff</option><option value="parent">Parent</option></select> : u.role}</td>
                    <td style={{ padding: "8px" }}>{editing === u.id ? <select style={select} value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}><option value="active">Active</option><option value="inactive">Inactive</option></select> : u.status}</td>
                    <td style={{ padding: "8px" }}>
                      {editing === u.id ? (
                        <>
                          <button style={primaryBtn} onClick={() => saveUser(u.id, formData)}>Save</button>
                          <button style={dangerBtn} onClick={() => setEditing(null)}>Cancel</button>
                        </>
                      ) : (
                        <>
                          <button style={primaryBtn} onClick={() => { setEditing(u.id); setFormData(u); }}>Edit</button>
                          <button style={dangerBtn} onClick={() => removeUser(u.id)}>Delete</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}