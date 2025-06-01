import React, { useEffect, useState } from "react";
import bcrypt from "bcryptjs";

import StudentPortal from "../portal/student_portal";
import ParentPortal from "../portal/parent_portal";
import TeachersPortal from "../portal/teachers_portal";
import Daycarestaffportal from "../portal/daycarestaff";

const path = process.env.REACT_APP_ACCOUNT_API;

export default function SignLog() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [portal, setPortal] = useState(null); // student | staff | parent | daycare

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    // Load local storage credentials
    const savedId = localStorage.getItem("portalid");
    const savedKey = localStorage.getItem("portalkey");
    const savedCheck = localStorage.getItem("portalcheck") === "true";

    if (savedId && savedKey) {
      setUserId(savedId);
      setPassword(savedKey);
      setRememberMe(savedCheck);
    }
  }, []);

  useEffect(() => {
    // Fetch all users
    async function fetchAccounts() {
      try {
        const [students, staff, parents] = await Promise.all([
          fetch(`${path}/studentaccount`).then((res) => res.json()),
          fetch(`${path}/staffaccount`).then((res) => res.json()),
          fetch(`${path}/parentaccount`).then((res) => res.json()),
        ]);
        setUserData([...students, ...staff, ...parents]);
      } catch (err) {
        alert("Network error. Try again.");
        console.error(err);
      }
    }
    fetchAccounts();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoginError("");

    if (rememberMe) {
      localStorage.setItem("portalid", userId);
      localStorage.setItem("portalkey", password);
      localStorage.setItem("portalcheck", rememberMe.toString());
    } else {
      localStorage.removeItem("portalid");
      localStorage.removeItem("portalkey");
      localStorage.removeItem("portalcheck");
    }

    let success = false;

    for (const user of userData) {
      if (
        user.id === userId &&
        bcrypt.compareSync(password, user.passcode) &&
        user.status === "enrolled"
      ) {
        const dateSeen = new Date().toLocaleString();

        if (user.role === "student") {
          await updateLastSeen("studentaccount", user.id, dateSeen);
          setPortal({ type: "student", user });
        } else if (user.role === "staff" && user.role !== "daycare") {
          setPortal({ type: "staff", user });
        } else if (user.role === "daycare") {
          setPortal({ type: "daycare", user });
        } else if (user.role === "parent") {
          setPortal({ type: "parent", user });
        }

        success = true;
        break;
      }
    }

    if (!success) {
      setLoginError("Invalid user ID or password");
    }

    setLoading(false);
  };

  const updateLastSeen = async (type, id, datetime) => {
    try {
      await fetch(`${path}/${type}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lastseen: datetime }),
      });
    } catch (err) {
      console.error("Failed to update last seen", err);
    }
  };

  if (portal) {
    const { type, user } = portal;
    if (type === "student") return <StudentPortal user={user} />;
    if (type === "staff") return <TeachersPortal user={user} />;
    if (type === "daycare") return <Daycarestaffportal user={user} />;
    if (type === "parent") return <ParentPortal user={user} />;
  }

  return (
    <section className="containerS" id="portalogin">
      <div className="formpage login" id="login">
        <a
          onClick={() => window.history.back()}
          style={{ fontSize: "30px", cursor: "pointer" }}
        >
          &times;
        </a>
        <div className="form-content">
          <header>Login</header>
          <form className="form" onSubmit={handleLogin}>
            {loginError && (
              <input
                style={{ color: "red", border: "none", width: "100%" }}
                readOnly
                value={loginError}
              />
            )}
            <div className="field input-field">
              <input
                type="text"
                placeholder="User_Id"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
              />
            </div>
            <div className="field input-field">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <a onClick={() => (window.location.href = "#/fgps")}>
                Forgot password
              </a>
            </div>
            <br />
            <div className="form-link">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label>Remember me</label>
            </div>
            <div className="form-link">
              <p>
                Don't have an account? <a href="#/account">Create one</a>
              </p>
            </div>
            <div className="field button-field">
              <button type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
