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
import '@stream-io/video-react-sdk/dist/css/styles.css';

export const MyUILayout = ({ onLeave }) => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {callingState === CallingState.JOINED ? (
        <StreamTheme>
          <div style={{ zIndex: -1,display: 'flex', justifyContent: 'space-between', padding: '10px'}}>
            <CallParticipantsList />
          </div>
          <div style={{ flex: 1, position: 'relative', color: '#ffff' }}>
            <SpeakerLayout />
          </div>
          <div style={{ padding: '10px', display: 'flex', justifyContent: 'center', color: "#ffff" }}>
            <CallControls onLeave={onLeave} />
          </div>
        </StreamTheme>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Loader size={30}/>
        </div>
      )}
    </div>
  );
};