import { Link } from "react-router-dom"
import { useAuth } from "../context/auth/useAuth"
import { useConfig } from "../context/config/useConfig"
import { useStatus } from "../context/status/useStatus"

const Footer = () => {
  const { toggleAbreviated, abreviated } = useConfig()
  const { logout } = useAuth()
  const { restStatus } = useStatus()

  return (
    <footer className="py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 text-center gap-1 text-white justify-center items-center">
      <Link
        to={"/history"}
        className="px-6 py-2 bg-gray-950 rounded cursor-pointer "
      >
        Historial
      </Link>
      <button
        onClick={restStatus}
        className="px-6 py-2 bg-gray-950 rounded cursor-pointer"
      >
        Descansar
      </button>
      <button
        className="inline-block px-6 py-2 bg-gray-950 rounded cursor-pointer"
        onClick={toggleAbreviated}
      >
        Abreviado:{" "}
        {abreviated ? (
          <span className="text-green-500">Si</span>
        ) : (
          <span className="text-red-500">No</span>
        )}
      </button>
      <button
        className="inline-block px-6 py-2 bg-gray-950 rounded cursor-pointer"
        onClick={logout}
      >
        Logout
      </button>
    </footer>
  )
}

export default Footer
