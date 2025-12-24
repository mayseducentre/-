import { useEffect } from "react";

export default function Header(props) {
  useEffect(() => {
    const links = document.querySelectorAll("#navbar a, .bottom-nav a");
    const current = window.location.href;

    links.forEach((link) => {
      if (current.includes(link.getAttribute("href"))) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }, []);

  return (
    <>
      {/* ================= TOP NAV (DESKTOP) ================= */}
      <header id="header" style={styles.header}>
        <div style={styles.container}>
          {/* Logo */}
          <a href="#/" style={styles.logoWrap}>
            <img
              src={require(`../img/${process.env.REACT_APP_LOGO}`)}
              alt="Logo"
              style={styles.logo}
            />
          </a>

          {/* Center Text */}
          <span style={styles.navText}>{props.navtext}</span>

          {/* Navigation */}
          <nav id="navbar" style={styles.navbar}>
            <ul style={styles.navList}>
              {navLinks.map((item) => (
                <li key={item.href}>
                  <a href={item.href} style={styles.navLink}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Search Icon */}
          <i
            className="fa fa-search"
            style={styles.searchIcon}
          />
        </div>
      </header>

      {/* ================= BOTTOM NAV (MOBILE) ================= */}
      <div className="bottom-nav" style={styles.bottomNav}>
        {navLinks.map((item) => (
          <a
            key={item.href}
            href={item.href}
            style={styles.bottomLink}
          >
            <i className={`fa ${item.icon}`} style={styles.bottomIcon}></i>
            <small style={styles.bottomText}>{item.short}</small>
          </a>
        ))}
      </div>
    </>
  );
}

/* ================= NAV DATA ================= */
const navLinks = [
  { href: "#/", label: "Home", short: "Home", icon: "fa-home" },
  { href: "#/ai", label: "MEC AI", short: "AI", icon: "fa-reddit-alien" },
  { href: "#/about", label: "About", short: "About", icon: "fa-info-circle" },
  { href: "#/news_updates", label: "News & Updates", short: "News", icon: "fa-newspaper-o" },
  { href: "#/library", label: "Library", short: "Library", icon: "fa-book" },
  { href: "#/contact", label: "Contact", short: "Contact", icon: "fa-phone" },
  { href: "#/admissions", label: "Admissions", short: "Apply", icon: "fa-graduation-cap" },
  { href: "#/portal", label: "Portal", short: "Portal", icon: "fa-university" },
  { href: "#/account", label: "Account", short: "Account", icon: "fa-user-o" },
];

/* ================= STYLES ================= */
const styles = {
  header: {
    position: "fixed",
    top: 0,
    width: "100%",
    zIndex: 1200,
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
    boxShadow: "0 8px 30px rgba(0,0,0,0.35)",
  },
  container: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "10px 18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logoWrap: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
  },
  logo: {
    height: 42,
    objectFit: "contain",
    animation: "zoomIn 0.6s ease",
  },
  navText: {
    color: "#e5e7eb",
    fontSize: 14,
    fontWeight: 500,
    opacity: 0.85,
  },
  navbar: {
    display: "none",
  },
  navList: {
    listStyle: "none",
    display: "flex",
    gap: 18,
    margin: 0,
    padding: 0,
  },
  navLink: {
    color: "#e5e7eb",
    textDecoration: "none",
    fontSize: 14,
    padding: "8px 10px",
    borderRadius: 6,
    transition: "0.25s",
  },
  searchIcon: {
    color: "#ffffff",
    fontSize: 16,
    cursor: "pointer",
  },

  /* -------- MOBILE BOTTOM NAV -------- */
  bottomNav: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    height: 68,
    background: "rgba(255,255,255,0.92)",
    backdropFilter: "blur(10px)",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    borderTop: "1px solid #e5e7eb",
    zIndex: 1200,
  },
  bottomLink: {
    textAlign: "center",
    textDecoration: "none",
    color: "#475569",
    fontSize: 11,
    transition: "0.2s",
  },
  bottomIcon: {
    fontSize: 18,
    marginBottom: 2,
  },
  bottomText: {
    fontSize: 11,
  },
};

/* ================= MEDIA QUERY ================= */
if (window.innerWidth >= 768) {
  styles.navbar.display = "block";
  styles.bottomNav.display = "none";
}