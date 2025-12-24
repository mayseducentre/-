import React, { useEffect, useState } from "react";

import StudentPortal from "../portal/student_portal";
import ParentPortal from "../portal/parent_portal";
import TeachersPortal from "../portal/teachers_portal";

const path = process.env.REACT_APP_ACCOUNT_API;

export default function SignLog() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [portal, setPortal] = useState(null);
  const [users, setUsers] = useState([]);

  /* =======================
     LOAD SAVED LOGIN
  ======================= */
  useEffect(() => {
    const id = localStorage.getItem("portalid");
    const key = localStorage.getItem("portalkey");
    const chk = localStorage.getItem("portalcheck") === "true";
    if (id && key) {
      setUserId(id);
      setPassword(key);
      setRememberMe(chk);
    }
  }, []);

  /* =======================
     LOAD USERS
  ======================= */
  useEffect(() => {
    async function load() {
      const cols = ["studentaccount", "staffaccount", "parentaccount"];
      let all = [];

      for (let col of cols) {
        const res = await fetch(`${path}/${col}`);
        const data = await res.json();
        if (data.documents) {
          data.documents.forEach(doc => {
            const f = doc.fields;
            all.push({
              id: f.id.stringValue,
              passcode: f.passcode.stringValue,
              role: f.role.stringValue,
              status: f.status.stringValue,
            });
          });
        }
      }
      setUsers(all);
    }
    load();
  }, []);

  /* =======================
     LOGIN
  ======================= */
  function handleLogin(e) {
    e.preventDefault();

    if (rememberMe) {
      localStorage.setItem("portalid", userId);
      localStorage.setItem("portalkey", password);
      localStorage.setItem("portalcheck", rememberMe);
    }

    const user = users.find(
      u => u.id === userId && u.passcode === password && u.status === "enrolled"
    );

    if (!user) {
      setError("Invalid User ID or Password");
      return;
    }

    if (user.role === "student") setPortal(<StudentPortal user={user} />);
    if (user.role === "staff") setPortal(<TeachersPortal user={user} />);
    if (user.role === "parent") setPortal(<ParentPortal user={user} />);
  }

  if (portal) return portal;

  return (
    <section className="containerS">
      <form onSubmit={handleLogin}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <input value={userId} onChange={e => setUserId(e.target.value)} placeholder="User ID" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
        <label>
          <input type="checkbox" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} />
          Remember me
        </label>
        <button type="submit">Login</button>
      </form>
    </section>
  );
}