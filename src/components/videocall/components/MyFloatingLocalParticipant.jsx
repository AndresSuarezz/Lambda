import { ParticipantView } from "@stream-io/video-react-sdk";

/* eslint-disable react/prop-types */
export const MyFloatingLocalParticipant = ({ props }) => {
  const { participant } = props;

  return (
    <div
      style={{
        position: "absolite",
        top: "15px",
        left: "15px",
        width: "240px",
        height: "135px",
        boxShadow: "rgba(0,0,0,0.1) 0px 0px 10px 3px",
        borderRadius: "12px",
      }}
    >
      {participant && <ParticipantView participant={participant} />}
    </div>
  );
};
