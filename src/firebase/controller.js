import { addDoc, doc, updateDoc, collection } from "firebase/firestore";
import { db } from "./firebase";
import toast from "react-hot-toast";

export const createPostSolicitud = async (consulta) => {
  try {
    const { title, topic, requesterDescription, requesterId } = consulta;
    const docRef = await addDoc(collection(db, "tutoring"), {
      title,
      topic,
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
  let { authorId, coverUrl, description, price } = data
  price = parseInt(price)
  try {
    const update = updateDoc(doc(db, "tutoring", roomId), {
      authorId,
      coverUrl,
      description,
      price
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
