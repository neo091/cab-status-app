import { useEffect, useState } from "react"
import Footer from "../components/Footer"
import Header from "../components/Header"
import Swal from "sweetalert2"
import { deleteTrip, getTrips } from "../services/trip.service"
import { IconsTrash } from "../assets/Icons"
const History = () => {
  const [historyList, setHistoryList] = useState([])
  const [pagination, setPagination] = useState(null)
  const [page, setPage] = useState(1)
  const token = null

  const historyFetch = async (currentPage = 1) => {
    try {
      const result = await getTrips({ token, page: currentPage })
      setHistoryList(result.trips)
      setPagination(result.pagination)
      setPage(currentPage)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    historyFetch(1)
  }, [])

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: false,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer
      toast.onmouseleave = Swal.resumeTimer
    },
  })

  const deleteItem = async (id) => {
    Swal.fire({
      title: "Quieres borrar este viaje?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Si Borrar",
      denyButtonText: `No`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const result = await deleteTrip({ token, id })

        console.log(result.deletedId)
        historyFetch(page)
        Toast.fire({
          icon: "success",
          title: result.message,
        })
      }
    })

    // const result = await fetch(`${apiUri}/api/trips/${id}`, {
    //   method: "DELETE",
    // })
    // if (result.ok) {
    //   Swal.fire("borrado")
    //   historyFetch()
    //   return
    // }
  }

  return (
    <>
      <main className="bg-gray-900 min-h-dvh flex flex-col">
        <Header backspace />
        <section className="bg-gray-800 flex-1 flex flex-col items-center justify-center">
          {historyList.length === 0 ? (
            <div className="text-center text-gray-400 py-6">
              🚕 No tienes viajes todavía
            </div>
          ) : (
            <div className="w-full max-w-md mx-auto space-y-4 px-4">
              {historyList.map((h) => (
                <div
                  key={h.id}
                  className="bg-gray-700 rounded-xl shadow-md hover:shadow transition-all duration-300 shadow-black/40 flex overflow-hidden"
                >
                  <div className="flex-1 p-4">
                    <p className="text-lg font-bold text-green-400">
                      {h.amount} €
                    </p>
                    <p className="text-sm text-gray-300">
                      {h.duration} min • {h.payMethod}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteItem(h.id)}
                    className="text-white hover:bg-red-600 p-4"
                  >
                    <IconsTrash />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Paginador */}
          {pagination && (
            <div className="flex gap-2 mt-4">
              <button
                disabled={page <= 1}
                onClick={() => historyFetch(page - 1)}
                className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
              >
                Anterior
              </button>
              <span className="text-white">
                Página {page} de {pagination.totalPages}
              </span>
              <button
                disabled={page >= pagination.totalPages}
                onClick={() => historyFetch(page + 1)}
                className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
              >
                Siguiente
              </button>
            </div>
          )}
        </section>
        <Footer />
      </main>
    </>
  )
}

export default History
