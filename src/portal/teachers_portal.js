import React, { useEffect } from "react";
import ScrollToTop from "react-scroll-to-top";

import Footer from "../component/footer";
import Headline from "../component/headlines";
import Assessment from "../component/portal_component/assessment";
import AssignCreate from "../component/portal_component/assignment_create";
import MeetST from "../component/portal_component/meet_students";
import MeetT from "../component/portal_component/meet_teachers";
import StaffChatRoom from "../component/portal_component/staffchatroom";
import StudentPerform from "../component/portal_component/student_performance";
import TeacherDash from "../component/portal_component/teacherdash";
import Teachersidebar from "../portal_sidebar/teachers_sidebar";
import MeetP from "../component/portal_component/meet_parent";
import LNote from "../component/portal_component/lesson_note";
import Meet from "../component/portal_component/meet_online";
import RegisterBook from "../component/portal_component/registerbook";
import ViewCalendar from "../component/portal_component/viewcalendar";
import AnnounceHubView from "../component/portal_component/viewannounce";
import GradeCreate from "../component/portal_component/postgrades";

function TeachersPortal() {
  useEffect(() => {
      fetch(`${process.env.REACT_APP_ACCOUNT_API}/studentaccount`)
            .then((res) => res.json())
                  .then((data) => {
                          const studentTotal = document.getElementById("stu_total");
                                  if (studentTotal) studentTotal.innerHTML = data.length;
                                        })
                                              .catch((err) => console.log(err));

                                                  fetch(`${process.env.REACT_APP_API_URL}/courses`)
                                                        .then((res) => res.json())
                                                              .then((data) => {
                                                                      const subjTotal = document.getElementById("subj_total");
                                                                              if (subjTotal) subjTotal.innerHTML = data.length;
                                                                                    })
                                                                                          .catch((err) => console.log(err));
                                                                                            }, []);

                                                                                              return (
                                                                                                  <>
                                                                                                        <div id="main">
                                                                                                                <input type="text" id="teacherid" style={{ display: "none" }} readOnly />
                                                                                                                        <input type="text" id="subject_owner" style={{ display: "none" }} readOnly />

                                                                                                                                <Teachersidebar />
                                                                                                                                        <Headline />
                                                                                                                                                <br />
                                                                                                                                                        <br />
                                                                                                                                                                <br />

                                                                                                                                                                        <div id="staffdash">
                                                                                                                                                                                  <TeacherDash />
                                                                                                                                                                                            <MeetT />
                                                                                                                                                                                                      <MeetST />
                                                                                                                                                                                                                <MeetP />
                                                                                                                                                                                                                        </div>

                                                                                                                                                                                                                                <div id="assigncreate" style={{ display: "none" }}>
                                                                                                                                                                                                                                          <AssignCreate />
                                                                                                                                                                                                                                                  </div>

                                                                                                                                                                                                                                                          <div id="assessment" style={{ display: "none" }}>
                                                                                                                                                                                                                                                                    <Assessment />
                                                                                                                                                                                                                                                                            </div>

                                                                                                                                                                                                                                                                                    <div id="studentperformance" style={{ display: "none" }}>
                                                                                                                                                                                                                                                                                              <StudentPerform />
                                                                                                                                                                                                                                                                                                      </div>

                                                                                                                                                                                                                                                                                                              <div id="staffchatroom" style={{ display: "none" }}>
                                                                                                                                                                                                                                                                                                                        <StaffChatRoom />
                                                                                                                                                                                                                                                                                                                                </div>

                                                                                                                                                                                                                                                                                                                                        <div id="teachersnote" style={{ display: "none" }}>
                                                                                                                                                                                                                                                                                                                                                  <LNote />
                                                                                                                                                                                                                                                                                                                                                          </div>

                                                                                                                                                                                                                                                                                                                                                                  <div id="meetonline" style={{ display: "none" }}>
                                                                                                                                                                                                                                                                                                                                                                            <Meet />
                                                                                                                                                                                                                                                                                                                                                                                    </div>

                                                                                                                                                                                                                                                                                                                                                                                            <div id="register" style={{ display: "none" }}>
                                                                                                                                                                                                                                                                                                                                                                                                      <RegisterBook />
                                                                                                                                                                                                                                                                                                                                                                                                              </div>

                                                                                                                                                                                                                                                                                                                                                                                                                      <div id="calendarviewing" style={{ display: "none" }}>
                                                                                                                                                                                                                                                                                                                                                                                                                                <ViewCalendar />
                                                                                                                                                                                                                                                                                                                                                                                                                                        </div>

                                                                                                                                                                                                                                                                                                                                                                                                                                                <div id="messageme" style={{ display: "none" }}>
                                                                                                                                                                                                                                                                                                                                                                                                                                                          <AnnounceHubView />
                                                                                                                                                                                                                                                                                                                                                                                                                                                                  </div>

                                                                                                                                                                                                                                                                                                                                                                                                                                                                          <div id="creategrade" style={{ display: "none" }}>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    <GradeCreate />
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            </div>

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    <div id="footerport">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              <Footer />
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            </div>

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  <ScrollToTop smooth className="scrolly" />
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      </>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        );
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        export default TeachersPortal;