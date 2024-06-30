import { Container, Title, Text, Button, SimpleGrid } from '@mantine/core';
import classes from '../../styles/NotFoundImage.module.css';
import { useNavigate } from 'react-router-dom';

export function NotFoundImage() {
  const navigate = useNavigate()
  const hadleBack = (e) => {
    e.preventDefault()
    navigate(-1)
  }
  return (
    <Container className={classes.root}>
      <SimpleGrid spacing={{ base: 40, sm: 80 }} cols={{ base: 1, sm: 2 }}>
        {/* <Image src={image.src} className={classes.mobileImage} /> */}
        <div>
          <Title className={classes.title}>404 No Encontrado 🔥</Title>
          <Text c="dimmed" size="lg">
            Aqui no hay nada para ver, favor vuelve al inicio🤿
          </Text>
          <Button onClick={e => hadleBack(e) } variant="outline" size="md" mt="xl" className={classes.control}>
            Inicio
          </Button>
        </div>
        {/* <Image src={image.src} className={classes.desktopImage} /> */}
      </SimpleGrid>
    </Container>
  );
}