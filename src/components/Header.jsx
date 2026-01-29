import { Link } from "react-router-dom"
import Saludo from "./Saludo"
import StatusText from "./StatusText"
import { IconChevronLeft, IconCog } from "../assets/Icons"
import { useAuth } from "../context/auth/useAuth"
import { useStatus } from "../context/status/useStatus"
import Counter from "./Counter"

const Header = ({ backspace }) => {
  const { status } = useStatus()
  const { user } = useAuth()

  return (
    <header className="py-6 text-center text-gray-400 flex items-center ">
      {backspace && (
        <Link
          to={"/"}
          className=" ms-4 flex justify-center items-center font-bold text-2xl rounded-full bg-gray-800 p-3"
        >
          <IconChevronLeft />
        </Link>
      )}
      <div className="ms-6 flex-1">
        <Saludo name={user?.first_name} />
        <StatusText status={status} />
        <Counter />
      </div>

      <Link to={"/config"} className=" bg-gray-800 p-3 rounded-full me-4">
        <IconCog size={6} />
      </Link>
    </header>
  )
}

export default Header
