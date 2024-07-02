import { BadgeCard } from "./components/CardClases";
import { CardWithStats } from "./components/CardConsulta";
import classes from "../style/Start.module.css";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const Start = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getAllSolicitud = async () => {
      try {
        onSnapshot(collection(db, "tutoring"), (snapshot) => {
          const data = snapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
          });
          //console.log("Consulta en tiempo real:", data);
          setData(data);
          //console.log(data)
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
        {data.map((consulta) => (
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
            />
          ))}
      </section>
    </div>
  );
};

export default Start;
