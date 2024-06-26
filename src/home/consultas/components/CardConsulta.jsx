import { Card, Image, Text, Group, RingProgress, Button } from "@mantine/core";
import classes from "../../style/CardWithStats.module.css";

const stats = [
  { title: "Distance", value: "27.4 km" },
  { title: "Avg. speed", value: "9.6 km/h" },
  { title: "Score", value: "88/100" },
];

export function CardWithStats({title, name, description}) {
  const items = stats.map((stat) => (
    <div key={stat.title}>
      <Text size="xs" c="dimmed">
        {stat.title}
      </Text>
      <Text fw={500} size="sm">
        {stat.value}
      </Text>
    </div>
  ));

  return (
    <Card withBorder padding="lg" className={classes.card}>
      <Card.Section>
        {/* <Image
          src="https://images.unsplash.com/photo-1581889470536-467bdbe30cd0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80"
          alt="Running challenge"
          height={100}
        /> */}
      </Card.Section>

      <Group justify="space-between" mt="xl">
        <Text fz="sm" fw={700} className={classes.title}>
          {title}
        </Text>
      </Group>
      <Text mt="xs" mb="xs" fz="xs">{name}</Text>
      <Text mt="sm" mb="md" c="dimmed" fz="xs">
        {description}
      </Text>
      <Group>
        <Button>Brindar Tutoria</Button>
      </Group>
      {/* s<Card.Section className={classes.footer}>{items}</Card.Section> */}
    </Card>
  );
}
