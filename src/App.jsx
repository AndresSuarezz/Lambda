/* eslint-disable react/no-children-prop */
import { HeaderMegaMenu } from "./components/NavBar";
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
import { PrivateRoute } from "./routes/PrivateRoute";
import Lobby from "./pages/lobby/Lobby";
import ChatPanel from "./pages/chat/Chat";
import Loading from "./pages/loading/Loading";

function App() {
  return (
    <>
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
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <Home children={<Start />} />
                </PrivateRoute>
              }
            />
            <Route path="/home/lobby/:roomId" element={<Home children={<Lobby/>}/>}/>  

            <Route path="/" element={<Welcome />} />
          </Route>

          <Route
            path="/task"
            element={
              <PrivateRoute>
                <WorkInProgress />
              </PrivateRoute>
            }
          />

          <Route path="/home/lobby/chat/:channelId/:authorId" element={<ChatPanel />}/>
          <Route path="/home/loading/call/:roomId" element={<Loading/>}/>

          <Route
            path="/home/call/:roomId"
            element={
              <PrivateRoute>
                <AppVideo />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;