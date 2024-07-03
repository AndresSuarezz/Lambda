import { addDoc, doc, updateDoc, collection } from "firebase/firestore";
import { db } from "./firebase";
import toast from "react-hot-toast";

export const createPostSolicitud = async (consulta) => {
  try {
    const { title, requesterDescription, requesterId } = consulta;
    //console.log(db)
    const docRef = await addDoc(collection(db, "tutoring"), {
      title,
      requesterDescription,
      requesterId,
      authorId: null,
      coverUrl: "",
      description: "",
      price: 0,
      roomId: "",
    });
    const finish = updateDoc(doc(db, "tutoring", docRef.id), {
      roomId: docRef.id,
    });
    //console.log("Enviado a firebase con exito 🔥");
    toast.promise(finish, {
      loading: "Enviando solicitud...",
      success: "Solicitud enviada con exito",
      error: "Error al enviar la solicitud",
    });
  } catch (error) {
    console.log(error);
  }
};

export const updatePostSolicitudUsingId = async (roomId, data) => {
  const { authorId, coverUrl, description, price } = data
  try {
    const update = updateDoc(doc(db, "tutoring", roomId), {
      authorId,
      coverUrl,
      description,
      price,
    });
    toast.promise(update, {
      loading: "Creando clase...",
      success: "Clase creada con exito",
      error: "Error al actualizar la solicitud",
    });
  } catch (error) {
    console.log(error);
  }
};
