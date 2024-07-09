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
      <Route path="/about" element={<Aboutp />} />
      <Route path="/ins_guide" element={<InsGuide />} />
      <Route path="/user_setting" element={<SignSet />} />
       </Route>
    </Routes>
    </HashRouter>
  );
}

export default App;
