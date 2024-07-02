/* eslint-disable react/prop-types */
import {
  CallControls,
  CallingState,
  SpeakerLayout,
  StreamTheme,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";

export const MyUILayout = ({onLeave}) => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  return (
    <div>
      {callingState === CallingState.JOINED ? (
        <StreamTheme >
          <SpeakerLayout participantsBarPosition="bottom" />
          <CallControls onLeave={onLeave}/>
        </StreamTheme>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};
