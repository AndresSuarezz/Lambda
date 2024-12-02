/* eslint-disable react/prop-types */
import {
  StreamCall,
  StreamVideo,
  StreamVideoClient,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import classes from "../../../styles/video.module.css";
import { axiosInstance } from "../../axios/axiosInstance";
import { useAuth } from "../../context/AuthContext";
import {
  deleteTutoringWhenCallHasFinished,
  findAuthorIdByRoomId,
  finishCall,
} from "../../firebase/controller";
import { db } from "../../firebase/firebase";
import { MyUILayout } from "./components/MyUILayout";
import toast from "react-hot-toast";

export const AppVideo = () => {
  const navigate = useNavigate();
  const [isAuthor, setIsAuthor] = useState(false);
  const { roomId } = useParams();
  const auth = useAuth();
  const { displayName, uid, photoURL } = auth.user;

  const apiKey = import.meta.env.VITE_VIDEO_API_KEY;
  const userId = uid;

  const user = {
    id: userId,
    name: displayName,
    image: photoURL,
    type: "guest",
  };

  // Crear cliente de Stream una sola vez usando useMemo
  const client = useMemo(
    () => new StreamVideoClient({ apiKey, user }),
    [apiKey, user]
  );
  const call = useMemo(() => client.call("default", roomId), [client, roomId]);

  const startTranscription = async () => {
    try {
      return await axiosInstance.post(`/calls/start-transcription/${roomId}`);
    } catch (error) {
      console.error("Error al iniciar la transcripción:", error);
    }
  };

  const endTranscription = async () => {
    try {
      return await axiosInstance.post(`/calls/end-transcription/${roomId}`);
    } catch (error) {
      console.error("Error al finalizar la transcripción:", error);
    }
  };

  async function getUserEmailsFromRoom(roomId) {
    // Obtener los IDs de usuario asociados a la sala
    const attendsCollection = collection(db, "attends");
    const attendsQuery = query(
      attendsCollection,
      where("mentoringId", "==", roomId)
    );
    const attendDocs = await getDocs(attendsQuery);

    const userIds = attendDocs.docs.map((doc) => doc.data().userId);

    // Obtener los datos de usuario usando los IDs obtenidos
    const usersCollection = collection(db, "users");
    const usersQuery = query(usersCollection, where("id", "in", userIds));
    const userDocs = await getDocs(usersQuery);

    const users = userDocs.docs.map((doc) => doc.data());

    // Devolver los correos electrónicos
    return users.map((user) => user.email);
  }

  // const checkAttendanceExists = async (uid, roomId) => {
  //   const attendsRef = collection(db, "attends");
  //   const q = query(
  //     attendsRef,
  //     where("userId", "==", uid),
  //     where("mentoringId", "==", roomId)
  //   );
  //   const querySnapshot = await getDocs(q);

  //   return querySnapshot.empty;
  // };

  useEffect(() => {
    const author = async () => {
      const authorId = await findAuthorIdByRoomId(roomId);
      if (authorId === userId) {
        setIsAuthor(true);
      }
    };
    author();
  }, [roomId, userId]);

  useEffect(() => {
    const query = doc(db, "tutoring", roomId);
    const unsubscribe = onSnapshot(query, (doc) => {
      const state = doc.data()?.state;
      if (state === "finished" && !isAuthor) {
        endCall(); // Finaliza la llamada si no eres el autor
      }
    });
    return () => unsubscribe();
  }, [roomId, isAuthor]);

  useEffect(() => {
    // Únete a la llamada una sola vez
    const joinCall = async () => {
      try {
        await addDoc(collection(db, "attends"), {
          userId: userId,
          mentoringId: roomId,
        });

        await call.join({ create: true });

        //const response = await startTranscription();
        console.log("startTranscriptionResponse", response);
      } catch (error) {
        console.error("Error al unirse a la llamada:", error);
      }
    };

    joinCall();

    return () => {
      call.leave(); // Abandonar la llamada solo cuando el componente se desmonte completamente
    };
  }, [call]);

  const leave = () => {
    call.leave();
    navigate("/home");
  };

  const listRecordings = async () => {
    const result = await call.queryRecordings();
    return result.recordings.map((recording) => recording.url);
  };

  const sendVideoCallInfoByEmail = async (emails, videosUrl, roomId) => {
    return await axiosInstance.post("/emails", {
      to: emails,
      urlVideos: videosUrl,
      roomId,
    });
  };

  const endCall = async () => {
    try {
      // const response = await endTranscription();
      // console.log("endTranscriptionResponse", response);
      if (isAuthor) {
        const recordingUrls = await listRecordings();
        const userEmails = await getUserEmailsFromRoom(roomId);
        console.log("emails", userEmails);
        console.log("recordings", recordingUrls);

        const sendEmailResponse = sendVideoCallInfoByEmail(
          userEmails,
          recordingUrls,
          roomId
        );

        toast.promise(sendEmailResponse, {
          loading: "Enviando grabación y resumen a los correos...",
          success: "Correos enviados con éxito",
          error: "Error al enviar correos",
        });

        console.log("sendEmailResponse", sendEmailResponse);
      }

      await finishCall(roomId);
      await deleteTutoringWhenCallHasFinished(roomId);
      leave(); // Dejar la llamada después de finalizar
    } catch (error) {
      console.error("Error al finalizar la llamada:", error);
    }
  };

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        {console.log("Has entrado a la tutoría: AppVideo")}
        <MyUILayout
          onLeave={() => leave()}
          onEndCall={() => endCall()}
          isAuthor={isAuthor}
          style={classes.str_video}
          onEndTranscription={async () => {
            const result = await endTranscription();
            console.log("endTranscription", result);
          }}
          onStartTranscription={async () => {
            const result = await startTranscription();
            console.log("startTranscription", result);
          }}
        />
      </StreamCall>
    </StreamVideo>
  );
};
