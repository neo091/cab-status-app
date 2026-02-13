import { useEffect, useState } from "react"
import Footer from "../components/Footer"
import Header from "../components/Header"
import Swal from "sweetalert2"
import { supabase } from "../lib/supabase"
import { useAuth } from "../context/auth/useAuth"
import ExportToCVSButton from "../components/ExportCVSButton"
import HistoriList from "../components/HistoryList"
import Paginador from "../components/Paginador"
import SkeletonHistoryItem from "../components/SkeletonHistoryItem"
import HistoryChart from "../components/HistoryChart"

const ITEMS_PER_PAGE = 5

const History = () => {
  const [historyList, setHistoryList] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [totalCount, setTotalCount] = useState(0)
  const [filter, setFilter] = useState("all") // "all", "today", "week", "month"
  const { user } = useAuth()

  // Función para obtener el rango de fechas según el filtro
  const getDateRange = (filterType) => {
    const now = new Date()
    let fromDate = new Date()

    if (filterType === "today") {
      fromDate.setHours(0, 0, 0, 0)
    } else if (filterType === "week") {
      const day = now.getDay() // 0 es domingo
      const diff = now.getDate() - day + (day === 0 ? -6 : 1) // Lunes
      fromDate = new Date(now.setDate(diff))
      fromDate.setHours(0, 0, 0, 0)
    } else if (filterType === "month") {
      fromDate = new Date(now.getFullYear(), now.getMonth(), 1)
      fromDate.setHours(0, 0, 0, 0)
    } else {
      return null // Para "all"
    }
    return fromDate.toISOString()
  }

  const fetchHistory = async () => {
    setLoading(true)
    try {
      const from = page * ITEMS_PER_PAGE
      const to = from + ITEMS_PER_PAGE - 1

      const dateLimit = getDateRange(filter)

      let query = supabase
        .from("history")
        .select("*", { count: "exact" })
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .range(from, to)

      // Aplicar filtro de fecha si existe
      if (dateLimit) {
        query = query.gte("created_at", dateLimit)
      }

      const { data, error, count } = await query

      if (error) throw error
      // setTrips(data)
      setHistoryList(data)
      setTotalCount(count)
    } catch (error) {
      console.error("Error cargando historial:", error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchHistory()
  }, [user.id, page, filter])

  const deleteItem = async (id) => {
    const { error } = await supabase
      .from("history")
      .delete()
      .eq("id", id) // El ID del viaje específico
      .eq("user_id", user.id) // El ID del dueño del viaje

    if (error) {
      console.error("No se pudo borrar:", error.message)
      return
    }
    fetchHistory()
  }

  const handleDelete = (tripId) => {
    Swal.fire({
      title: "¿Eliminar registro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444", // Rojo
      cancelButtonColor: "#374151", // Gris oscuro
      confirmButtonText: "Sí, borrar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteItem(tripId)

        Swal.fire({
          title: "Borrado",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        })
      }
    })
  }

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

  return (
    <>
      <main className="bg-gray-900 min-h-screen flex flex-col">
        <Header backspace />

        <section className="flex-1 p-4 max-w-md mx-auto w-full">
          {/* Solo mostramos la gráfica si hay datos y no está cargando */}
          {!loading && historyList.length > 0 && (
            <HistoryChart data={historyList} />
          )}

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-white text-xl font-bold">Historial</h2>
            <ExportToCVSButton filter={filter} historyList={historyList} />
          </div>
          <div className="flex gap-2 px-4 py-2 overflow-x-auto bg-gray-900 no-scrollbar">
            {[
              { id: "all", label: "Todo" },
              { id: "today", label: "Hoy" },
              { id: "week", label: "Semana" },
              { id: "month", label: "Mes" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => {
                  setPage(0)
                  setFilter(f.id)
                }}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                  filter === f.id
                    ? "bg-green-500 text-black shadow-lg shadow-green-500/20"
                    : "bg-gray-800 text-gray-400 border border-gray-700"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {loading ? (
              // Mostramos 5 esqueletos mientras carga
              Array.from({ length: 5 }).map((_, i) => (
                <SkeletonHistoryItem key={i} />
              ))
            ) : historyList.length === 0 ? (
              <div className="text-center text-gray-400 py-10">
                No tienes viajes
              </div>
            ) : (
              <HistoriList
                historyList={historyList}
                handleDelete={handleDelete}
              />
            )}
          </div>

          {/* Paginador Mejorado */}
          {!loading && totalCount > ITEMS_PER_PAGE && (
            <Paginador
              page={page}
              totalPages={totalPages}
              prevPage={() => {
                setPage((p) => p - 1)
              }}
              nextPage={() => {
                setPage((p) => p + 1)
              }}
            />
          )}
        </section>

        <Footer />
      </main>
    </>
  )
}

export default History
