/* eslint-disable react/prop-types */
import { Loader } from "@mantine/core";
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

export const MyUILayout = ({ onLeave }) => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

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
