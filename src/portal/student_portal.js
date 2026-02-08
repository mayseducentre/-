import React, { useState } from "react";
import Studentsidebar from "../portal_sidebar/student_sidebar";
import StudentSettings from "../portal_sidebar/student_settings";

import StudentDash from "../component/portal_component/studentdash";
import MecAi from "../component/mecai";
import HeadN from "../component/neutral_head";



import Footer from "../component/footer";
import ScrollToTop from "react-scroll-to-top";

export default function StudentsPortal({ user }) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const isMobile = window.innerWidth <= 768;

  return (
<>
<HeadN />

<br />
<br />
    <div style={styles.wrapper}>
      <Studentsidebar
        user={user}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main
        style={{
          ...styles.content,
          marginLeft: isMobile ? 0 : 260,
          paddingBottom: isMobile ? 80 : 20,
        }}
      >
        {activeTab === "dashboard" && <Card><StudentDash /></Card>}
        {activeTab === "mecai" && <Card><MecAi /></Card>}

 {activeTab === "settings" && <Card><StudentSettings /></Card>}        
        <Footer />
      </main>

      <ScrollToTop smooth />
    </div>
</>
  );
}

/* ================= CARD WRAPPER ================= */
const Card = ({ children }) => (
  <div style={styles.card}>{children}</div>
);

/* ================= STYLES ================= */
const styles = {
  wrapper: {
    minHeight: "100vh",
    width:"100%"
  },
  content: {
    minHeight: "100vh",
    transition: "0.3s",
margin:0,
width:"100%"
  },
  card: {
    background: "#ffffff",
    borderRadius: 14,
    padding: 15,
    marginBottom: 25,
    boxShadow: "0 8px 22px rgba(0,0,0,0.06)",
  },
};