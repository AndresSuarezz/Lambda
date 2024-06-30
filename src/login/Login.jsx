import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Text,
  Container,
  Button,
  Divider,
} from "@mantine/core";
import { GoogleButton } from "../assets/icons/GoogleButton";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/firebase";
import { setDoc, doc } from "firebase/firestore";

export function AuthenticationTitle() {
  const auth = useAuth();
  const navigate = useNavigate()

  const handleGoogle = async (e) => {
    e.preventDefault()
    await auth.loginWithGoogle()
    const {displayName, email, photoURL, uid } = auth.user
    await setDoc(doc(db, "users", uid), {
      displayName,
      email,
      id: uid,
      photoURL 
    });
    localStorage.setItem("user", JSON.stringify(auth.user))
    navigate("/home")
  }

  return (
    <Container size={420} my={40}>
      <Title ta="center">Bienvenido!</Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Inicia Sesion{" "}
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput label="Correo" placeholder="correo@lambda.dev" required />
        <PasswordInput
          label="Contraseña"
          placeholder="tu contraseña"
          required
          mt="md"
        />

        <Button fullWidth mt="xl">
          Iniciar Sesion
        </Button>
        <Divider my="md" label="O inicia sesion con" />

        <GoogleButton onClick={(e) => handleGoogle(e)}  fullWidth mt="xl">
          Iniciar Sesion
        </GoogleButton>
      </Paper>
    </Container>
  );
}
