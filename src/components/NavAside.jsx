import { UnstyledButton, Badge } from "@mantine/core";
import { IconCheckbox, IconLogout } from "@tabler/icons-react";
import { UserButton } from "./UserButton";
import classes from "../../styles/NavBarSearch.module.css";

const links = [{ icon: IconCheckbox, label: "Tareas", notifications: 4 }];

export function NavbarSearch() {
  const mainLinks = links.map((link) => (
    <UnstyledButton key={link.label} className={classes.mainLink}>
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
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.section}>
        <UserButton />
      </div>

      <div className={classes.section}>
        <div className={classes.mainLinks}>{mainLinks}</div>
      </div>

      <a
        href="#"
        className={classes.link}
        onClick={(event) => event.preventDefault()}
      >
        <IconLogout className={classes.linkIcon} stroke={1.5} />
        <span>Cerrar Sesion</span>
      </a>
    </nav>
  );
}
