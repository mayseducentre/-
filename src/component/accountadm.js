import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";

/* 🔐 ADMIN PASSCODE */
const ADMIN_PASSCODE = "admin2026"; // CHANGE THIS

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null);

  const [passcode, setPasscode] = useState("");
  const [accessGranted, setAccessGranted] = useState(
    sessionStorage.getItem("adminAccess") === "true"
  );
  const [error, setError] = useState("");

  /* ---------- AUTH GATE ---------- */
  function verifyPasscode(e) {
    e.preventDefault();

    if (passcode === ADMIN_PASSCODE) {
      sessionStorage.setItem("adminAccess", "true");
      setAccessGranted(true);
      setError("");
    } else {
      setError("Invalid admin passcode");
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

  /* ---------- INLINE UI ---------- */

  const page = {
    minHeight: "100vh",
    background: "#f3f4f6",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "system-ui",
    padding: "20px",
  };

  const card = {
    background: "#fff",
    padding: "25px",
    borderRadius: "12px",
    width: "100%",
    maxWidth: "420px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
  };

  const input = {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  };

  const button = {
    width: "100%",
    padding: "12px",
    borderRadius: "6px",
    border: "none",
    background: "#2563eb",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
  };

  const errorText = {
    color: "red",
    marginBottom: "10px",
    textAlign: "center",
    fontSize: "13px",
  };

  /* ---------- PASSCODE SCREEN ---------- */
  if (!accessGranted) {
    return (
      <section style={page}>
        <form style={card} onSubmit={verifyPasscode}>
          <h3 style={{ textAlign: "center", marginBottom: "15px" }}>
            Admin Access
          </h3>

          {error && <div style={errorText}>{error}</div>}

          <input
            type="password"
            placeholder="Enter admin passcode"
            style={input}
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            required
          />

          <button style={button}>Verify</button>
        </form>
      </section>
    );
  }

  /* ---------- ADMIN DASHBOARD ---------- */

  return (
    <section style={{ padding: "30px", background: "#f3f4f6", minHeight: "100vh" }}>
      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
        }}
      >
        <h2 style={{ marginBottom: "15px" }}>Admin – User Management</h2>

        {loading ? (
          <p>Loading users...</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["Name", "Email", "Role", "Status", "Actions"].map((h) => (
                  <th
                    key={h}
                    style={{
                      textAlign: "left",
                      padding: "10px",
                      borderBottom: "1px solid #e5e7eb",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td style={{ padding: "8px" }}>{u.name}</td>
                  <td style={{ padding: "8px" }}>{u.email}</td>
                  <td style={{ padding: "8px" }}>{u.role}</td>
                  <td style={{ padding: "8px" }}>{u.status}</td>
                  <td style={{ padding: "8px" }}>
                    <button
                      style={{ marginRight: "6px" }}
                      onClick={() => setEditing(u.id)}
                    >
                      Edit
                    </button>
                    <button onClick={() => removeUser(u.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}