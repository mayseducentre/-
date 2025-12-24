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
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Inline styles
  const styles = {
    mainContainer: {
      marginLeft: sidebarOpen ? "260px" : "0",
      padding: "20px",
      transition: "margin-left 0.3s",
      minHeight: "100vh",
      backgroundColor: "#f4f7fb",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    card: {
      backgroundColor: "#fff",
      borderRadius: "12px",
      padding: "25px",
      marginBottom: "25px",
      boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
      width: "100%",
    },
    hamburger: {
      display: "none",
      position: "fixed",
      top: "15px",
      left: "15px",
      fontSize: "24px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      padding: "10px 12px",
      borderRadius: "8px",
      zIndex: 1100,
      cursor: "pointer",
    },
    '@media (max-width: 768px)': {
      hamburger: { display: "block" },
      mainContainer: { marginLeft: "0", padding: "15px" },
    },
  };

  return (
    <>
      <button
        style={styles.hamburger}
        onClick={toggleSidebar}
      >
        ☰
      </button>

      <Teachersidebar
        user={user}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div style={styles.mainContainer}>
        {activeTab === "dashboard" && <div style={styles.card}><TeacherDash /></div>}
        {activeTab === "assignments" && <div style={styles.card}><AssignCreate user={user} /></div>}
        {activeTab === "assessment" && <div style={styles.card}><Assessment /></div>}
        {activeTab === "studentperformance" && <div style={styles.card}><StudentPerform /></div>}
        {activeTab === "staffchatroom" && <div style={styles.card}><StaffChatRoom /></div>}
        {activeTab === "lessons" && <div style={styles.card}><LNote /></div>}
        {activeTab === "register" && <div style={styles.card}><RegisterBook /></div>}
        {activeTab === "gradebook" && <div style={styles.card}><GradeCreate user={user} /></div>}
        {activeTab === "virtualclass" && <div style={styles.card}><Meet /></div>}
        {activeTab === "calendar" && <div style={styles.card}><ViewCalendar /></div>}
        {activeTab === "announcements" && <div style={styles.card}><AnnounceHubView /></div>}

        <Footer />
      </div>

      <ScrollToTop
        smooth
        style={{
          backgroundColor: "#007bff",
          borderRadius: "50%",
          color: "#fff",
          padding: "10px",
          fontSize: "20px",
          cursor: "pointer",
        }}
      />
    </>
  );
}