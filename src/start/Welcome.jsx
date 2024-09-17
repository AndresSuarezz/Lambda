import { Hero } from "../hero/Hero"
import Contact from "./contact/Contact"
import Objetives from "./objetives/Objetives"
import Who from "./who/Who"

const Welcome = () => {
  return (
    <>
        <Hero />
        <Objetives /> 
        <Who />
        <Contact />
    </>
  )
}

export default Welcome