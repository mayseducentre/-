import { useState, useEffect } from "react";
import {
  collection,
  doc,
  updateDoc,
  deleteDoc,
  setDoc,
  onSnapshot,
  getDoc,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "../firebase";
import emailjs from "emailjs-com";

export default function AdminDashboard() {
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "student",
    password: "",
    status: "active",
  });

  /* ---------- AUTH CHECK (LIKE SIGNLOG) ---------- */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setError("Not logged in.");
        setLoading(false);
        return;
      }

      try {
        const snap = await getDoc(doc(db, "users", user.uid));

        if (!snap.exists()) {
          throw new Error("Profile not found.");
        }

        const adminData = snap.data();

        if (adminData.role !== "admin") {
          throw new Error("Access denied. Not an admin.");
        }

        setCurrentAdmin(adminData);
      } catch (err) {
        setError(err.message);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  /* ---------- FETCH USERS AFTER ADMIN VERIFIED ---------- */
  useEffect(() => {
    if (!currentAdmin) return;

    const unsubscribe = onSnapshot(
      collection(db, "users"),
      (snapshot) => {
        const list = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));
        setUsers(list);
      },
      (err) => {
        setFeedback("Failed to fetch users.");
      }
    );

    return () => unsubscribe();
  }, [currentAdmin]);

  /* ---------- GENERATE UNIQUE ID ---------- */
  const generateId = (prefix) =>
    `${prefix}-${Math.floor(100000 + Math.random() * 900000)}`;

  /* ---------- SAVE USER ---------- */
  async function saveUser(e) {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingUser) {
        await updateDoc(doc(db, "users", editingUser.id), {
          name: formData.name,
          email: formData.email,
          role: formData.role,
          status: formData.status,
        });

        setFeedback("User updated successfully.");
      } else {
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
        status: "active",
      });
    } catch (err) {
      setFeedback(err.message);
    }

    setLoading(false);
  }

  /* ---------- DELETE USER ---------- */
  async function removeUser(u) {
    if (!window.confirm(`Delete ${u.name}?`)) return;
    await deleteDoc(doc(db, "users", u.id));
  }

  /* ---------- LOADING & ERROR ---------- */
  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  /* ---------- UI ---------- */
  return (
    <div style={{ padding: 20 }}>
      <h2>Admin Dashboard</h2>
      <p>Welcome {currentAdmin?.name}</p>

      <p>Total Users: {users.length}</p>

      <button onClick={() => setModalOpen(true)}>Add User</button>

      {feedback && <p>{feedback}</p>}

      {users.map((u) => (
        <div key={u.id} style={{ border: "1px solid #ccc", padding: 10 }}>
          <strong>{u.name}</strong>
          <p>{u.email}</p>
          <p>Role: {u.role}</p>

          <button
            onClick={() => {
              setEditingUser(u);
              setFormData({ ...u, password: "" });
              setModalOpen(true);
            }}
          >
            Edit
          </button>

          <button
            style={{ background: "red", color: "#fff" }}
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
            placeholder="Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />

          <input
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          {!editingUser && (
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          )}

          <select
            value={formData.role}
            onChange={(e) =>
              setFormData({ ...formData, role: e.target.value })
            }
          >
            <option value="student">Student</option>
            <option value="staff">Teacher</option>
            <option value="parent">Parent</option>
          </select>

          <button type="submit">Save</button>
        </form>
      )}
    </div>
  );
}