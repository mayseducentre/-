import React, { useState } from "react";
import Teachersidebar from "../portal_sidebar/teachers_sidebar";

import TeacherDash from "../component/portal_component/teacherdash";
import AssignCreate from "../component/portal_component/assignment_create";
import Assessment from "../component/portal_component/assessment";
import StudentPerform from "../component/portal_component/student_performance";
import StaffChatRoom from "../component/portal_component/staffchatroom";
import LNote from "../component/portal_component/lesson_note";
import RegisterBook from "../component/portal_component/registerbook";
import GradeCreate from "../component/portal_component/postgrades";
import Meet from "../component/portal_component/meet_online";
import ViewCalendar from "../component/portal_component/viewcalendar";
import AnnounceHubView from "../component/portal_component/viewannounce";
import Footer from "../component/footer";
import ScrollToTop from "react-scroll-to-top";

export default function TeachersPortal({ user }) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const isMobile = window.innerWidth <= 768;

  return (
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
        {activeTab === "staffchatroom" && <Card><StaffChatRoom /></Card>}
        {activeTab === "lessons" && <Card><LNote /></Card>}
        {activeTab === "register" && <Card><RegisterBook /></Card>}
        {activeTab === "gradebook" && <Card><GradeCreate user={user} /></Card>}
        {activeTab === "virtualclass" && <Card><Meet /></Card>}
        {activeTab === "calendar" && <Card><ViewCalendar /></Card>}
        {activeTab === "announcements" && <Card><AnnounceHubView /></Card>}

        <Footer />
      </main>

      <ScrollToTop smooth />
    </div>
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