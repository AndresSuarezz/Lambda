/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { auth } from "../firebase/firebase";
import { createContext, useContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {toast} from "react-hot-toast"

//Creando el contexto del objeto
const authContext = createContext();

//useAuth() es una funcion que retorna el contexto del objeto que fue creado
export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) {
    console.log("error creating auth context");
  }
  return context;
};

//AuthProvider es un componente que envuelve a los componentes hijos y les pasa el contexto del objeto
export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    //const navigate = useNavigate();
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          // Si hay un usuario autenticado, lo seteamos directamente
          setUser(currentUser);
          localStorage.setItem("user", JSON.stringify(currentUser));
        } else {
          const userLocalStor = JSON.parse(localStorage.getItem("user"));
          if (userLocalStor) {
            setUser(userLocalStor);
          } else {
            console.log("No hay usuario suscrito");
          }
        }
      });
      return () => unsubscribe();
    }, []);
    
    
  //Funcion que permite loguearse con google
  const loginWithGoogle = async () => {
    if (user) {
      console.log("Usuario ya autenticado");
      return user;
    }
    const responseGoogle = new GoogleAuthProvider();
   
    try {
      const result = await signInWithPopup(auth, responseGoogle);
      localStorage.setItem("user", JSON.stringify(result.user));
      setUser(result.user);
      toast.success("Sesion iniciada ✅", {duration: 2000})
      return result.user;
    } catch (error) {
      toast.error("Error al iniciar sesion")
      console.error("Error durante el login", error);
    }
  };
  
  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      setUser(null);
    } catch (error) {
      console.error("Error during logout", error);
    }
  };

  return (
    <authContext.Provider value={{ loginWithGoogle, logout, user }}>
      {children}
    </authContext.Provider>
  );
}
