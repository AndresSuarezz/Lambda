import { BadgeCard } from "./components/CardClases";
import { CardWithStats } from "./components/CardConsulta";
import classes from "../style/Start.module.css";
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { Select } from "@mantine/core";
import imgTilapia from "/img/tilapia.webp"
// import { Image } from "@mantine/core";
// import imageAd from "/public/img/image.png"

const Start = () => {
  const [data, setData] = useState([]);
  const [filtroTopic, setFiltroTopic] = useState(null);
  //console.log(filtro)

  useEffect(() => {
    const getAllSolicitud = async () => {
      try {
        onSnapshot(
          collection(db, "tutoring"),
          orderBy("title", "desc"),
          (snapshot) => {
            const data = snapshot.docs.map((doc) => {
              return { ...doc.data(), id: doc.id };
            });
            setData(data);
          }
        );
      } catch (error) {
        console.log(error);
      }
    };
    getAllSolicitud();
  }, []);

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
    <div>
      <div className={classes.contenedorAnuncio}>
        <img className={classes.imagenAnuncio} src={imgTilapia} alt="anuncio" />
        <h3 className={classes.textoAnuncio}>TilapiaExpress</h3>
      </div>
      <h2>Consultas Recientes</h2>
      <Select
        checkIconPosition="right"
        data={topics}
        pb={30}
        w={280}
        label="Filtro"
        placeholder="Selecciona un tema"
        nothingFoundMessage="No se encontraron temas"
        searchable
        clearable
        value={filtroTopic}
        onChange={(value) => setFiltroTopic(value)}
      />
      <section className={classes.sectionCards}>
        {data
          .filter(
            (consulta) =>
              consulta.authorId === null && consulta.requesterId !== null
          )
          .filter((consulta) => {
            if (filtroTopic === null) {
              return consulta;
            } else {
              return consulta.topic === filtroTopic;
            }
          })
          .map((consulta) => (
            <CardWithStats
              key={consulta.roomId}
              title={consulta.title}
              topic={consulta.topic}
              requesterId={consulta.requesterId}
              description={consulta.requesterDescription}
              roomId={consulta.roomId}
              authorId={consulta.authorId}
            />
          ))}
      </section>
      <h2>Tutores en vivo</h2>
      <section className={classes.SectionLiveClass}>
        {data
          .filter((live) => live.authorId)
          .map((live) => (
            <BadgeCard
              key={live.title}
              coverUrl={live.coverUrl}
              title={live.title}
              topic={live.topic}
              authorId={live.authorId}
              description={live.description}
              roomId={live.roomId}
              price={live.price}
            />
          ))}
      </section>
    </div>
  );
};

export default Start;
