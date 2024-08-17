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
import LibraryLog from "./pages/library_create";
import LibraryWebsites from "./library/website";
import LibraryEvent from "./library/event_media";

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
  window.location.href="#/create_items";
  
}

if(e.altKey && e.key === "l"){
  window.location.href="#/library";
  
}

if(e.altKey && e.key === "h"){
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
      <Route path="/libraryevent" element={<LibraryEvent />} />
      <Route path="/librarywebsites" element={<LibraryWebsites />} />
      <Route path="/computing_abbrev" element={<ComputingAbbrev />} />
      <Route path="/ins_guide" element={<InsGuide />} />
      <Route path="/create_items" element={<LibraryLog />} />
      <Route path="/user_setting" element={<SignSet />} />
       </Route>
    </Routes>
    </HashRouter>
  );
}

export default App;
