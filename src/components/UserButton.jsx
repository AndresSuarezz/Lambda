import { UnstyledButton, Group, Avatar, Text, Loader } from '@mantine/core';
import classes from '../../styles/UserButton.module.css';
import { useAuth } from '../context/AuthContext';

export function UserButton() {
  const auth = useAuth();
  const {displayName, email, photoURL } = auth?.user || localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {};
  
  return (
    <UnstyledButton my={10} ml={10} className={classes.user}>
      <Group>
        <Avatar
          src={!photoURL ? <Loader /> : photoURL}
          radius="xl"
        />

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            {displayName}
          </Text>

          <Text c="dimmed" size="xs">
            {email}
          </Text>
        </div>

      </Group>
    </UnstyledButton>
  );
}