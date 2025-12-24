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
  const [activeTab, setActiveTab] = useState("dashboard"); // React-style tab switching

  return (
    <>
      <Teachersidebar user={user} setActiveTab={setActiveTab} />
      <div id="main" style={{ marginLeft: "250px", padding: "20px" }}>
        <input type="hidden" value={user?.id || ""} id="teacherid" />
        <input type="hidden" value={user?.subject || ""} id="subject_owner" />

        {activeTab === "dashboard" && <TeacherDash />}
        {activeTab === "assignments" && <AssignCreate user={user} />}
        {activeTab === "assessment" && <Assessment />}
        {activeTab === "studentperformance" && <StudentPerform />}
        {activeTab === "staffchatroom" && <StaffChatRoom />}
        {activeTab === "lessons" && <LNote />}
        {activeTab === "register" && <RegisterBook />}
        {activeTab === "gradebook" && <GradeCreate user={user} />}
        {activeTab === "virtualclass" && <Meet />}
        {activeTab === "calendar" && <ViewCalendar />}
        {activeTab === "announcements" && <AnnounceHubView />}

        <Footer />
      </div>

      <ScrollToTop smooth className="scrolly" />
    </>
  );
}