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

  const isLobbyRoute = ruta.slice(0,12) === "/home/lobby/";
  //console.log(isLobbyRoute);

  return (
    <Box>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Link to={"/"}>
            <Image src={logo} width={60} height={60} />
          </Link>

          {!isLobbyRoute && (
            <Group visibleFrom="sm">
              {ruta === "/home" ? (
                <>{ruta === "/home" ? <ModalPop /> : "Ingresar"}</>
              ) : (
                <Link to={"/login"}>
                  <Button variant="default">
                    {ruta === "/home" ? <ModalPop /> : "Ingresar"}
                  </Button>
                </Link>
              )}
              <div>
                {ruta === "/home" ? (
                  <div></div>
                ) : (
                  <Link to="/login">
                    <Button>Registrarse</Button>
                  </Link>
                )}
              </div>
            </Group>
          )}

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

          {!isLobbyRoute && (
            <Group justify="center" grow pb="xl" px="md">
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
          )}
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
