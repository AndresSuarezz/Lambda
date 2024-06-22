import { UnstyledButton, Group, Avatar, Text } from '@mantine/core';
import classes from '../../styles/UserButton.module.css';

export function UserButton() {
  return (
    <UnstyledButton my={10} ml={10} className={classes.user}>
      <Group>
        <Avatar
          src="https://avatars.githubusercontent.com/u/49999988?s=400&u=1f1fa26130d00c4065c3e97b53f393108014fc8c&v=4"
          radius="xl"
        />

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            Andres Suarez
          </Text>

          <Text c="dimmed" size="xs">
            anfesuguito22@gmail.com
          </Text>
        </div>

      </Group>
    </UnstyledButton>
  );
}