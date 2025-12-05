import { Link } from "react-router-dom"
import { useStatusContext } from "../context/Status"
import Saludo from "./Saludo"
import StatusText from "./StatusText"
import { useSessionContext } from "../context/Session.context"
import { IconChevronLeft, IconCog } from "../assets/Icons"

const Header = ({ timer = "", backspace }) => {
  const { status } = useStatusContext()
  const { user } = useSessionContext()

  return (
    <header className="py-6 text-center text-gray-400">
      {backspace && (
        <Link
          to={"/"}
          className="absolute top-2 left-2 flex justify-center items-center font-bold text-2xl  rounded-full bg-gray-800 p-3"
        >
          <IconChevronLeft />
        </Link>
      )}
      <Saludo name={user?.username} />
      <StatusText status={status} />

      <section>
        <p>{timer}</p>
      </section>

      <Link
        to={"/config"}
        className="absolute top-2 right-2 bg-gray-800 p-3 rounded-full"
      >
        <IconCog />
      </Link>
    </header>
  )
}

export default Header
