import { Suspense, useEffect, useState } from "react"
import Footer from "../components/Footer"
import Header from "../components/Header"
import Swal from "sweetalert2"
import { deleteTrip, getTrips } from "../services/trip.service"
import { IconsTrash } from "../assets/Icons"
import { supabase } from "../lib/supabase"
import { useAuth } from "../context/auth/useAuth"

const ITEMS_PER_PAGE = 5

const SkeletonItem = () => (
  <div className="bg-gray-700/50 rounded-xl p-4 flex animate-pulse h-24 w-full">
    <div className="flex-1 space-y-3">
      <div className="h-5 bg-gray-600 rounded w-1/4"></div>
      <div className="h-4 bg-gray-600 rounded w-1/2"></div>
      <div className="h-3 bg-gray-600 rounded w-1/3"></div>
    </div>
    <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
  </div>
)

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

  const exportToCSV = () => {
    if (historyList.length === 0) return

    // Cabeceras
    const headers = ["Fecha,Monto,Duracion,Metodo\n"]

    // Filas (usamos todos los datos actuales o podrías hacer un fetch de TODO el historial)
    const rows = historyList.map((h) => {
      return `${new Date(h.created_at).toLocaleDateString()},${h.amount},${h.duration},${h.paymethod}\n`
    })

    const csvContent = headers.concat(rows).join("")
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `historial_viajes_${filter}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

  return (
    <>
      <main className="bg-gray-900 min-h-screen flex flex-col">
        <Header backspace />

        <section className="flex-1 p-4 max-w-md mx-auto w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-white text-xl font-bold">Historial</h2>
            <button
              onClick={exportToCSV}
              className="text-[10px] bg-gray-700 text-gray-300 px-3 py-1 rounded hover:bg-gray-600 border border-gray-600"
            >
              📥 Exportar CSV
            </button>
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
              Array.from({ length: 5 }).map((_, i) => <SkeletonItem key={i} />)
            ) : historyList.length === 0 ? (
              <div className="text-center text-gray-400 py-10">
                No tienes viajes
              </div>
            ) : (
              historyList.map((h) => (
                <div
                  key={h.id}
                  className="bg-gray-800 border border-gray-700 rounded-2xl shadow-lg flex overflow-hidden hover:border-green-500/50 transition-colors"
                >
                  <div className="flex-1 p-4">
                    <div className="flex justify-between items-start">
                      <p className="text-2xl font-black text-white">
                        {h.amount}{" "}
                        <span className="text-green-400 text-lg">€</span>
                      </p>
                      <span
                        className={`text-[10px] uppercase font-bold px-2 py-1 rounded ${h.paymethod === "CASH" ? "bg-green-500/10 text-green-500" : "bg-blue-500/10 text-blue-500"}`}
                      >
                        {h.paymethod}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">
                      ⏱️ {h.duration} •{" "}
                      {new Date(h.created_at).toLocaleDateString(undefined, {
                        day: "numeric",
                        month: "short",
                      })}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(h.id)}
                    className="bg-gray-700/30 hover:bg-red-500/20 text-gray-500 hover:text-red-500 transition-all px-4 flex items-center"
                  >
                    <IconsTrash />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Paginador Mejorado */}
          {!loading && totalCount > ITEMS_PER_PAGE && (
            <div className="flex items-center justify-between mt-8 bg-gray-800 p-2 rounded-xl border border-gray-700">
              <button
                disabled={page === 0}
                onClick={() => setPage((p) => p - 1)}
                className="p-2 text-white disabled:opacity-30 hover:bg-gray-700 rounded-lg transition-colors"
              >
                Anterior
              </button>
              <span className="text-gray-400 text-sm font-medium">
                Pág. <span className="text-white">{page + 1}</span> de{" "}
                {totalPages}
              </span>
              <button
                disabled={page >= totalPages - 1}
                onClick={() => setPage((p) => p + 1)}
                className="p-2 text-white disabled:opacity-30 hover:bg-gray-700 rounded-lg transition-colors"
              >
                Siguiente
              </button>
            </div>
          )}
        </section>

        <Footer />
      </main>
      )
    </>
  )
}

export default History
