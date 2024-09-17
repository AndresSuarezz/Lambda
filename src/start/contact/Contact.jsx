import {
  TextInput,
  Textarea,
  SimpleGrid,
  Group,
  Title,
  Button,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRef } from "react";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import "./style.css";

const Contact = () => {
  const ref = useRef();
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    validate: {
      name: (value) =>
        value.trim().length < 2
          ? "El nombre debe tener al menos 2 caracteres"
          : null,
      email: (value) =>
        !/^\S+@\S+$/.test(value) ? "El correo electrónico no es válido" : null,
      subject: (value) =>
        value.trim().length === 0 ? "El asunto no puede estar vacío" : null,
      message: (value) =>
        value.trim().length === 0 ? "El mensaje no puede estar vacío" : null,
    },
  });

  const sendEmail = () => {
    return emailjs.sendForm(
      "service_bynh5bc",
      "template_tvh6iko",
      ref.current,
      "Bjba6TiMr6DEY56AC"
    );
  };

  const sendForm = async (e) => {
    e.preventDefault();
    if (!form.validate().hasErrors) {
      try {
        await toast.promise(sendEmail(), {
          loading: "Enviando mensaje...",
          success: "Mensaje enviado ✅",
          error: "Error al enviar mensaje",
        });
        form.reset();
      } catch (error) {
        console.error("Error al enviar el formulario:", error);
      }
    }
  };

  return (
    <div className="container">
      <form ref={ref} className="form-contact" onSubmit={sendForm}>
        <Title
          order={2}
          size="h1"
          style={{ fontFamily: "Greycliff CF, var(--mantine-font-family)" }}
          fw={900}
          ta="center"
        >
          Contáctanos
        </Title>

        <SimpleGrid cols={1} sm={2} mt="xl">
          <TextInput
            label="Nombre"
            placeholder="Tu Nombre"
            name="name"
            variant="filled"
            {...form.getInputProps("name")}
          />
          <TextInput
            label="Email"
            placeholder="ejemplo@correo.com"
            name="email"
            variant="filled"
            {...form.getInputProps("email")}
          />
        </SimpleGrid>

        <TextInput
          label="Asunto"
          placeholder="Asunto"
          mt="md"
          name="subject"
          variant="filled"
          {...form.getInputProps("subject")}
        />
        <Textarea
          mt="md"
          label="Mensaje"
          placeholder="Escribe un mensaje"
          maxRows={10}
          minRows={5}
          autosize
          name="message"
          variant="filled"
          {...form.getInputProps("message")}
        />

        <Group position="center" mt="xl">
          <Button  type="submit" size="md">
            Enviar Mensaje
          </Button>
        </Group>
      </form>
    </div>
  );
};

export default Contact;
