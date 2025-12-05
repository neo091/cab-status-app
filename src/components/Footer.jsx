import { Link } from "react-router-dom"
import { useAbreviatedContext } from "../context/abreviated"

const Footer = ({ descansar }) => {
  const { toggleAbreviated, abreviated } = useAbreviatedContext()

  return (
    <footer className="py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 text-center gap-1 text-white justify-center items-center">
      <Link
        to={"/history"}
        className="px-6 py-2 bg-gray-950 rounded cursor-pointer "
      >
        Historial
      </Link>
      <button
        onClick={descansar}
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
    </footer>
  )
}

export default Footer
