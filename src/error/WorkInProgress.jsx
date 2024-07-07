import { Container, Title, Text, Button, SimpleGrid } from '@mantine/core';
import classes from '../../styles/NotFoundImage.module.css';
import { useNavigate } from 'react-router-dom';

function WorkInProgress() {
  const navigate = useNavigate()
  const hadleBack = (e) => {
    e.preventDefault()
    navigate("/home")
  }
  return (
    <Container className={classes.root}>
      <SimpleGrid spacing={{ base: 40, sm: 80 }} cols={{ base: 1, sm: 2 }}>
        {/* <Image src={image.src} className={classes.mobileImage} /> */}
        <div>
          <Title className={classes.title}>Estamos agregando nuevas funciones 🔥</Title>
          <Text c="dimmed" size="lg">
            Estamos trabajando en esto🤿
          </Text>
          <Button onClick={e => hadleBack(e) } variant="outline" size="md" mt="xl" className={classes.control}>
            Volver
          </Button>
        </div>
        {/* <Image src={image.src} className={classes.desktopImage} /> */}
      </SimpleGrid>
    </Container>
  );
}

export default WorkInProgress