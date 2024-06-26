import { BadgeCard } from "./components/CardClases";
import { CardWithStats } from "./components/CardConsulta";
import classes from "../style/Start.module.css";

const Start = () => {
  const mockDataConsultas = [
    {
      title: "Calculo Vectorial",
      name: "Miguel Lopera",
      description:
        "Necesito ayuda con el tema de calculo vectorial, no entiendo la parte de las matrices y los fundamentos",
    },
    {
      title: "Algebra Lineal",
      name: "Ana Martinez",
      description:
        "Necesito ayuda con los sistemas de ecuaciones lineales, no entiendo cómo resolverlos",
    },
    {
      title: "Programación Java",
      name: "Carlos Sanchez",
      description:
        "Necesito ayuda con la programación orientada a objetos en Java, no entiendo cómo implementar herencia",
    },
    {
      title: "Redes de Computadoras",
      name: "Laura Gomez",
      description:
        "Necesito ayuda con el enrutamiento de paquetes en redes, no entiendo cómo funcionan los protocolos de enrutamiento",
    },
    {
      title: "Base de Datos",
      name: "Juan Rodriguez",
      description:
        "Necesito ayuda con el diseño de una base de datos relacional, no entiendo cómo establecer las relaciones entre las tablas",
    },
  ];

  const mockDataLive = [
    {
      image: "https://cdn-icons-png.flaticon.com/512/9187/9187604.png",
      title: "Calculo Vectorial",
      tutor: "Jaime Peralta",
      description:
        "Explicamos los temas de calculo vectorial y sus fundamentos",
    },
    {
      image: "https://cdn-icons-png.flaticon.com/512/9187/9187604.png",
      title: "Algebra Lineal",
      tutor: "Angel Ruiz",
      description:
        "Explicamos el tema de ecuaciones lineales",
    },
    {
      image: "https://cdn-icons-png.flaticon.com/512/9187/9187604.png",
      title: "Programación Java",
      tutor: "Luis Bernal",
      description:
        "Explicamos los conceptos de programación orientada a objetos en Java",
    },
    {
      image: "https://cdn-icons-png.flaticon.com/512/9187/9187604.png",
      title: "Redes de Computadoras",
      tutor: "Camilo Rubio",
      description:
        "Explicamos los conceptos de enrutamiento de paquetes en redes",
    },
    {
      image: "https://cdn-icons-png.flaticon.com/512/9187/9187604.png",
      title: "Base de Datos",
      tutor: "Melissa Rodriguez",
      description:
        "Explicamos los conceptos de diseño de base de datos relacionales",
    },
  ];

  return (
    <div>
      <h2>Consultas Recientes</h2>
      <section className={classes.sectionCards}>
        {mockDataConsultas.map((consulta) => (
          <CardWithStats
            key={consulta.title}
            title={consulta.title}
            name={consulta.name}
            description={consulta.description}
          />
        ))}
      </section>
      <h2>Tutores en vivo</h2>
      <section className={classes.SectionLiveClass}>
        {mockDataLive.map((live) => (
          <BadgeCard
            key={live.title}
            image={live.image}
            title={live.title}
            tutor={live.tutor}
            description={live.description}
          />
        ))}
      </section>
    </div>
  );
};

export default Start;
