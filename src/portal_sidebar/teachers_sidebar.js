import React from "react";

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

  // Inline styles
  const styles = {
    sidebar: {
      width: "250px",
      position: "fixed",
      top: 0,
      left: 0,
      height: "100%",
      backgroundColor: "#1f2a38",
      color: "#fff",
      paddingTop: "20px",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      overflowY: "auto",
      boxShadow: "2px 0 12px rgba(0,0,0,0.1)",
      transition: "all 0.3s ease",
      zIndex: 100,
    },
    profile: {
      textAlign: "center",
      marginBottom: "30px",
      padding: "0 10px",
    },
    profileImg: {
      width: "80px",
      height: "80px",
      borderRadius: "50%",
      objectFit: "cover",
      border: "2px solid #007bff",
    },
    profileName: { marginTop: "10px", fontSize: "18px", fontWeight: "600" },
    profileSubject: { fontSize: "14px", color: "#a0b0c0" },
    menu: { listStyle: "none", padding: "0" },
    menuItem: {
      padding: "12px 20px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      transition: "background 0.2s, color 0.2s",
    },
    menuItemHover: {
      backgroundColor: "#007bff",
      color: "#fff",
      borderRadius: "8px",
    },
    icon: { marginRight: "12px", width: "20px", textAlign: "center" },
  };

  return (
    <aside style={styles.sidebar}>
      <div style={styles.profile}>
        <img src={user?.thumbnailUrl || "/default.png"} alt="profile" style={styles.profileImg} />
        <h3 style={styles.profileName}>{user?.name || "Teacher"}</h3>
        <p style={styles.profileSubject}>{user?.subject || "Subject"}</p>
      </div>

      <ul style={styles.menu}>
        {menuItems.map((item) => (
          <li
            key={item.tab}
            style={styles.menuItem}
            onClick={() => setActiveTab(item.tab)}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#007bff")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <i className={item.icon} style={styles.icon}></i>
            {item.label}
          </li>
        ))}
        <li
          style={{ ...styles.menuItem, marginTop: "20px", color: "#ff4d4f" }}
          onClick={() => window.location.reload()}
        >
          <i className="fa fa-sign-out" style={styles.icon}></i>
          Sign Out
        </li>
      </ul>
    </aside>
  );
}