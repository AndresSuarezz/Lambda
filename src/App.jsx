/* eslint-disable react/no-children-prop */
import { HeaderMegaMenu } from "./components/NavBar";
import { Hero } from "./hero/Hero";
import Home from "./home/Home";
import Start from "./home/consultas/Start";
import { AuthenticationForm as Login } from "./login/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <HeaderMegaMenu />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home children={<Outlet />} />}>
          <Route path="/home/" element={<Start />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
