/* eslint-disable react/prop-types */
import {
  StreamCall,
  StreamVideo,
  StreamVideoClient,
} from "@stream-io/video-react-sdk";
import { MyUILayout } from "./components/MyUILayout";
import classes from "../../../styles/video.module.css";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteTutoringWhenCallHasFinished,
  findAuthorIdByRoomId,
  finishCall,
} from "../../firebase/controller";
import { useEffect, useMemo, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useAuth } from "../../context/AuthContext";

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
        await call.join({ create: true });
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

  const endCall = async () => {
    try {
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
        />
      </StreamCall>
    </StreamVideo>
  );
};
