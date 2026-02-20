import { useState, useEffect } from "react";
import {
  collection,
  doc,
  updateDoc,
  deleteDoc,
  setDoc,
  onSnapshot,
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

  /* ---------- REALTIME FETCH USERS ---------- */
  useEffect(() => {
    if (!accessGranted) return;

    setLoading(true);

    const unsubscribe = onSnapshot(
      collection(db, "users"),
      (snapshot) => {
        const list = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));
        setUsers(list);
        setLoading(false);
      },
      (err) => {
        console.error("Fetch error:", err);
        setFeedback("Failed to fetch users. Check Firestore rules.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [accessGranted]);

  /* ---------- GENERATE UNIQUE ID ---------- */
  const generateId = (prefix) =>
    `${prefix}-${Math.floor(100000 + Math.random() * 900000)}`;

  /* ---------- SAVE USER ---------- */
  async function saveUser(e) {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      setFeedback("Name and Email required.");
      return;
    }

    if (!editingUser && formData.password.length < 8) {
      setFeedback("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      if (editingUser) {
        /* UPDATE */
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
        /* CREATE */
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
              "Your account has been created successfully.\nPlease verify your email before logging in.",
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
    } catch (err) {
      console.error(err);
      setFeedback(err.message);
    }

    setLoading(false);
  }

  /* ---------- DELETE USER ---------- */
  async function removeUser(u) {
    if (!window.confirm(`Delete ${u.name}?`)) return;
    await deleteDoc(doc(db, "users", u.id));
  }

  /* ---------- FILTER ---------- */
  const filteredUsers = users.filter((u) => {
    const name = u.name || "";
    const email = u.email || "";

    const matchesSearch =
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole =
      roleFilter === "all" || u.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  /* ---------- BASIC STYLES ---------- */
  const input = { padding: 8, marginBottom: 10, width: "100%" };
  const button = {
    padding: 8,
    marginRight: 5,
    background: "#2563eb",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  };

  if (!accessGranted) {
    return (
      <form onSubmit={verifyPasscode}>
        <h3>Admin Access</h3>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <input
          type="password"
          value={passcode}
          onChange={(e) => setPasscode(e.target.value)}
        />
        <button style={button}>Verify</button>
      </form>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin Dashboard</h2>

      <p>Total Users: {users.length}</p>
      <p>Students: {users.filter((u) => u.role === "student").length}</p>
      <p>Teachers: {users.filter((u) => u.role === "staff").length}</p>
      <p>Parents: {users.filter((u) => u.role === "parent").length}</p>

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
        <option value="all">All</option>
        <option value="student">Student</option>
        <option value="staff">Teacher</option>
        <option value="parent">Parent</option>
      </select>

      <button style={button} onClick={() => setModalOpen(true)}>
        Add User
      </button>

      {loading && <p>Loading...</p>}
      {feedback && <p>{feedback}</p>}

      {filteredUsers.map((u) => (
        <div key={u.id} style={{ border: "1px solid #ccc", padding: 10, marginBottom: 10 }}>
          <strong>{u.name}</strong>
          <p>{u.email}</p>
          <p>Role: {u.role}</p>
          <p>Status: {u.status}</p>
          <button style={button} onClick={() => {
            setEditingUser(u);
            setFormData({ ...u, password: "" });
            setModalOpen(true);
          }}>
            Edit
          </button>
          <button
            style={{ ...button, background: "red" }}
            onClick={() => removeUser(u)}
          >
            Delete
          </button>
        </div>
      ))}

      {modalOpen && (
        <form onSubmit={saveUser} style={{ marginTop: 20 }}>
          <h3>{editingUser ? "Edit User" : "Create User"}</h3>

          <input
            style={input}
            placeholder="Name"
            value={formData.name || ""}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />

          <input
            style={input}
            placeholder="Email"
            value={formData.email || ""}
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

          <button style={button} type="submit">
            Save
          </button>
        </form>
      )}
    </div>
  );
}