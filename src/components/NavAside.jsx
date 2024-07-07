/* eslint-disable react/prop-types */
import { UnstyledButton, Badge, Button } from "@mantine/core";
import { IconCheckbox, IconLogout, IconHome } from "@tabler/icons-react";
import { UserButton } from "./UserButton";
import classes from "../../styles/NavBarSearch.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../../styles/Home.css"

const links = [
  { icon: IconHome, label: "Inicio", URL: "/home" },
  { icon: IconCheckbox, label: "Tareas", notifications: 2, URL: "/task" },
];

export function NavbarSearch({ children }) {
  const auth = useAuth();
  const navigate = useNavigate()

  const handleLogOut = (e) => {
    e.preventDefault()
    auth.logout()
    console.log("Logout button clicked");
    navigate("/")
    localStorage.removeItem("user")
  }
  
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

        <Button
          className={classes.link}
          onClick={(e) => handleLogOut(e)}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Cerrar Sesion</span>
        </Button>
      </nav>
      <section>{children}</section>
    </>
  );
}
