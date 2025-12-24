import React, { useEffect, useState } from "react";
import { compare } from "bcrypt-ts";

import StudentPortal from "../portal/student_portal";
import ParentPortal from "../portal/parent_portal";
import TeachersPortal from "../portal/teachers_portal";

const path = process.env.REACT_APP_ACCOUNT_API;

export default function SignLog() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [portal, setPortal] = useState(null);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      fetch(`${path}/studentaccount`).then((r) => r.json()),
      fetch(`${path}/staffaccount`).then((r) => r.json()),
      fetch(`${path}/parentaccount`).then((r) => r.json()),
    ]).then(([s, t, p]) => {
      const mapDocs = (d, role) =>
        d?.documents?.map((doc) => ({
          id: doc.fields.id.stringValue,
          passcode: doc.fields.passcode.stringValue,
          role,
          status: doc.fields.status.stringValue,
        })) || [];

      setUsers([
        ...mapDocs(s, "student"),
        ...mapDocs(t, "staff"),
        ...mapDocs(p, "parent"),
      ]);
    });
  }, []);

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    for (const u of users) {
      if (u.id === userId && u.status === "enrolled") {
        const ok = await compare(password, u.passcode);
        if (ok) {
          if (u.role === "student") setPortal(<StudentPortal user={u} />);
          if (u.role === "staff") setPortal(<TeachersPortal user={u} />);
          if (u.role === "parent") setPortal(<ParentPortal user={u} />);
          return;
        }
      }
    }

    setError("Invalid login details");
  }

  if (portal) return portal;

  return (
    <section className="containerS">
      <form onSubmit={handleLogin}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <input value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="User ID" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </section>
  );
}