import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth, db } from "../firebase";
import emailjs from "emailjs-com";

/* ---------- ADMIN PASSCODE ---------- */
const ADMIN_PASSCODE = "admin2026";

export default function AdminDashboard() {
  const [passcode, setPasscode] = useState("");
  const [accessGranted, setAccessGranted] = useState(
    sessionStorage.getItem("adminAccess") === "true"
  );
  const [error, setError] = useState("");

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "student",
    password: "",
  });

  const [feedback, setFeedback] = useState("");

  /* ---------- PASSCODE VERIFY ---------- */
  function verifyPasscode(e) {
    e.preventDefault();
    if (passcode === ADMIN_PASSCODE) {
      sessionStorage.setItem("adminAccess", "true");
      setAccessGranted(true);
      setError("");
    } else {
      setError("Invalid passcode");
    }
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

  /* ---------- CREATE / EDIT USER ---------- */
  async function saveUser(e) {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.role) {
      setFeedback("All fields are required.");
      return;
    }

    if (!editingUser && formData.password.length < 8) {
      setFeedback("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      if (editingUser) {
        // Update existing user
        await updateDoc(doc(db, "users", editingUser.id), {
          name: formData.name,
          email: formData.email,
          role: formData.role,
        });
        setFeedback("User updated successfully.");
      } else {
        // Create new user
        const cred = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        await sendEmailVerification(cred.user);

        await setDoc(doc(db, "users", cred.user.uid), {
          uid: cred.user.uid,
          name: formData.name,
          email: formData.email,
          role: formData.role,
          status: "active",
          createdAt: new Date(),
        });

        // EmailJS notification
        await emailjs.send(
          "service_4dt6s3i",
          "template_wwdrjbl",
          {
            to_name: formData.name,
            user_email: formData.email,
            mays_msg:
              "Your account has been created successfully.\nPlease verify your email before logging in.",
          },
          "VIB8bKSD-ZS3RCCHD"
        );

        setFeedback("Account created! Verification email sent.");
      }

      setModalOpen(false);
      setEditingUser(null);
      setFormData({ name: "", email: "", role: "student", password: "" });
      fetchUsers();
    } catch (err) {
      setFeedback(err.message);
    }

    setLoading(false);
  }

  /* ---------- DELETE USER ---------- */
  async function removeUser(u) {
    if (!window.confirm(`Delete user ${u.name} permanently?`)) return;
    await deleteDoc(doc(db, "users", u.id));
    fetchUsers();
    setFeedback("User deleted successfully.");
  }

  /* ---------- OPEN MODAL FOR EDIT ---------- */
  function openEditModal(u) {
    setEditingUser(u);
    setFormData({ name: u.name, email: u.email, role: u.role, password: "" });
    setModalOpen(true);
  }

  /* ---------- FILTERED USERS ---------- */
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  /* ---------- INLINE STYLES ---------- */
  const page = {
    minHeight: "100vh",
    padding: "20px",
    fontFamily: "system-ui",
    background: "#f4f6f8",
  };

  const card = {
    background: "#fff",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    marginBottom: "20px",
  };

  const input = {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    marginRight: "10px",
    marginBottom: "10px",
  };

  const button = {
    padding: "10px 15px",
    borderRadius: "6px",
    border: "none",
    background: "#2563eb",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
    marginRight: "10px",
    marginBottom: "10px",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    overflowX: "auto",
    display: "block",
  };

  const thtd = {
    padding: "10px",
    borderBottom: "1px solid #e5e7eb",
    textAlign: "left",
  };

  const statusStyle = (status) => ({
    color: status === "active" ? "green" : status === "inactive" ? "red" : "orange",
    fontWeight: "600",
  });

  const modalOverlay = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  };

  const modalContent = {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    width: "100%",
    maxWidth: "400px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
  };

  const feedbackStyle = {
    color: "green",
    marginBottom: "10px",
    fontSize: "14px",
  };

  const errorStyle = {
    color: "red",
    marginBottom: "10px",
    fontSize: "14px",
  };

  /* ---------- PASSCODE SCREEN ---------- */
  if (!accessGranted) {
    return (
      <section style={{ ...page, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <form style={card} onSubmit={verifyPasscode}>
          <h3 style={{ textAlign: "center", marginBottom: "15px" }}>Admin Access</h3>
          {error && <div style={errorStyle}>{error}</div>}
          <input
            type="password"
            placeholder="Enter admin passcode"
            style={{ ...input, width: "100%" }}
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            required
          />
          <button style={{ ...button, width: "100%" }}>Verify</button>
        </form>
      </section>
    );
  }

  /* ---------- ADMIN DASHBOARD ---------- */
  return (
    <section style={page}>
      <div style={card}>
        <h2>Admin Dashboard</h2>
        {/* Summary Cards */}
        <div style={{ display: "flex", flexWrap: "wrap", marginBottom: "20px" }}>
          <div style={{ flex: 1, minWidth: "150px", ...card, marginRight: "10px" }}>
            Total Users: {users.length}
          </div>
          <div style={{ flex: 1, minWidth: "150px", ...card, marginRight: "10px" }}>
            Students: {users.filter((u) => u.role === "student").length}
          </div>
          <div style={{ flex: 1, minWidth: "150px", ...card, marginRight: "10px" }}>
            Teachers: {users.filter((u) => u.role === "staff").length}
          </div>
          <div style={{ flex: 1, minWidth: "150px", ...card }}>
            Pending Verification: {users.filter((u) => u.status !== "active").length}
          </div>
        </div>

        {/* Controls */}
        <div style={{ marginBottom: "15px" }}>
          <input
            style={input}
            placeholder="Search by name or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select style={input} value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
            <option value="all">All Roles</option>
            <option value="student">Student</option>
            <option value="staff">Teacher</option>
            <option value="parent">Parent</option>
          </select>
          <button style={button} onClick={() => {setModalOpen(true); setEditingUser(null); setFormData({name:"",email:"",role:"student",password:""});}}>Add User</button>
        </div>

        {feedback && <div style={feedbackStyle}>{feedback}</div>}

        {/* Users Table */}
        <div style={{ overflowX: "auto" }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                {["Name", "Email", "Role", "Status", "Actions"].map((h) => (
                  <th key={h} style={thtd}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} style={thtd}>Loading...</td></tr>
              ) : filteredUsers.length ? filteredUsers.map((u) => (
                <tr key={u.id}>
                  <td style={thtd}>{u.name}</td>
                  <td style={thtd}>{u.email}</td>
                  <td style={thtd}>{u.role}</td>
                  <td style={{...thtd, ...statusStyle(u.status)}}>{u.status}</td>
                  <td style={thtd}>
                    <button style={button} onClick={() => openEditModal(u)}>Edit</button>
                    <button style={{...button, background:"#ef4444"}} onClick={() => removeUser(u)}>Delete</button>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={5} style={thtd}>No users found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div style={modalOverlay} onClick={() => setModalOpen(false)}>
          <div style={modalContent} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ textAlign: "center" }}>{editingUser ? "Edit User" : "Create User"}</h3>
            <form onSubmit={saveUser}>
              <input
                style={input}
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <input
                style={input}
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              {!editingUser && (
                <input
                  style={input}
                  type="password"
                  placeholder="Password (min 8 characters)"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              )}
              <select
                style={input}
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              >
                <option value="student">Student</option>
                <option value="staff">Teacher</option>
                <option value="parent">Parent</option>
              </select>
              <button style={button} type="submit">{loading ? "Saving..." : "Save"}</button>
              <button style={{...button, background:"#6b7280"}} type="button" onClick={() => setModalOpen(false)}>Cancel</button>
            </form>
            {feedback && <div style={feedbackStyle}>{feedback}</div>}
          </div>
        </div>
      )}
    </section>
  );
}