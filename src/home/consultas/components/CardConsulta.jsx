/* eslint-disable react/prop-types */
import { Card, Text, Group, Button, Badge } from "@mantine/core";
import classes from "../../style/CardWithStats.module.css";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import ModalClass from "../../../modal/ModalClass";

export function CardWithStats({
  title,
  requesterId,
  description,
  roomId,
  authorId,
}) {
  const [user, setUser] = useState("");
  useEffect(() => {
    const query = collection(db, "users");
    const suscribed = onSnapshot(query, (snapshot) => {
      snapshot.forEach((doc) => {
        if (doc.id === requesterId) {
          setUser(doc.data().displayName);
        }
      });
    });
    return () => suscribed();
  }, [requesterId]);

  return (
    <Card withBorder padding="sm" className={classes.card}>
      <Group justify="right" className={classes.section}>
        {authorId === requesterId ? (
          <Group className={classes.label} fz="xs" fw={700}>
            <Badge variant="light" bg="green" c="white">
              Tomado
            </Badge>
          </Group>
        ) : (
          <Group className={classes.label} c="blue" fz="xs" fw={700}>
            <Badge variant="light" bg="grape" c="white">
              Disponible
            </Badge>
          </Group>
        )}
      </Group>
      <Group justify="space-between">
        <Text fz="md" fw={700} className={classes.title}>
          {title}
        </Text>
      </Group>
      <Text mt="xs" mb="xs" fz="xs">
        {user}
      </Text>
      <Text mt="sm" mb="md" c="dimmed" fz="xs">
        {description}
      </Text>
      <Group>
        {/* Brindar Tutoria */}
        <Button radius={"md"} fullWidth>
          <ModalClass roomId={roomId} />
        </Button>
        {/* <Button>Brindar Tutoria</Button> */}
      </Group>
    </Card>
  );
}
