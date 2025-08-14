import { Link } from "react-router-dom"
import { useStatusContext } from "../context/Status"
import Saludo from "./Saludo"
import StatusText from "./StatusText"

const Header = ({ nombreConductor, minutos, segundos, inicio, fin }) => {
  const { status } = useStatusContext()

  return (
    <header className="py-6 text-center text-gray-400">
      <Saludo name={nombreConductor} />
      <StatusText status={status} />

      <section>
        <p>
          {inicio && fin !== null
            ? `último viaje: ${minutos} min ${segundos} seg`
            : "..."}
        </p>
      </section>

      <Link to={"/config"} className="absolute top-5 right-5">
        <img src="cog.svg" className="size-6" alt="config" />
      </Link>
    </header>
  )
}

export default Header
