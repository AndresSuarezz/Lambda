/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const PrivateRoute = ({ children, redirectTo = "/" }) => {
  const auth = useAuth();
  const user = auth.user;
  
  if (!user) {
    return <Navigate to={redirectTo} />;
  }
  return children;
};
