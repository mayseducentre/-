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

window.addEventListener("keyup", (e)=>{
  if(e.ctrlKey && e.altKey && e.key === "a"){
      window.location.href="#/admin";
      
  }
  
  if(e.shiftKey && e.key === "P"){
      window.location.href="#/portal";
      
  }
  if(e.shiftKey && e.key === "C"){
    window.location.href="#/user_setting";
    
}

if(e.shiftKey && e.key === "L"){
  window.location.href="#/library";
  
}

if(e.shiftKey && e.key === "H"){
  window.location.href="/-/";
  
}
  })

function App() {

  return (
    <HashRouter>
    <Routes>
      <Route>
      <Route exact path="/" element={<Home />} />
      <Route path="*" element={<Error />} />
      <Route path="/register" element={<Register />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/portal" element={<Portal />} />
      <Route path="/account" element={<Account />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/about" element={<Aboutp />} />
      <Route path="/library" element={<Library />} />
      <Route path="/librarybooks" element={<LibraryBooks />} />
      <Route path="/libraryvideos" element={<LibraryVideos />} />
      <Route path="/computing_abbrev" element={<ComputingAbbrev />} />
      <Route path="/ins_guide" element={<InsGuide />} />
      <Route path="/user_setting" element={<SignSet />} />
       </Route>
    </Routes>
    </HashRouter>
  );
}

export default App;
