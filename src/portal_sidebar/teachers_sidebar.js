import React from "react";

export default function Teachersidebar({
  user,
  setActiveTab,
  activeTab,
}) {
  const menuItems = [
    { label: "Dashboard", tab: "dashboard", icon: "🏠" },
    { label: "Assignments", tab: "assignments", icon: "📝" },
    { label: "Lesson Note", tab: "lessons", icon: "📘" },
    { label: "Gradebook", tab: "gradebook", icon: "📊" },
    { label: "Assessment", tab: "assessment", icon: "🧠" },
    { label: "Register Book", tab: "register", icon: "📋" },
    { label: "Staff Chat", tab: "staffchatroom", icon: "💬" },
    { label: "Virtual Class", tab: "virtualclass", icon: "💻" },
    { label: "Calendar", tab: "calendar", icon: "📅" },
    { label: "Performance", tab: "studentperformance", icon: "📈" },
    { label: "Announcements", tab: "announcements", icon: "📢" },
  ];

  const isMobile = window.innerWidth <= 768;

  /* ================= DESKTOP SIDEBAR ================= */
  if (!isMobile) {
    return (
      <aside style={styles.sidebar}>
        <div style={styles.profile}>
          <img
            src={user?.thumbnailUrl || "/default.png"}
            alt="profile"
            style={styles.avatar}
          />
          <h3 style={{ margin: 0 }}>{user?.name || "Teacher"}</h3>
          <small style={{ opacity: 0.8 }}>
            {user?.subject || "Subject"}
          </small>
        </div>

        <ul style={styles.menu}>
          {menuItems.map((item) => (
            <li
              key={item.tab}
              style={{
                ...styles.menuItem,
                background:
                  activeTab === item.tab ? "#2563eb" : "transparent",
              }}
              onClick={() => setActiveTab(item.tab)}
            >
              <span style={{ marginRight: 10 }}>{item.icon}</span>
              {item.label}
            </li>
          ))}

          <li
            style={{ ...styles.menuItem, color: "#ff4d4f" }}
            onClick={() => window.location.reload()}
          >
            🚪 Sign Out
          </li>
        </ul>
      </aside>
    );
  }

  /* ================= MOBILE BOTTOM NAV ================= */
  return (
    <nav style={styles.bottomNav}>
      {menuItems.slice(0, 5).map((item) => (
        <div
          key={item.tab}
          style={{
            ...styles.navItem,
            color: activeTab === item.tab ? "#2563eb" : "#6b7280",
          }}
          onClick={() => setActiveTab(item.tab)}
        >
          <div style={{ fontSize: 18 }}>{item.icon}</div>
          <small>{item.label}</small>
        </div>
      ))}
    </nav>
  );
}

/* ================= STYLES ================= */
const styles = {
  sidebar: {
    width: 260,
    height: "100vh",
    background: "#1f2937",
    color: "#ffffff",
    padding: 20,
    position: "fixed",
    top: 0,
    left: 0,
    display: "flex",
    flexDirection: "column",
    zIndex: 1000,
  },
  profile: {
    textAlign: "center",
    marginBottom: 30,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: "50%",
    marginBottom: 10,
    objectFit: "cover",
  },
  menu: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    flex: 1,
    overflowY: "auto",
  },
  menuItem: {
    padding: "12px 15px",
    borderRadius: 8,
    cursor: "pointer",
    marginBottom: 6,
    display: "flex",
    alignItems: "center",
    transition: "background 0.2s",
  },
  bottomNav: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    height: 64,
    background: "#ffffff",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    borderTop: "1px solid #e5e7eb",
    zIndex: 1000,
  },
  navItem: {
    textAlign: "center",
    fontSize: 12,
    cursor: "pointer",
  },
};