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
    useEffect(()=> {
        const sucribed = onAuthStateChanged(auth, (currentUser) => {
            if(!currentUser){
                console.log("no hay usuario suscrito")
            } else {
                const userLocalStor = JSON.parse(localStorage.getItem("user"))
                setUser(currentUser || userLocalStor)
            }
        })
        return () => sucribed()
    },[])
    
  //Funcion que permite loguearse con google
  const loginWithGoogle = async () => {
    const responseGoogle = new GoogleAuthProvider();
    return await signInWithPopup(auth, responseGoogle);
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <authContext.Provider value={{ loginWithGoogle, logout, user }}>
      {children}
    </authContext.Provider>
  );
}
