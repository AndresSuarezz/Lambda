import { HeaderMegaMenu } from "./components/NavBar";
import { Hero } from "./hero/Hero";
import { AuthenticationForm as Login } from "./components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <HeaderMegaMenu />
      <Routes>
        <Route path="/" element={<Hero />}/>
        <Route path="/login" element={<Login />}/>
      </Routes>
    </Router>
  );
}

export default App;
