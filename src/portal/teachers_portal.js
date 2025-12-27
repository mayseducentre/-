import React, { useState } from "react";
import Teachersidebar from "../portal_sidebar/teachers_sidebar";

import TeacherDash from "../component/portal_component/teacherdash";
import AssignCreate from "../component/portal_component/assignment_create";
import Assessment from "../component/portal_component/assessment";
import StudentPerform from "../component/portal_component/student_performance";
import LNote from "../component/portal_component/lesson_note";
import RegisterBook from "../component/portal_component/registerbook";
import MecAi from "../component/mecai";
import SchemeOfWorkBuilder from "../component/portal_component/scheme of work";
import HeadN from "../component/neutral_head";
import TeacherSettings from "../component/portal_component/teacher_settings";



import Footer from "../component/footer";
import ScrollToTop from "react-scroll-to-top";

export default function TeachersPortal({ user }) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const isMobile = window.innerWidth <= 768;

  return (
<>
<HeadN />

<br />
<br />
    <div style={styles.wrapper}>
      <Teachersidebar
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
        {activeTab === "dashboard" && <Card><TeacherDash /></Card>}
        {activeTab === "assignments" && <Card><AssignCreate user={user} /></Card>}
        {activeTab === "assessment" && <Card><Assessment /></Card>}
        {activeTab === "studentperformance" && <Card><StudentPerform /></Card>}
        {activeTab === "lessons" && <Card><LNote /></Card>}
        {activeTab === "register" && <Card><RegisterBook /></Card>}
        {activeTab === "mecai" && <Card><MecAi /></Card>}
{activeTab === "sow" && <Card><SchemeOfWorkBuilder /></Card>}
        
        {activeTab === "settings" && <Card><TeacherSettings user={user} /></Card>} 
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