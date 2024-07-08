/* eslint-disable react/prop-types */
import {
  StreamCall,
  StreamVideo,
  StreamVideoClient,
} from "@stream-io/video-react-sdk";
import { MyUILayout } from "./components/MyUILayout";
import classes from "../../../styles/video.module.css";
import '@stream-io/video-react-sdk/dist/css/styles.css';
import { useNavigate, useParams } from "react-router-dom";

export const AppVideo = () => {
  const navigate = useNavigate()
  const { roomId } = useParams()
  const { displayName, uid, photoURL } = JSON.parse(
    localStorage.getItem("user")
  );

  const apiKey = import.meta.env.VITE_VIDEO_API_KEY;
  const userId = uid;

  const user = {
    id: userId,
    name: displayName,
    image: photoURL,
    type: "guest",
  };
  const client = new StreamVideoClient({ apiKey, user });
  const call = client.call("default", roomId);
  call.join({ create: true });

  const leave = () => {
    call.leave()
    navigate(-1)
  }

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <MyUILayout onLeave={() => leave()} style={classes.str_video}/>
      </StreamCall>
    </StreamVideo>
  );
};
