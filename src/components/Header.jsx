import { Link } from "react-router-dom"
import { useStatusContext } from "../context/Status"
import Saludo from "./Saludo"
import StatusText from "./StatusText"
import { useSessionContext } from "../context/Session.context"

const Header = ({ timer = "" }) => {
  const { status } = useStatusContext()
  const { user } = useSessionContext()

  return (
    <header className="py-6 text-center text-gray-400">
      <Saludo name={user?.username} />
      <StatusText status={status} />

      <section>
        <p>{timer}</p>
      </section>

      <Link to={"/config"} className="absolute top-5 right-5">
        <img src="cog.svg" className="size-6" alt="config" />
      </Link>
    </header>
  )
}

export default Header
