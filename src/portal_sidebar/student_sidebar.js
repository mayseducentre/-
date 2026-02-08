import React, { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";

export default function Studentsidebar({ user, setActiveTab, activeTab }) {
  const auth = getAuth();
  const [isMobile, setIsMobile] = useState(false);

  // Handle screen size safely
  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth <= 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // SIMPLE & CHILD-FRIENDLY MENU
  const menuItems = [
    { label: "Home", tab: "dashboard", icon: "🏠" },
    { label: "Learn", tab: "mecai", icon: "📘" },
    { label: "My Settings", tab: "settings", icon: "⚙️" },
  ];

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      window.location.reload();
    } catch (err) {
      alert("Unable to sign out. Please try again.");
    }
  };

  /* ================= DESKTOP SIDEBAR ================= */
  if (!isMobile) {
    return (
      <aside style={styles.sidebar}>
        <div style={styles.profile}>
          <img
            src={user?.photoURL || "/default.png"}
            alt="Student profile"
            style={styles.avatar}
          />
          <strong>{user?.name || "Student"}</strong>
          <small style={{ opacity: 0.7 }}>Welcome 👋</small>
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

          <li style={styles.logout} onClick={handleSignOut}>
            🚪 Log Out
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
              opacity: activeTab === item.tab ? 1 : 0.6,
              borderTop:
                activeTab === item.tab
                  ? "4px solid #4caf50"
                  : "4px solid transparent",
            }}
            onClick={() => setActiveTab(item.tab)}
          >
            <div style={styles.navIcon}>{item.icon}</div>
            <small>{item.label}</small>
          </div>
        ))}

        <div
          style={{ ...styles.navItem, color: "#e53935" }}
          onClick={handleSignOut}
        >
          <div style={styles.navIcon}>🚪</div>
          <small>Log Out</small>
        </div>
      </div>
    </nav>
  );
}

/* ================= STYLES ================= */
const styles = {
  sidebar: {
    width: 250,
    height: "100vh",
    background: "#2e7d32",
    color: "white",
    padding: 18,
    position: "fixed",
    left: 0,
    top: 0,
    display: "flex",
    flexDirection: "column",
  },
  profile: {
    textAlign: "center",
    marginBottom: 22,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: "50%",
    marginBottom: 6,
    border: "3px solid #a5d6a7",
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
    fontSize: 15,
  },
  icon: {
    fontSize: 18,
  },
  logout: {
    marginTop: "auto",
    padding: "12px",
    color: "#ffcdd2",
    cursor: "pointer",
  },

  /* MOBILE */
  bottomNav: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    height: 85,
    background: "#ffffff",
    borderTop: "1px solid #ddd",
  },
  scrollRow: {
    display: "flex",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  navItem: {
    textAlign: "center",
    cursor: "pointer",
    paddingTop: 6,
    color: "#333",
    width: 80,
  },
  navIcon: {
    fontSize: 22,
  },
};