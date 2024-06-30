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

export function BadgeCard({ image, title, description, tutor }) {
  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section>
        <Image src={image} alt={title} height={120} />
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Group justify="apart">
          <Text fz="lg" fw={500}>
            {title}
          </Text>
          <Badge size="sm" variant="light">
            {tutor}
          </Badge>
        </Group>
        <Text fz="sm" mt="xs">
          {description}
        </Text>
      </Card.Section>

      <Group mt="xs">
        <Button radius="md" style={{ flex: 1 }}>
          Ingresar
        </Button>
        <ActionIcon variant="default" radius="md" size={36}>
          <Tooltip withArrow label="¡Donar!">
            <IconHeart className={classes.like} stroke={1.5} />
          </Tooltip>
        </ActionIcon>
      </Group>
    </Card>
  );
}
