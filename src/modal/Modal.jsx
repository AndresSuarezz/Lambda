import { useDisclosure } from "@mantine/hooks";
import { Button, Input, Modal, Text, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useAuth } from "../context/AuthContext";
import { createPostSolicitud } from "../firebase/controller";
// import { Group, rem } from "@mantine/core";
// import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
// import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";

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
      console.log(consulta)
      await createPostSolicitud(consulta);
      close();
      form.setValues({
        title: "",
        requesterDescription: "",
      })
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

          {/* <Dropzone
            onDrop={(files) => console.log("accepted files", files)}
            onReject={(files) => console.log("rejected files", files)}
            maxSize={5 * 1024 ** 2}
            accept={IMAGE_MIME_TYPE}
          >
            <Group
              justify="center"
              gap="xl"
              mih={220}
              style={{ pointerEvents: "none" }}
            >
              <Dropzone.Accept>
                <IconUpload
                  style={{
                    width: rem(52),
                    height: rem(52),
                    color: "var(--mantine-color-blue-6)",
                  }}
                  stroke={1.5}
                />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX
                  style={{
                    width: rem(52),
                    height: rem(52),
                    color: "var(--mantine-color-red-6)",
                  }}
                  stroke={1.5}
                />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconPhoto
                  style={{
                    width: rem(52),
                    height: rem(52),
                    color: "var(--mantine-color-dimmed)",
                  }}
                  stroke={1.5}
                />
              </Dropzone.Idle>

              <div>
                <Text size="xl" inline>
                  Drag images here or click to select files
                </Text>
                <Text size="sm" c="dimmed" inline mt={7}>
                  Attach as many files as you like, each file should not exceed
                  5mb
                </Text>
              </div>
            </Group>
          </Dropzone> */}
        </form>
      </Modal>
      <Text onClick={open}>Solicitar Tutoría</Text>
    </>
  );
};

export default ModalPop;
