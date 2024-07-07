import { BadgeCard } from "./components/CardClases";
import { CardWithStats } from "./components/CardConsulta";
import classes from "../style/Start.module.css";
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "../../firebase/firebase";
// import { Image } from "@mantine/core";
// import imageAd from "/public/img/image.png"

const Start = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getAllSolicitud = async () => {
      try {
        onSnapshot(collection(db, "tutoring"), orderBy("title", "desc"), (snapshot) => {
          const data = snapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
          });
          setData(data);
        });
      } catch (error) {
        console.log(error);
      }
    };
    getAllSolicitud();
  }, []);

  return (
    <div>
      <h2>Consultas Recientes</h2>
      <section className={classes.sectionCards}>
        {data
        .filter((consulta) => consulta.authorId === null && consulta.requesterId !== null)
        .map((consulta) => (
          <CardWithStats
            key={consulta.roomId}
            title={consulta.title}
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
