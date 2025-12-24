import { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, deleteDoc, doc, addDoc } from "firebase/firestore";
import { db } from "../firebase";

const ADMIN_PASSCODE = "admin2026"; // 🔐 CHANGE THIS

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null);
  const [creating, setCreating] = useState(false);

  const [passcode, setPasscode] = useState("");
  const [accessGranted, setAccessGranted] = useState(sessionStorage.getItem("adminAccess") === "true");
  const [error, setError] = useState("");

  // Form state
  const [formData, setFormData] = useState({ name: "", email: "", role: "student", status: "active" });

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

  async function createUser(data) {
    await addDoc(collection(db, "users"), data);
    setCreating(false);
    setFormData({ name: "", email: "", role: "student", status: "active" });
    fetchUsers();
  }

  /* ---------- STYLES ---------- */
  const page = { minHeight: "100vh", background: "#f3f4f6", fontFamily: "system-ui", padding: "20px" };
  const card = { background: "#fff", padding: "25px", borderRadius: "12px", boxShadow: "0 10px 25px rgba(0,0,0,0.08)", marginBottom: "20px" };
  const input = { width: "100%", padding: "10px", marginBottom: "12px", borderRadius: "6px", border: "1px solid #ccc" };
  const button = { padding: "10px 15px", margin: "5px", borderRadius: "6px", border: "none", cursor: "pointer", fontWeight: 600 };
  const primaryBtn = { ...button, background: "#2563eb", color: "#fff" };
  const dangerBtn = { ...button, background: "#ef4444", color: "#fff" };
  const successBtn = { ...button, background: "#16a34a", color: "#fff" };
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
        <h2>Admin – User Management</h2>

        <button style={successBtn} onClick={() => setCreating(!creating)}>
          {creating ? "Cancel" : "Create New User"}
        </button>

        {creating && (
          <div style={{ ...card, marginTop: "15px" }}>
            <input style={input} placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            <input style={input} placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            <select style={input} value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })}>
              <option value="student">Student</option>
              <option value="staff">Staff</option>
              <option value="parent">Parent</option>
            </select>
            <select style={input} value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <button style={primaryBtn} onClick={() => createUser(formData)}>Create User</button>
          </div>
        )}

        {loading ? (
          <p>Loading users...</p>
        ) : (
          <div style={{ overflowX: "auto", marginTop: "20px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "600px" }}>
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
                    <td style={{ padding: "8px" }}>
                      {editing === u.id ? <input style={input} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} /> : u.name}
                    </td>
                    <td style={{ padding: "8px" }}>
                      {editing === u.id ? <input style={input} value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} /> : u.email}
                    </td>
                    <td style={{ padding: "8px" }}>
                      {editing === u.id ? (
                        <select style={input} value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })}>
                          <option value="student">Student</option>
                          <option value="staff">Staff</option>
                          <option value="parent">Parent</option>
                        </select>
                      ) : u.role}
                    </td>
                    <td style={{ padding: "8px" }}>
                      {editing === u.id ? (
                        <select style={input} value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      ) : u.status}
                    </td>
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