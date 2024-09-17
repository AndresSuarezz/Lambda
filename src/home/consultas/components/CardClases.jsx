/* eslint-disable react/prop-types */
import { IconHeart } from "@tabler/icons-react";
import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  Button,
  ActionIcon,
  Tooltip,
} from "@mantine/core";
import classes from "../../style/BadgeCard.module.css";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { Link } from "react-router-dom";

export function BadgeCard({
  coverUrl,
  title,
  topic,
  description,
  authorId,
  roomId,
  price,
}) {
  const [user, setUser] = useState("");
  useEffect(() => {
    const query = collection(db, "users");
    const suscribed = onSnapshot(query, (snapshot) => {
      snapshot.forEach((doc) => {
        if (doc.id === authorId) {
          setUser(doc.data().displayName);
        }
      });
    });
    return () => suscribed();
  }, [authorId]);

  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section>
        <Image src={coverUrl} alt={title} height={120} />
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Group justify="apart">
          <Badge size="sm" variant="light">
            {user}
          </Badge>
          <Badge size="sm" variant="light">
            {topic}
          </Badge>
          <Text w={"100%"} fz="lg" fw={500}>
            {title}
          </Text>
        </Group>
        <Text fz="sm" mt="xs">
          {description}
        </Text>
      </Card.Section>

      <Group mt="xs">
        <Link to={`call/${roomId}`}>
          <Button radius="md">
            {price ? `Unirse por $${price.toString()}` : "Unirse"}
          </Button>
        </Link>
        <ActionIcon variant="default" radius="md" size={36}>
          <Tooltip withArrow label="¡Donar!">
            <IconHeart className={classes.like} stroke={1.5} />
          </Tooltip>
        </ActionIcon>
      </Group>
    </Card>
  );
}
