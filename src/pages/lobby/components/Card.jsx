/* eslint-disable react/prop-types */
import { Avatar, Button, Group, Text } from "@mantine/core";
import { IconMessage } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import {
  deniedWaitingRoomAccess,
  grantedWaitingRoomAccess,
} from "../../../firebase/controller";

const Card = ({ accesState, roomId, displayName, email, id, photoUrl }) => {
  const auth = useAuth();
  const { uid } = auth.user;

  const onAdmit = async () => {
    await grantedWaitingRoomAccess(roomId, id);
  };
  const onReject = async () => {
    await deniedWaitingRoomAccess(roomId, id);
  };
  return (
    <Group my={20} wrap="nowrap">
      <Avatar src={photoUrl} size={94} radius="md" />
      <div>
        <Group>
          <Text fz="lg" fw={500}>
            {displayName}
          </Text>
          <Link to={`/home/lobby/chat/${roomId}${id}/${uid}`}>
            <IconMessage size={29} stroke={1} />
          </Link>
        </Group>
        <Text fz="xs" c="dimmed">
          {email}
        </Text>
        <Group mt={10}>
          <Button onClick={() => onAdmit()}>Admitir</Button>
          <Button onClick={() => onReject()} variant="light">
            Rechazar
          </Button>
        </Group>
      </div>
    </Group>
  );
};

export default Card;
