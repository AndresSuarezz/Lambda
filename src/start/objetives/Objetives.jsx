import { Text, Title } from "@mantine/core";
import "./style.css";

const Objetives = () => {
  return (
    <section className="objetives">
      <Title
        order={2}
        size="h1"
        style={{ fontFamily: "Greycliff CF, var(--mantine-font-family)" }}
        fw={900}
        ta="center"
        mb={20}
      >
        ¿Como puedo usar Lambda?
      </Title>

      <div className="information">
        <div>
          <Title size="h3">¿No entiendes los temas de tu uni?🙃</Title>
          <Text c="dimmed" mt="md">
            En Lambda podras publicar tus dudas y algun tutor te ayudara a
            resolverlas.
          </Text>
        </div>

        <div>
          <Title size="h3">¿Eres muy Pro y sabes mucho?🤓☝️</Title>
          <Text c="dimmed" mt="md">
            En la plataforma podras ayudar a otros estudiantes a resolver sus
            dudas y ganar algo de dinero haciendolo.
          </Text>
        </div>
      </div>
    </section>
  );
};

export default Objetives;
