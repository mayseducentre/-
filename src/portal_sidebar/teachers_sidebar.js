import React from "react";

export default function Teachersidebar({ user, setActiveTab, sidebarOpen, setSidebarOpen }) {
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

  const styles = {
    sidebar: {
      width: "260px",
      position: "fixed",
      top: 0,
      left: sidebarOpen ? "0" : "-270px",
      height: "100%",
      backgroundColor: "#1f2a38",
      color: "#fff",
      paddingTop: "20px",
      transition: "left 0.3s",
      zIndex: 1000,
      display: "flex",
      flexDirection: "column",
    },
    profile: { textAlign: "center", marginBottom: "30px" },
    profileImg: { width: "80px", height: "80px", borderRadius: "50%", marginBottom: "10px" },
    menu: { listStyle: "none", padding: "0", width: "100%" },
    menuItem: {
      padding: "12px 20px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      transition: "background 0.2s",
    },
    icon: { marginRight: "12px", width: "20px", textAlign: "center" },
    closeBtn: {
      display: "none",
      position: "absolute",
      top: "15px",
      right: "-45px",
      fontSize: "24px",
      cursor: "pointer",
      color: "#007bff",
      backgroundColor: "#fff",
      borderRadius: "50%",
      width: "35px",
      height: "35px",
      textAlign: "center",
      lineHeight: "35px",
    },
  };

  return (
    <aside style={styles.sidebar}>
      <div style={styles.profile}>
        <img src={user?.thumbnailUrl || "/default.png"} alt="profile" style={styles.profileImg} />
        <h3>{user?.name || "Teacher"}</h3>
        <p>{user?.subject || "Subject"}</p>
      </div>

      <ul style={styles.menu}>
        {menuItems.map((item) => (
          <li
            key={item.tab}
            style={styles.menuItem}
            onClick={() => {
              setActiveTab(item.tab);
              if (window.innerWidth <= 768) setSidebarOpen(false);
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#007bff")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <i className={item.icon} style={styles.icon}></i>
            {item.label}
          </li>
        ))}
        <li
          style={{ ...styles.menuItem, color: "#ff4d4f" }}
          onClick={() => window.location.reload()}
        >
          <i className="fa fa-sign-out" style={styles.icon}></i>
          Sign Out
        </li>
      </ul>
    </aside>
  );
}