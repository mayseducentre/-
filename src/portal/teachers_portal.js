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

  // Inline styles
  const styles = {
    mainContainer: {
      marginLeft: "260px", // space for sidebar
      padding: "20px 30px",
      minHeight: "100vh",
      backgroundColor: "#f4f7fb",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      transition: "all 0.3s ease",
      display: "flex",
      flexDirection: "column",
    },
    card: {
      backgroundColor: "#fff",
      borderRadius: "12px",
      padding: "25px",
      marginBottom: "25px",
      boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
      transition: "transform 0.3s, box-shadow 0.3s",
      width: "100%",
    },
    cardHover: {
      transform: "translateY(-3px)",
      boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
    },
    responsive: {
      '@media (max-width: 768px)': {
        marginLeft: "0",
        padding: "15px 10px",
      },
    },
  };

  return (
    <>
      <Teachersidebar user={user} setActiveTab={setActiveTab} />

      <div style={{ ...styles.mainContainer }}>
        <input type="hidden" value={user?.id || ""} />
        <input type="hidden" value={user?.subject || ""} />

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