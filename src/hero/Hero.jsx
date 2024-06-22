import {
  Container,
  Title,
  Button,
  Group,
  Text,
  List,
  ThemeIcon,
  rem,
  Image,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import logo from "../../public/img/lambda_logo.png";
import classes from "./styles/HeroBullets.module.css";

export function Hero() {
  return (
    <Container size="md">
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>
            Bienvenido a <span className={classes.highlight}>Lambda</span>,
            estamos contigo <br />
          </Title>
          <Text c="dimmed" mt="md">
            Build fully functional accessible web applications faster than ever
            – Mantine includes more than 120 customizable components and hooks
            to cover you in any situation
          </Text>

          <List
            mt={30}
            spacing="sm"
            size="sm"
            icon={
              <ThemeIcon size={20} radius="xl">
                <IconCheck
                  style={{ width: rem(12), height: rem(12) }}
                  stroke={1.5}
                />
              </ThemeIcon>
            }
          >
            <List.Item>
              <b>100% en linea</b> – Ofrecemos un servicio de calidad y
              confiable para que puedas conectarte con un tutor en cualquier
              momento
            </List.Item>
            <List.Item>
              <b>Totalmente Gratuito</b> – No pagas nada y aprendes mucho, es
              una excelente oportunidad para ti
            </List.Item>
            <List.Item>
              <b>Puedes ser tutor</b> – Te sientes capaz de enseñar, adelante y
              comparte tus conocimientos
            </List.Item>
          </List>

          <Group mt={30}>
            <Button
              radius="xl"
              size="md"
              color="grape"
              className={classes.control}
            >
              Registrarse
            </Button>
            <Button
              variant="default"
              radius="xl"
              size="md"
              className={classes.control}
            >
              Ingresar
            </Button>
          </Group>
        </div>
        <Image src={logo} className={classes.image} />
      </div>
    </Container>
  );
}
