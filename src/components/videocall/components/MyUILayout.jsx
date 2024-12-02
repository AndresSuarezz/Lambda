/* eslint-disable react/prop-types */
import { Button, Loader } from "@mantine/core";
import {
  CallControls,
  CallParticipantsList,
  CallingState,
  SpeakerLayout,
  StreamTheme,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import "./MyUILayout.css";
import logo from "/img/logo.png";
import { useState } from "react";

export const MyUILayout = ({ onLeave, onEndCall, isAuthor, onStartTranscription, onEndTranscription }) => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  const [isTranscriptionActive, setIsTranscriptionActive] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      {callingState === CallingState.JOINED ? (
        <div className="container-class">
          <div className="callParticipant">
            <StreamTheme>
              <div className="speakerLayout">
                <SpeakerLayout />
              </div>
              <div className="callControls">
                <CallControls onLeave={onLeave} />
              </div>
            </StreamTheme>
          </div>
          <div className="participantsContainer">
            <div className="headerParicipants">
              <img className="imagenLogoCall" src={logo} alt="Logo" />
              <h5>Lambda</h5>
              {isAuthor && <Button className="p-3" onClick={onEndCall}>Terminar LLamada</Button>}
              {isAuthor && !isTranscriptionActive && <Button className="p-3" onClick={() => {
                onStartTranscription();
                setIsTranscriptionActive(true);
              }}>Iniciar transcripción</Button>}
              {isAuthor && isTranscriptionActive && <Button className="p-3" onClick={ () => {
                onEndTranscription();
                setIsTranscriptionActive(false);
              } }>Finalizar Transcripción</Button>}
            </div>
            <CallParticipantsList />
          </div>
        </div>
      ) : (
        <div className="loader">
          <Loader size={30} />
        </div>
      )}
    </div>
  );
};
