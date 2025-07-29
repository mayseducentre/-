import { HashRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/home";
import Error from "./pages/error";
import Register from "./pages/register";
import Contact from "./pages/contact";
import Portal from "./pages/portal";
import Account from "./pages/account";
import Aboutp from "./pages/about";
import InsGuide from "./component/ins_guide";
import SignSet from "./pages/user_setting";
import Library from "./pages/library";
import LibraryBooks from "./library/books";
import LibraryVideos from "./library/videos";
import AdminPage from "./pages/admin";
import ComputingAbbrev from "./component/comp_abbreviations";
import LessonNoteList from "./component/portal_component/viewnote.js";
import ManageItems from "./pages/manage_items";
import LibraryWebsites from "./library/website";
import News from "./pages/news_update";
import MecMedia from "./library/mec_media";
import PostB from "./pages/blogpost";
import ForgetPs from "./component/forgetps";
import DaycareForm from "./component/daycare_form";
import VRTour from "./library/vr_tour";
import ProjectView from "./component/portal_component/projectview.js"
import Assessment from "./component/portal_component/assessment.js";
import AssessmentA from "./component/portal_component/assessment admin.js";


window.addEventListener("keyup", (e)=>{
  if(e.ctrlKey && e.altKey && e.key === "a"){
      window.location.href="#/admin";
      
  }
  
  if(e.altKey && e.key === "p"){
      window.location.href="#/portal";
      
  }
  if(e.altKey && e.key === "c"){
    window.location.href="#/user_setting";
    
}

if(e.altKey && e.key === "t"){
  window.location.href="#/manage_items";
  
}

if(e.altKey && e.key === "l"){
  window.location.href="#/library";
  
}

if(e.altKey && e.key === "h"){
  window.location.href="/-/";
  
}
if(e.altKey && e.key === "."){
  window.location.href="#/adms";
  
}
if(e.shiftKey && e.key === "."){
  window.location.href="#/assess"
}
  })

function App() {

  return (
    <HashRouter>
    <Routes>
      <Route>
      <Route exact path="/" element={<Home />} />
      <Route path="*" element={<Error />} />
      <Route path="/admissions" element={<Register />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/portal" element={<Portal />} />
      <Route path="/account" element={<Account />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/about" element={<Aboutp />} />
      <Route path="/news_updates" element={<News />} />
      <Route path="/library" element={<Library />} />
      <Route path="/librarybooks" element={<LibraryBooks />} />
      <Route path="/libraryvideos" element={<LibraryVideos />} />
      <Route path="/librarymedia" element={<MecMedia/>} />
      <Route path="/librarywebsites" element={<LibraryWebsites />} />
      <Route path="/projects" element={<ProjectView />} />
      <Route path="/computing_abbrev" element={<ComputingAbbrev />} />
      <Route path="/ins_guide" element={<InsGuide />} />
      <Route path="/manage_items" element={<ManageItems />} />
      <Route path="/fgps" element={<ForgetPs />} />
      <Route path="/blogpost" element={<PostB />} />
      <Route path="/vrtour" element={<VRTour />} />
      <Route path="/daycareuser/account/form" element={<DaycareForm />} />
      <Route path="/user_setting" element={<SignSet />} />
      <Route path="/assess" element={<Assessment />} />
      <Route path="/adms" element={<AssessmentA />} />
      <Route path="/admin/note" element={<LessonNoteList />} />
       </Route>
    </Routes>
    </HashRouter>
  );
}

export default App;
