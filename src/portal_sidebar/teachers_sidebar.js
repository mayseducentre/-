import React, { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";

export default function Teachersidebar({ user, setActiveTab, activeTab }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const auth = getAuth();

  useEffect(() => {
    const resize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const menuItems = [
    { label: "Dashboard", tab: "dashboard", icon: "🏠" },
    { label: "Assignments", tab: "assignments", icon: "📝" },
    { label: "Lessons", tab: "lessons", icon: "📘" },
    { label: "Gradebook", tab: "gradebook", icon: "📊" },
    { label: "Assessment", tab: "assessment", icon: "🧠" },
    { label: "Register", tab: "register", icon: "📋" },
    { label: "Announcements", tab: "announcements", icon: "📢" },
    { label: "Settings", tab: "settings", icon: "⚙️" },
  ];

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
          <strong>{user?.name || "Teacher"}</strong>
          <small>{user?.subject || "Subject"}</small>
        </div>

        <ul style={styles.menu}>
          {menuItems.map((item) => (
            <li
              key={item.tab}
              style={{
                ...styles.menuItem,
                background:
                  activeTab === item.tab
                    ? "rgba(255,255,255,0.18)"
                    : "transparent",
              }}
              onClick={() => setActiveTab(item.tab)}
            >
              <span style={styles.icon}>{item.icon}</span>
              {item.label}
            </li>
          ))}

          <li style={styles.logout} onClick={() => signOut(auth)}>
            🚪 Sign Out
          </li>
        </ul>
      </aside>
    );
  }

  /* ================= MOBILE BOTTOM NAV (SCROLLABLE) ================= */
  return (
    <nav style={styles.bottomNav}>
      <div style={styles.scrollRow}>
        {menuItems.map((item) => (
          <div
            key={item.tab}
            style={{
              ...styles.navItem,
              opacity: activeTab === item.tab ? 1 : 0.65,
              borderBottom:
                activeTab === item.tab ? "3px solid #fff" : "3px solid transparent",
            }}
            onClick={() => setActiveTab(item.tab)}
          >
            <div style={styles.navIcon}>{item.icon}</div>
            <small>{item.label}</small>
          </div>
        ))}
      </div>
    </nav>
  );
}

/* ================= STYLES ================= */
const styles = {
  sidebar: {
    width: 260,
    height: "100vh",
    background: "white",
    color: "black",
    padding: 20,
    position: "fixed",
    left: 0,
    top: 0,
    display: "flex",
    flexDirection: "column",
    zIndex: 1000,
  },
  profile: {
    textAlign: "center",
    marginBottom: 25,
  },
  avatar: {
    width: 75,
    height: 75,
    borderRadius: "50%",
    marginBottom: 8,
  },
  menu: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    flex: 1,
  },
  menuItem: {
    padding: "12px 14px",
    borderRadius: 10,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 6,
  },
  icon: {
    fontSize: 18,
  },
  logout: {
    marginTop: "auto",
    padding: "12px",
    color: "#ffdddd",
    cursor: "pointer",
  },

  /* MOBILE */
  bottomNav: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    height: 78,
    background: "white",
    zIndex: 1000,
    overflow: "hidden",
  },
  scrollRow: {
    display: "flex",
    overflowX: "auto",
    height: "100%",
    alignItems: "center",
    padding: "0 8px env(safe-area-inset-bottom)",
    gap: 10,
    scrollbarWidth: "none", // Firefox
  },
  navItem: {
    minWidth: 72,
    flexShrink: 0,
    textAlign: "center",
    cursor: "pointer",
    color: "#fff",
    paddingBottom: 6,
  },
  navIcon: {
    fontSize: 20,
  },
};