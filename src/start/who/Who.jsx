import { Figma, Kotlin, ReactDark } from "../../assets/icons/Icons";
import "./style.css";
import MarcoImage from "/img/personals/fotoMarco.webp";
import AndresImage from "/img/personals/fotoAndres.webp";
import HarveyImage from "/img/personals/fotoHarvey.webp";
import { Title } from "@mantine/core";
const Who = () => {
  const people = [
    {
      img: HarveyImage,
      name: "Harvey Hernandez",
      job: "Diseñador Grafico",
      icon: <Figma />,
    },
    {
      img: MarcoImage,
      name: "Marco Portacio",
      job: "Desarrollador Mobile",
      icon: <Kotlin />,
    },
    {
      img: AndresImage,
      name: "Andrés Suárez",
      job: "Desarrollador Web",
      icon: <ReactDark />,
    },
  ];

  return (
    <>
      <Title
        order={2}
        size="h2"
        style={{ fontFamily: "Greycliff CF, var(--mantine-font-family)" }}
        fw={900}
        ta="center"
        mb={20}
      >
        Conoce al Equipo
      </Title>
      <div className="container">
        {people.map(({ img, name, job, icon }, index) => (
          <div key={index} className="container-card">
            <img src={img} alt={name} className="image" />

            <div className="info">
              <h2 className="name">{name}</h2>
              <h4 className="job">{job}</h4>
              <i className="icon">{icon}</i>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Who;
