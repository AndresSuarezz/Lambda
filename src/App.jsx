/* eslint-disable react/no-children-prop */
import { HeaderMegaMenu } from "./components/NavBar";
import { AuthProvider } from "./context/AuthContext";
import { Hero } from "./hero/Hero";
import Home from "./home/Home";
import Start from "./home/consultas/Start";
import { AuthenticationTitle as Login } from "./login/Login";
import { NotFoundImage as ErrorPage } from "./error/ErrorPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AppVideo } from "./components/videocall/AppVideo";

function App() {

  return (
    <AuthProvider>
      <Toaster position="top-center" reverseOrder={false}/>
      <Router>
        <HeaderMegaMenu />
        <Routes>
          <Route path="/*" element={<ErrorPage />} />
          <Route path="/" element={<Hero />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home children={<Outlet />} />}>
            <Route path="/home" element={<Start />} />
          </Route>
          <Route path="/home/call/:roomId" element={<AppVideo/>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
