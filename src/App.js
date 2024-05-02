import { HashRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/home";
import Error from "./pages/error";



function App() {

  return (
    <HashRouter>
    <Routes>
      <Route>
      <Route exact path="/" element={<Home />} />
      <Route path="*" element={<Error />} />
       </Route>
    </Routes>
    </HashRouter>
  );
}

export default App;
