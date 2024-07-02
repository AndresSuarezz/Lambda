/* eslint-disable react/prop-types */
import {
  StreamCall,
  StreamVideo,
  StreamVideoClient,
} from "@stream-io/video-react-sdk";
import { MyUILayout } from "./components/MyUILayout";
// import { useEffect } from "react";
import classes from "../../../styles/video.module.css";
import '@stream-io/video-react-sdk/dist/css/styles.css';
import { useParams } from "react-router-dom";

export const AppVideo = () => {
  const { roomId } = useParams()
  //console.log(roomId)
  const { displayName, uid, photoURL } = JSON.parse(
    localStorage.getItem("user")
  );
  //console.log(uid);

  const apiKey = "kegs4gg73yzr";
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

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <MyUILayout onLeave={() => call.leave()} style={classes.str_video}/>
      </StreamCall>
    </StreamVideo>
  );
};
