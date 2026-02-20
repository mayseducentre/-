import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
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
    contact: "",
    subject: "",
    linkedStudentId: "",
    status: "active",
  });

  const [feedback, setFeedback] = useState("");

  /* ---------- VERIFY PASSCODE ---------- */
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

  /* ---------- GENERATE UNIQUE ID ---------- */
  const generateId = (prefix) => {
    return `${prefix}-${Math.floor(100000 + Math.random() * 900000)}`;
  };

  /* ---------- SAVE USER ---------- */
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
        /* ---------- UPDATE USER ---------- */
        await updateDoc(doc(db, "users", editingUser.id), {
          name: formData.name,
          email: formData.email,
          role: formData.role,
          contact: formData.contact || null,
          subject: formData.role === "staff" ? formData.subject : null,
          linkedStudentId:
            formData.role === "parent" ? formData.linkedStudentId : null,
          status: formData.status,
        });

        setFeedback("User updated successfully.");
      } else {
        /* ---------- CREATE USER ---------- */
        const cred = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );

        await sendEmailVerification(cred.user);

        let uniqueId = "";
        if (formData.role === "student") uniqueId = generateId("Stu");
        if (formData.role === "staff") uniqueId = generateId("Tch");
        if (formData.role === "parent") uniqueId = generateId("Par");

        await setDoc(doc(db, "users", cred.user.uid), {
          uid: cred.user.uid,
          uniqueId,
          name: formData.name,
          email: formData.email,
          role: formData.role,
          contact: formData.contact || null,
          subject: formData.role === "staff" ? formData.subject : null,
          linkedStudentId:
            formData.role === "parent" ? formData.linkedStudentId : null,
          country: "Ghana",
          status: "active",
          createdAt: new Date(),
        });

        await emailjs.send(
          "service_4dt6s3i",
          "template_wwdrjbl",
          {
            to_name: formData.name,
            user_email: formData.email,
            mays_msg:
              `Your account has been created successfully.\n\n` +
              `Please verify your email before logging in.`,
          },
          "VIB8bKSD-ZS3RCCHD"
        );

        setFeedback("Account created successfully.");
      }

      setModalOpen(false);
      setEditingUser(null);
      setFormData({
        name: "",
        email: "",
        role: "student",
        password: "",
        contact: "",
        subject: "",
        linkedStudentId: "",
        status: "active",
      });

      fetchUsers();
    } catch (err) {
      setFeedback(err.message);
    }

    setLoading(false);
  }

  /* ---------- DELETE USER ---------- */
  async function removeUser(u) {
    if (!window.confirm(`Delete user ${u.name}?`)) return;
    await deleteDoc(doc(db, "users", u.id));
    fetchUsers();
  }

  /* ---------- OPEN EDIT MODAL ---------- */
  function openEditModal(u) {
    setEditingUser(u);
    setFormData({
      name: u.name || "",
      email: u.email || "",
      role: u.role || "student",
      password: "",
      contact: u.contact || "",
      subject: u.subject || "",
      linkedStudentId: u.linkedStudentId || "",
      status: u.status || "active",
    });
    setModalOpen(true);
  }

  /* ---------- FILTER USERS ---------- */
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = roleFilter === "all" || u.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  /* ---------- STYLES ---------- */
  const page = {
    minHeight: "100vh",
    padding: "20px",
    background: "#f4f6f8",
    fontFamily: "system-ui",
  };

  const card = {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    marginBottom: "20px",
  };

  const input = {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    marginBottom: "10px",
    width: "100%",
  };

  const button = {
    padding: "10px 15px",
    border: "none",
    borderRadius: "6px",
    background: "#2563eb",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
    marginRight: "10px",
    marginBottom: "10px",
  };

  if (!accessGranted) {
    return (
      <section style={page}>
        <form style={card} onSubmit={verifyPasscode}>
          <h3>Admin Access</h3>
          {error && <div style={{ color: "red" }}>{error}</div>}
          <input
            type="password"
            placeholder="Enter passcode"
            style={input}
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
          />
          <button style={button}>Verify</button>
        </form>
      </section>
    );
  }

  return (
    <section style={page}>
      <div style={card}>
        <h2>Admin Dashboard</h2>

        {/* Summary */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <div style={card}>Total: {users.length}</div>
          <div style={card}>
            Students: {users.filter((u) => u.role === "student").length}
          </div>
          <div style={card}>
            Teachers: {users.filter((u) => u.role === "staff").length}
          </div>
          <div style={card}>
            Parents: {users.filter((u) => u.role === "parent").length}
          </div>
        </div>

        <input
          style={input}
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          style={input}
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="all">All Roles</option>
          <option value="student">Student</option>
          <option value="staff">Teacher</option>
          <option value="parent">Parent</option>
        </select>

        <button
          style={button}
          onClick={() => {
            setEditingUser(null);
            setModalOpen(true);
          }}
        >
          Add User
        </button>

        {/* TABLE */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          filteredUsers.map((u) => (
            <div key={u.id} style={card}>
              <strong>{u.name}</strong>
              <p>{u.email}</p>
              <p>Role: {u.role}</p>
              <p>Status: {u.status}</p>
              <button style={button} onClick={() => openEditModal(u)}>
                Edit
              </button>
              <button
                style={{ ...button, background: "#ef4444" }}
                onClick={() => removeUser(u)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      {/* MODAL */}
      {modalOpen && (
        <div style={card}>
          <h3>{editingUser ? "Edit User" : "Create User"}</h3>
          <form onSubmit={saveUser}>
            <input
              style={input}
              placeholder="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />

            <input
              style={input}
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />

            {!editingUser && (
              <input
                style={input}
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            )}

            <select
              style={input}
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
            >
              <option value="student">Student</option>
              <option value="staff">Teacher</option>
              <option value="parent">Parent</option>
            </select>

            {formData.role === "staff" && (
              <>
                <input
                  style={input}
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                />
                <input
                  style={input}
                  placeholder="Contact"
                  value={formData.contact}
                  onChange={(e) =>
                    setFormData({ ...formData, contact: e.target.value })
                  }
                />
              </>
            )}

            {formData.role === "parent" && (
              <>
                <input
                  style={input}
                  placeholder="Contact"
                  value={formData.contact}
                  onChange={(e) =>
                    setFormData({ ...formData, contact: e.target.value })
                  }
                />
                <input
                  style={input}
                  placeholder="Linked Student ID"
                  value={formData.linkedStudentId}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      linkedStudentId: e.target.value,
                    })
                  }
                />
              </>
            )}

            <select
              style={input}
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>

            <button style={button} type="submit">
              {loading ? "Saving..." : "Save"}
            </button>
          </form>
        </div>
      )}
    </section>
  );
}