import {
  addDoc,
  doc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
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
      state: "",
    });
    const finish = updateDoc(doc(db, "tutoring", docRef.id), {
      roomId: docRef.id, //Aqui se setea el RoomId
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
  let { authorId, coverUrl, description, price } = data;
  price = parseInt(price);
  try {
    const update = updateDoc(doc(db, "tutoring", roomId), {
      authorId,
      coverUrl,
      description,
      price,
      state: "active",
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

export const updateSolicitudStateToRunning = async (roomId) => {
  try {
    const update = updateDoc(doc(db, "tutoring", roomId), {
      state: "running",
    });

    toast.promise(update, {
      loading: "Actualizando informacion de la clase...",
      success: "Iniciando la llamada...",
      error: "Error al actualizar el estado",
    });
  } catch (error) {
    console.log("Error al cambiar el estado a 'running':", error);
  }
};

export const finishCall = async (roomId) => {
  try {
    const update = updateDoc(doc(db, "tutoring", roomId), {
      state: "finished",
    });
    toast.promise(update, {
      loading: "La llamada esta finalizando...",
      success: "La llamada ha sido finalizada",
      error: "Error al finalizar la llamada",
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteTutoringWhenCallHasFinished = async (roomId) => {
  try {
    await deleteDoc(doc(db, "tutoring", roomId));
  } catch (error) {
    console.log(error);
  }
};

export const findAuthorIdByRoomId = async (roomId) => {
  try {
    const docRef = collection(db, "tutoring");
    const q = query(docRef, where("roomId", "==", roomId));

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0]; // Si hay múltiples documentos, tomamos el primero
      const authorId = doc.data().authorId;
      //console.log(authorId );
      return authorId;
    } else {
      throw new Error("No se encontró ningún documento con ese roomId");
    }
  } catch (error) {
    console.log(error);
  }
};

// ** Waiting Rooms
// export const getAllWaitingRoomsByRoomId = async (roomId) => {
//   try {
//     const docRef = collection(db, "waiting_rooms");
//     const q = query(docRef, where("roomId", "==", roomId));

//     const querySnapshot = await getDocs(q);
//     const waitingRooms = [];
//     querySnapshot.forEach((doc) => {
//       waitingRooms.push(doc.data());
//     });
//     return waitingRooms;
//   } catch (error) {
//     console.log(error);
//   }
// };

// !nota user -> auth.user
export const createWaitingRoom = async (roomId, user) => {
  try {

    if (!user || !user?.uid) {
      throw new Error("User or user.uid is undefined");
    }
    //console.log(user);

    const docId = `${roomId}${user.uid}`;
    const docRef = await setDoc(doc(db, "waiting_rooms", docId), {
      accessState: "waiting",
      roomId,
      user: {
        displayName: user?.displayName,
        email: user?.email,
        photoURL: user?.photoURL,
        id: user?.uid,
      },
    });

    console.log(docRef.id);
  } catch (error) {
    console.log(error.message); // Imprimir mensaje de error
  }
};

export const grantedWaitingRoomAccess = async (roomId, id) => {
  try {
    const docRef = collection(db, "waiting_rooms");
    const q = query(docRef, where("roomId", "==", roomId), where("user.id", "==", id));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      updateDoc(doc.ref, {
        accessState: "granted",
      });
    });
  } catch (error) {
    console.log(error);
  }
}

export const deniedWaitingRoomAccess = async (roomId, id) => {
  try {
    const docRef = collection(db, "waiting_rooms");
    const q = query(docRef, where("roomId", "==", roomId), where("user.id", "==", id));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      updateDoc(doc.ref, {
        accessState: "denied",
      });
    });
  } catch (error) {
    console.log(error);
  }
}