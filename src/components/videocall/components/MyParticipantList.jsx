import { ParticipantView } from "@stream-io/video-react-sdk";

/* eslint-disable react/prop-types */
export const MyParticipantList = ({ props }) => {
  const { participants } = props;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "10px",
        width: "100vw",
      }}
    >
      {participants.map((participant) => (
        <div
          key={participant.sessionId}
          style={{ width: "100%", aspectRatio: "3/2" }}
        >
          <ParticipantView
            muteAudio
            participant={participant}
            key={participant.sessionId}
          />
        </div>
      ))}
    </div>
  );
};
