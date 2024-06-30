import { addDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

export const createPostSolicitud = async (consulta) => {
    try {
        const {title, description, requester, } = consulta
        const docRef = addDoc(db, "tutoring", {
        title,
        description,
        requester
    });
    updateDoc(docRef, {id: docRef.id})
    
    } catch (error) {
        console.log(error)
    }
}