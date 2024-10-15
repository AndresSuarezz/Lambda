import { useDisclosure } from "@mantine/hooks";
import { Button, Input, Modal, Select, Text, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useAuth } from "../context/AuthContext";
import { createPostSolicitud } from "../firebase/controller";
import { useState } from "react";

const ModalPop = () => {
  const auth = useAuth();
  const { uid } =
    auth?.user ||
    JSON.parse(
      localStorage.getItem("user") ? localStorage.getItem("user") : "{}"
    );
  const [opened, { open, close }] = useDisclosure(false);
  const [isCreated, setIsCreated] = useState(false);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      title: "",
      requesterDescription: "",
      requesterId: uid,
      topic: "",
    },
  });

  const sendData = async (consulta) => {
    try {
      setIsCreated(true);
      await createPostSolicitud(consulta);
      setIsCreated(false);
      close();
      form.setValues({
        title: "",
        requesterDescription: "",
        topic: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const topics = [
    "Matemáticas",
    "Física",
    "Química",
    "Informática",
    "Programación",
    "Lectura Crítica",
    "Cocina",
    "Musica",
  ];

  return (
    <>
      <Modal opened={opened} onClose={close} title="Hacer solicitud de tutoría">
        <form onSubmit={form.onSubmit((values) => sendData(values))}>
          <Input.Wrapper mb={5} label="Titulo">
            <Input
              placeholder="Escribe aqui el titulo"
              key={form.key("title")}
              {...form.getInputProps("title")}
            />
          </Input.Wrapper>
          <Select
            checkIconPosition="right"
            data={topics}
            pb={5}
            label="Tema"
            placeholder="Selecciona un tema"
            nothingFoundMessage="No se encontraron temas"
            searchable
            clearable
            key={form.key("topic")}
            {...form.getInputProps("topic")}
          />
          <Textarea
            mb={30}
            label="Descripción"
            description="Escribe aqui lo que necesitas aprender"
            placeholder="No entiendo bien el tema de..."
            key={form.key("requesterDescription")}
            {...form.getInputProps("requesterDescription")}
          />

          <Button type="submit" loading={isCreated} fullWidth>
            Crear Solcitud
          </Button>
        </form>
      </Modal>
      {/* Boton de la NavBar */}
      <Button>
        <Text fw={"bold"} fz={"sm"} onClick={open}>
          Solicitar Tutoría
        </Text>
      </Button>
    </>
  );
};

export default ModalPop;
