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
      {/* ================= TOP NAV ================= */}
      <header id="header" style={styles.header}>
        <div style={styles.container}>
          <a href="#/" style={styles.logoWrap}>
            <img
              src={require(`../img/${process.env.REACT_APP_LOGO}`)}
              alt="Logo"
              style={styles.logo}
            />
          </a>

          <span style={styles.navText}>{props.navtext}</span>

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

          <i className="fa fa-search" style={styles.searchIcon}></i>
        </div>
      </header>

      {/* ================= BOTTOM NAV ================= */}
      <div className="bottom-nav" style={styles.bottomNav}>
        {navLinks.map((item) => (
          <a key={item.href} href={item.href} style={styles.bottomLink}>
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
  { href: "#/news_updates", label: "News", short: "News", icon: "fa-newspaper-o" },
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
    background: "linear-gradient(135deg, #7a5018, #5f3d12)",
    boxShadow: "0 6px 20px rgba(0,0,0,0.4)",
  },
  container: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "12px 18px",
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
  },
  navText: {
    color: "#f5deb3",
    fontSize: 14,
    fontWeight: 500,
    opacity: 0.9,
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
    color: "#fff",
    textDecoration: "none",
    fontSize: 14,
    padding: "8px 12px",
    borderRadius: 8,
    transition: "0.25s",
  },
  searchIcon: {
    color: "#fff",
    fontSize: 16,
    cursor: "pointer",
  },

  /* ======= MOBILE ======= */
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
    color: "#f5deb3",
    fontSize: 11,
    transition: "0.2s",
  },
  bottomIcon: {
    fontSize: 19,
    marginBottom: 2,
  },
  bottomText: {
    fontSize: 11,
  },
};

/* ======= MEDIA SWITCH ======= */
if (window.innerWidth >= 768) {
  styles.navbar.display = "block";
  styles.bottomNav.display = "none";
}