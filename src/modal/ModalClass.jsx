/* eslint-disable react/prop-types */
import { useDisclosure } from "@mantine/hooks";
import {
  Button,
  Group,
  Image,
  Input,
  Modal,
  Text,
  Textarea,
  rem,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { IconPhoto, IconUpload, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { updatePostSolicitudUsingId } from "../firebase/controller";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ModalClass = ({ roomId }) => {
  const navigate = useNavigate();
  const auth = useAuth();
  const { uid } = auth?.user || JSON.parse(localStorage.getItem("user") ? localStorage.getItem("user") : "{}");
  const [opened, { open, close }] = useDisclosure(false);
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const [isSelected, setIsSelected] = useState(false);

  const form = useForm({
    mode: "onChange",
    initialValues: {
      authorId: uid,
      coverUrl: null,
      description: "",
      price: 0,
    },
    validate: {
      description: (value) =>
        value.length < 10
          ? "La descripción debe tener al menos 10 caracteres"
          : null,
      coverUrl: (value) => (value === null ? "Debes subir una imagen" : null),
    },
  });

  const sendUpdatedData = async (values) => {
    try {
      const consulta = { ...values };
      if (consulta.coverUrl) {
        const storage = getStorage();
        const storageRef = ref(storage, `images/${consulta.coverUrl.name}`);
        await uploadBytes(storageRef, consulta.coverUrl);
        const downloadURL = await getDownloadURL(storageRef);
        consulta.coverUrl = downloadURL;
      }
      setIsSelected(true);
      await updatePostSolicitudUsingId(roomId, consulta);
      setIsSelected(false);
      close();
      form.reset();
      setImage("");
      setImageFile(null);
      navigate(`/home/lobby/${roomId}`);
    } catch (error) {
      console.log(error);
    }
  };

  const renderImage = (files) => {
    if (files && files.length > 0) {
      const file = files[0];
      const previewUrl = URL.createObjectURL(file);
      setImage(previewUrl);
      setImageFile(file);
      form.setFieldValue("coverUrl", file);
    }
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Brindar Tutoria">
        <form onSubmit={form.onSubmit(sendUpdatedData)}>
          <Textarea
            required
            mb={10}
            label="Descripción"
            description="Escribe aqui lo que vas a explicar"
            placeholder="La descripción debe tener al menos 10 caracteres"
            {...form.getInputProps("description")}
          />
          <Input.Wrapper label="Precio (COP)">
            <Input
              type="number"
              placeholder="Precio que deseas asignar"
              {...form.getInputProps("price")}
            />
          </Input.Wrapper>

          {image && (
            <Image
              src={image}
              style={{ width: "100%", height: "auto", marginTop: "10px" }}
            />
          )}

          <Dropzone
            onDrop={renderImage}
            onReject={(files) => console.log("rejected files", files)}
            maxSize={5 * 1024 ** 2}
            accept={IMAGE_MIME_TYPE}
            {...form.getInputProps("coverUrl")}
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
                  Arrastra la imagen o selecciona el archivo
                </Text>
                <Text size="sm" c="dimmed" inline mt={7}>
                  La imagen no debe pesar más de 5mb
                </Text>
              </div>
            </Group>
          </Dropzone>

          <Button loading={isSelected} mt={20} type="submit" fullWidth>
            Crear
          </Button>
        </form>
      </Modal>
      <Text onClick={open}>Brindar Tutoría</Text>
    </>
  );
};

export default ModalClass;
