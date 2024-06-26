import { UnstyledButton, Badge } from "@mantine/core";
import { IconCheckbox, IconLogout, IconHome } from "@tabler/icons-react";
import { UserButton } from "./UserButton";
import classes from "../../styles/NavBarSearch.module.css";
import { Link } from "react-router-dom";
import "../../styles/Home.css"

const links = [
  { icon: IconHome, label: "Inicio", URL: "/home" },
  { icon: IconCheckbox, label: "Tareas", notifications: 2, URL: "/" },
];

export function NavbarSearch({ children }) {
  const mainLinks = links.map((link) => (
    <Link className={[classes.mainLink]} key={link.label} to={link.URL}>
      <UnstyledButton className={classes.mainLink}>
        <div className={classes.mainLinkInner}>
          <link.icon size={20} className={classes.mainLinkIcon} stroke={1.5} />
          <span>{link.label}</span>
        </div>
        {link.notifications && (
          <Badge size="sm" variant="filled" className={classes.mainLinkBadge}>
            {link.notifications}
          </Badge>
        )}
      </UnstyledButton>
    </Link>
  ));

  return (
    <>
      <nav id="asideHome" className={classes.navbar}>
        <div className={classes.section}>
          <UserButton />
        </div>

        <div className={classes.section}>
          <div className={classes.mainLinks}>{mainLinks}</div>
        </div>

        <Link
          to="/"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Cerrar Sesion</span>
        </Link>
      </nav>
      <section>{children}</section>
    </>
  );
}
