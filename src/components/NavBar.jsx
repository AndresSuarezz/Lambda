import {
  Group,
  Button,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  rem,
  Image,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "../../styles/HeaderMegaMenu.module.css";
import logo from "/img/logo.png";
import { Link, useLocation } from "react-router-dom";
import ModalPop from "../modal/Modal";
import { IconCamera } from "@tabler/icons-react";

export function HeaderMegaMenu() {
  const params = useLocation();
  const ruta = params.pathname;

  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  return (
    <Box>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Link to={"/"}>
            <Image src={logo} width={60} height={60} />
          </Link>

          <Group visibleFrom="sm">
            {/* {ruta === "/home" && (
              <TextInput
                placeholder="Buscar"
                size="xs"
                leftSection={
                  <IconSearch
                    style={{ width: rem(12), height: rem(12) }}
                    stroke={1.5}
                  />
                }
                rightSectionWidth={70}
                styles={{ section: { pointerEvents: "none" } }}
              />
            )} */}
            {ruta === "/home" ? (
              <>{ruta === "/home" ? <ModalPop /> : "Ingresar"}</>
            ) : (
              <Link to={"/login"}>
                <Button variant="default">
                  {ruta === "/home" ? <ModalPop /> : "Ingresar"}
                </Button>
              </Link>
            )}
            <Link>
              {ruta === "/home" ? (
                <div></div>
              ) : (
                <Link to="/login">
                  <Button>Registrarse</Button>
                </Link>
              )}
            </Link>
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
          />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navegación"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            {/* {ruta === "/home" && (
              <TextInput
                placeholder="Buscar"
                size="xs"
                leftSection={
                  <IconSearch
                    style={{ width: rem(12), height: rem(12) }}
                    stroke={1.5}
                  />
                }
                rightSectionWidth={70}
                styles={{ section: { pointerEvents: "none" } }}
              />
            )} */}
            <Link to={"/login"}>
              <Button variant="default">
                {ruta === "/home" ? "Solicitud" : "Ingresar"}
              </Button>
            </Link>
            <Link>
              <Button>
                {ruta === "/home" ? (
                  <div className={classes.mainLinkInner}>
                    <IconCamera />
                    <span>Iniciar Clase</span>
                  </div>
                ) : (
                  "Registrarse"
                )}
              </Button>
            </Link>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
