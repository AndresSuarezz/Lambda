/* eslint-disable react/no-children-prop */
import { HeaderMegaMenu } from "./components/NavBar";
import { AuthProvider } from "./context/AuthContext";
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
import WorkInProgress from "./error/WorkInProgress";
import Welcome from "./start/Welcome";

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-center" reverseOrder={false} />
      <Router>
        <Routes>
          <Route path="/*" element={<ErrorPage />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <>
                <HeaderMegaMenu />
                <Outlet />
              </>
            }
          >
            <Route path="/home" element={<Home children={<Start />} />} />
            <Route path="/" element={<Welcome />} />
          </Route>
          <Route path="/task" element={<WorkInProgress />} />
          <Route path="/home/call/:roomId" element={<AppVideo />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
