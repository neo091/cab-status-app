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
    <header className="w-full pt-4 pb-2 px-4 bg-gray-900 border-b border-gray-800">
      <div className="max-w-md mx-auto">
        {/* FILA SUPERIOR: Navegación y Usuario */}
        <div className="flex items-center justify-between mb-2">
          {backspace ? (
            <Link
              to="/"
              className="flex justify-center items-center h-10 w-10 rounded-xl bg-gray-800 border border-gray-700 active:bg-gray-700"
            >
              <IconChevronLeft size={20} className="text-white" />
            </Link>
          ) : (
            <div className="h-10 w-10 bg-green-500 rounded-xl flex items-center justify-center font-black text-black text-lg">
              N
            </div>
          )}

          <div className="flex flex-col items-center">
            <Saludo name={user?.first_name} />
            <StatusText status={status} />
          </div>

          <Link
            to="/config"
            className="h-10 w-10 bg-gray-800 rounded-xl border border-gray-700 flex items-center justify-center"
          >
            <IconCog size={20} className="text-gray-400" />
          </Link>
        </div>

        {/* FILA INFERIOR: El Contador (Dándole su propio espacio para que no estorbe) */}
        <div className="w-full flex justify-center py-1">
          <div className="bg-gray-800/50 px-4 py-1 rounded-full border border-gray-700/50">
            <Counter />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
