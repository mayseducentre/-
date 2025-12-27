import React, { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";

export default function Teachersidebar({ user, setActiveTab, activeTab }) {
  const auth = getAuth();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Track window size changes for responsive layout
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    { label: "Dashboard", tab: "dashboard", icon: "🏠" },
    { label: "Assignments", tab: "assignments", icon: "📝" },
    { label: "Lessons", tab: "lessons", icon: "📘" },
    { label: "Schm.Of.W", tab: "sow", icon: "📒" },
    { label: "MecAi", tab: "mecai", icon: "🕹" },
    { label: "Assessment", tab: "assessment", icon: "🧠" },
    { label: "Register", tab: "register", icon: "📋" },
    { label: "Announcements", tab: "announcements", icon: "📢" },
    { label: "Settings", tab: "settings", icon: "⚙️" },
  ];

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      // Optionally redirect after sign out
      window.location.href = "#/portal"; 
    } catch (err) {
      console.error("Sign out failed:", err);
      alert("Failed to sign out. Please try again.");
    }
  };

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
                    ? "rgba(255, 255, 255, 0.15)"
                    : "transparent",
              }}
              onClick={() => setActiveTab(item.tab)}
            >
              <span style={styles.icon}>{item.icon}</span>
              {item.label}
            </li>
          ))}

          <li style={styles.logout} onClick={handleSignOut}>
            🚪 Sign Out
          </li>
        </ul>
      </aside>
    );
  }

  /* ================= MOBILE BOTTOM NAV ================= */
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
                activeTab === item.tab
                  ? "3px solid #7a5018"
                  : "3px solid transparent",
            }}
            onClick={() => setActiveTab(item.tab)}
          >
            <div style={styles.navIcon}>{item.icon}</div>
            <small>{item.label}</small>
          </div>
        ))}

        <div
          style={{
            ...styles.navItem,
            color: "#ff5555",
            borderBottom: "3px solid transparent",
          }}
          onClick={handleSignOut}
        >
          <div style={styles.navIcon}>🚪</div>
          <small>Sign Out</small>
        </div>
      </div>
    </nav>
  );
}

/* ================= STYLES ================= */
const styles = {
  sidebar: {
    width: 260,
    height: "100vh",
    background: "#2C2F33",
    color: "white",
    padding: 20,
    position: "fixed",
    left: 0,
    top: 0,
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
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
    border: "2px solid #7a5018",
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
    transition: "0.2s",
  },
  icon: {
    fontSize: 18,
  },
  logout: {
    marginTop: "auto",
    padding: "12px",
    color: "#ff5555",
    cursor: "pointer",
  },

  /* MOBILE */
  bottomNav: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    height: 90,
    background: "#f4f4f4",
    zIndex: 1000,
    overflowX: "auto",
    borderTop: "1px solid #ccc",
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
    color: "#333",
    paddingBottom: 6,
    paddingTop: 6,
  },
  navIcon: {
    fontSize: 20,
  },
};