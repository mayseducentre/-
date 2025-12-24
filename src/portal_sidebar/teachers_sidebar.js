import React from "react";
import { Link } from "react-router-dom";

export default function Teachersidebar({ user, setActiveTab }) {
  const menuItems = [
    { label: "Dashboard", tab: "dashboard", icon: "fa fa-grid" },
    { label: "Assignments", tab: "assignments", icon: "fa fa-diamond" },
    { label: "Lesson Note", tab: "lessons", icon: "fa fa-book" },
    { label: "Gradebook", tab: "gradebook", icon: "fa fa-file" },
    { label: "Announcements", tab: "announcements", icon: "fa fa-bullhorn" },
    { label: "Assessment", tab: "assessment", icon: "fa fa-filter" },
    { label: "Register Book", tab: "register", icon: "fa fa-file" },
    { label: "Staff Chat Room", tab: "staffchatroom", icon: "fa fa-comments" },
    { label: "Virtual Classroom", tab: "virtualclass", icon: "fa fa-laptop" },
    { label: "Calendar & Scheduling", tab: "calendar", icon: "fa fa-calendar" },
    { label: "Student Performance", tab: "studentperformance", icon: "fa fa-line-chart" },
  ];

  return (
    <aside className="sidebar" style={{ width: "250px", position: "fixed", height: "100%", background: "#222", color: "#fff", paddingTop: "20px" }}>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <img src={user?.thumbnailUrl || "/default.png"} alt="profile" style={{ width: "80px", height: "80px", borderRadius: "50%" }} />
        <h3 style={{ marginTop: "10px" }}>{user?.name || "Teacher"}</h3>
        <p>{user?.subject || "Subject"}</p>
      </div>

      <ul style={{ listStyle: "none", padding: "0" }}>
        {menuItems.map((item) => (
          <li key={item.tab} style={{ padding: "10px 20px", cursor: "pointer" }} onClick={() => setActiveTab(item.tab)}>
            <i className={item.icon} style={{ marginRight: "10px" }}></i>
            {item.label}
          </li>
        ))}
        <li style={{ padding: "10px 20px", cursor: "pointer" }} onClick={() => window.location.reload()}>
          <i className="fa fa-sign-out"></i> Sign Out
        </li>
      </ul>
    </aside>
  );
}