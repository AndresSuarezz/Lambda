import { useDisclosure } from "@mantine/hooks";
import { Button, Input, Modal, Text, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useAuth } from "../context/AuthContext";
import { createPostSolicitud } from "../firebase/controller";

const ModalPop = () => {
  const auth = useAuth();
  const { uid } = auth.user || localStorage.getItem("user");
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      title: "",
      requesterDescription: "",
      requesterId: uid,
    },
  });

  const sendData = async (consulta) => {
    try {
      await createPostSolicitud(consulta);
      close();
      form.setValues({
        title: "",
        requesterDescription: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

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
          <Textarea
            mb={30}
            label="Descripción"
            description="Escribe aqui lo que necesitas aprender"
            placeholder="No entiendo bien el tema de..."
            key={form.key("requesterDescription")}
            {...form.getInputProps("requesterDescription")}
          />

          <Button type="submit" fullWidth>
            Crear Solcitud
          </Button>
        </form>
      </Modal>
      <Button>
        <Text fw={"bold"} fz={"sm"} onClick={open}>
          Solicitar Tutoría
        </Text>
      </Button>
    </>
  );
};

export default ModalPop;
