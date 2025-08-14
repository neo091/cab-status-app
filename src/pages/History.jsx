import { useEffect, useState } from "react"
import Footer from "../components/Footer"
import Header from "../components/Header"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"
const History = () => {
  const apiUri =
    import.meta.env.VITE_API_URI_LOCAL ||
    "https://cabstatus-backend-v2.vercel.app"

  const [nombreConductor, setNombreConductor] = useState(
    localStorage.getItem("nombreConductor") || ""
  )

  const [historyList, setHistoryList] = useState([])

  const historyFetch = async () => {
    const result = await fetch(`${apiUri}/api/trips/${nombreConductor}`)

    if (!result.ok) {
      Swal.fire("error")

      return
    }

    const json = await result.json()

    setHistoryList(json)
  }

  useEffect(() => {
    historyFetch()
  }, [])

  const deleteItem = async (id) => {
    const result = await fetch(`${apiUri}/api/trips/${id}`, {
      method: "DELETE",
    })

    if (result.ok) {
      Swal.fire("borrado")
      historyFetch()
      return
    }
  }

  return (
    <>
      <main className="bg-gray-900 min-h-dvh flex flex-col">
        <Header />
        <section className="bg-gray-800 flex-1 flex flex-col items-center justify-center">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Conductor
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Monto
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Tipo
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Borrar</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {historyList.map((h) => (
                  <tr
                    key={h._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {h.conductor}
                    </th>
                    <td className="px-6 py-4">{h.monto}</td>
                    <td className="px-6 py-4">{h.metodoPago}</td>
                    <td className="px-6 py-4 text-right">
                      <a
                        href="#"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        onClick={() => deleteItem(h._id)}
                      >
                        Borrar
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Link
            to={"/"}
            className="p-2 text-center font-bold text-2xl text-white"
          >
            Volver
          </Link>
        </section>
        <Footer />
      </main>
    </>
  )
}

export default History
