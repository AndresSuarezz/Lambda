import { Button, Text } from "@mantine/core";
import Card from "./components/Card";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { updateSolicitudStateToRunning } from "../../firebase/controller";

const Lobby = () => {
  const roomId = useParams();
  const navigate = useNavigate();
  const [listaUsuarios, setListaUsuarios] = useState([]);

  useEffect(() => {
    const traerListaUsuarios = () => {
      const docRef = collection(db, "waiting_rooms");
      const q = query(docRef, where("roomId", "==", roomId.roomId));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const waitingRooms = [];
        querySnapshot.forEach((doc) => {
          //console.log(doc.data());
          waitingRooms.push(doc.data());
        });
        setListaUsuarios(waitingRooms);
      });
      return unsubscribe;
    };

    const unsubscribe = traerListaUsuarios();

    // Cleanup
    return () => unsubscribe();
  }, [roomId]);

  const onClickIniciarClase = async () => {
    await updateSolicitudStateToRunning(roomId.roomId);
    navigate(`/home/call/${roomId.roomId}`);
  };

  return (
    <div>
      <Text fz="h1" fw={"bold"} mt={20}>
        Admite aqui a tus estudiantes
      </Text>
      <Button onClick={() => onClickIniciarClase()}>Iniciar Clase</Button>
      {listaUsuarios.map(
        (usuario) =>
          usuario.accessState === "waiting" && (
            <Card
              key={`${usuario.roomId}${usuario.user.id}`}
              accessState={usuario.accessState}
              roomId={usuario.roomId}
              displayName={usuario.user.displayName}
              email={usuario.user.email}
              id={usuario.user.id}
              photoURL={usuario.user.photoURL}
            />
          )
      )}
    </div>
  );
};

export default Lobby;
