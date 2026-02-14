import { useEffect, useState } from "react"
import Footer from "../components/Footer"
import Header from "../components/Header"
import Swal from "sweetalert2"
import { supabase } from "../lib/supabase"
import { useAuth } from "../context/auth/useAuth"
import ExportToCVSButton from "../components/ExportCVSButton"
import Paginador from "../components/Paginador"
import SkeletonHistoryItem from "../components/SkeletonHistoryItem"
import { useConfig } from "../context/config/useConfig"
import HistoryList from "../components/HistoryList"
import Layout from "../layouts/Layout"
import { getDateRange } from "../lib/util"

const ITEMS_PER_PAGE = 5

const History = () => {
  const [historyList, setHistoryList] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [totalCount, setTotalCount] = useState(0)
  const [filter, setFilter] = useState("today") // "all", "today", "week", "month"
  const { user } = useAuth()
  const { currency } = useConfig()

  const [stats, setStats] = useState({
    totalBruto: 0,
    totalTarjeta: 0,
    totalEfectivo: 0,
    gananciaNeta: 0, // El 40% del total
    diferenciaEfectivo: 0, // Lo que te queda en mano tras liquidar
  })

  const [showSummary, setShowSummary] = useState(false)

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

      let totalQuery = supabase
        .from("history")
        .select("amount, paymethod") // Solo pedimos la columna amount para que sea ligero
        .eq("user_id", user.id)

      if (dateLimit) totalQuery = totalQuery.gte("created_at", dateLimit)

      const [resList, resTotal] = await Promise.all([query, totalQuery])

      if (resList.error) throw resList.error
      if (resTotal.error) throw resTotal.error

      // Seteamos la lista y el conteo
      setHistoryList(resList.data)
      setTotalCount(resList.count)

      const data = resTotal.data

      const bruto = data.reduce(
        (acc, item) => acc + (parseFloat(item.amount) || 0),
        0,
      )
      const tarjeta = data
        .filter((i) => i.paymethod === "CARD")
        .reduce((acc, item) => acc + (parseFloat(item.amount) || 0), 0)
      const efectivo = data
        .filter((i) => i.paymethod === "CASH")
        .reduce((acc, item) => acc + (parseFloat(item.amount) || 0), 0)

      // Tu 40% de todo lo trabajado
      const netoQueTeCorresponde = (bruto * 40) / 100

      const aCobrarOEntregar = netoQueTeCorresponde - efectivo

      setStats({
        totalBruto: bruto,
        totalTarjeta: tarjeta,
        totalEfectivo: efectivo,
        gananciaNeta: netoQueTeCorresponde,
        diferenciaEfectivo: aCobrarOEntregar,
      })
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
  // const totalRecaudado = historyList.reduce(
  //   (acc, item) => acc + (parseFloat(item.amount) || 0),
  //   0,
  // )

  return (
    <>
      <Layout>
        <main className="bg-gray-900 min-h-screen flex flex-col">
          <Header backspace />

          <section className="flex-1 p-4 max-w-md mx-auto w-full">
            <button
              onClick={() => setShowSummary(!showSummary)}
              className="w-full mb-4 bg-gray-800 border border-gray-700 p-4 rounded-2xl flex justify-between items-center active:scale-95 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="bg-green-500/10 p-2 rounded-lg">💰</div>
                <div className="text-left">
                  <p className="text-[10px] text-gray-500 uppercase font-bold">
                    Ganancia Hoy (40%)
                  </p>
                  <p className="text-xl font-black text-white">
                    {stats.gananciaNeta.toFixed(2)}
                    {currency}
                  </p>
                </div>
              </div>
              <span
                className={`text-gray-500 transition-transform ${showSummary ? "rotate-180" : ""}`}
              >
                ▼
              </span>
            </button>

            {showSummary && (
              <div className="bg-gray-800/80 border border-gray-700 rounded-3xl p-6 mb-6 shadow-2xl">
                {/* GANANCIA REAL (TU 40%) */}
                <div className="text-center mb-6 pb-6 border-b border-gray-700/50">
                  <p className="text-green-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">
                    Tu Ganancia Neta (40%)
                  </p>
                  <p className="text-4xl font-black text-white">
                    {stats.gananciaNeta.toFixed(2)}
                    <span className="text-xl ml-1 text-green-500">
                      {currency}
                    </span>
                  </p>
                  <p className="text-[9px] text-gray-500 uppercase mt-1 tracking-widest">
                    Sobre un bruto de {stats.totalBruto.toFixed(2)}
                    {currency}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                  <div className="bg-gray-900/50 p-3 rounded-2xl border border-gray-700">
                    <p className="text-gray-500 text-[10px] uppercase font-bold mb-1">
                      En Tarjeta
                    </p>
                    <p className="font-bold text-blue-400">
                      {stats.totalTarjeta.toFixed(2)}
                      {currency}
                    </p>
                  </div>
                  <div className="bg-gray-900/50 p-3 rounded-2xl border border-gray-700">
                    <p className="text-gray-500 text-[10px] uppercase font-bold mb-1">
                      En Efectivo
                    </p>
                    <p className="font-bold text-green-400">
                      {stats.totalEfectivo.toFixed(2)}
                      {currency}
                    </p>
                  </div>
                </div>
                <div
                  className={`p-4 rounded-2xl flex justify-between items-center ${
                    stats.diferenciaEfectivo >= 0
                      ? "bg-green-500/10 border border-green-500/20" // Caso: Te falta cobrar
                      : "bg-red-500/10 border border-red-500/20" // Caso: Debes entregar
                  }`}
                >
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-tighter text-gray-400">
                      {stats.diferenciaEfectivo >= 0
                        ? "La empresa te debe abonar:"
                        : "Debes entregar a la empresa:"}
                    </p>
                    <p
                      className={`text-xl font-black ${
                        stats.diferenciaEfectivo >= 0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {Math.abs(stats.diferenciaEfectivo).toFixed(2)} {currency}
                    </p>
                  </div>
                  <div className="text-2xl">
                    {stats.diferenciaEfectivo >= 0 ? "💰" : "📉"}
                  </div>
                </div>

                <p className="text-[10px] text-center text-gray-500 mt-4 italic px-2">
                  {stats.diferenciaEfectivo >= 0
                    ? `Quédate con todo tu efectivo (${stats.totalEfectivo.toFixed(2)}${currency}) y reclama la diferencia.`
                    : `De tus ${stats.totalEfectivo.toFixed(2)}${currency} en efectivo, quédate con tu parte y entrega el sobrante.`}
                </p>
              </div>
            )}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-white text-xl font-bold">Historial</h2>
              <ExportToCVSButton filter={filter} historyList={historyList} />
            </div>
            <div className="flex gap-2 px-4 py-2 overflow-x-auto bg-gray-900 no-scrollbar">
              {[
                { id: "today", label: "Hoy" },
                { id: "week", label: "Semana" },
                { id: "month", label: "Mes" },
                { id: "all", label: "Todo" },
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

            <div className="space-y-4 min-h-[400px]">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <SkeletonHistoryItem key={i} />
                ))
              ) : historyList.length === 0 ? (
                <div className="text-center text-gray-500 py-20 bg-gray-800/20 rounded-3xl border border-dashed border-gray-700">
                  <p>No hay viajes registrados</p>
                </div>
              ) : (
                <HistoryList
                  historyList={historyList}
                  handleDelete={handleDelete}
                  currency={currency}
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
      </Layout>
    </>
  )
}

export default History
