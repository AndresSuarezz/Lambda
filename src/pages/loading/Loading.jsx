import { Flex, Loader, Text } from "@mantine/core";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../firebase/firebase";

const Loading = () => {
  const roomId  = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const query = doc(db, "tutoring", roomId.roomId);
    const unsubscribe = onSnapshot(query, (doc) => {
      const state = doc.data()?.state;
      
      if (state === "running") {
        navigate(`/home/call/${roomId.roomId}`);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <Flex
      direction={{ base: "column", sm: "column" }}
      gap={{ base: "sm", sm: "lg" }}
      justify={{ sm: "center" }}
      align={{ sm: "center" }}
      style={{ height: "100vh" }}
    >
      <Text size="xl" fw={"bold"}>
        Espera solo unos minutos mas
      </Text>
      <Text size="md">El tutor es haciendo un par de ajustes</Text>
      <Loader />
    </Flex>
  );
};

export default Loading;
