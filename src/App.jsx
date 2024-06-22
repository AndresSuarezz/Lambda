import { NavbarSearch } from "./components/NavAside";
import { HeaderMegaMenu } from "./components/NavBar";
import { Hero } from "./hero/Hero";
import { AuthenticationForm as Login } from "./login/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <HeaderMegaMenu />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<NavbarSearch />} />
      </Routes>
    </Router>
  );
}

export default App;
