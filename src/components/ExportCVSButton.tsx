type filter = "all" | "today" | "week" | "month"
type HistoryItem = {
  created_at: string
  amount: string
  paymethod: string
  duration: string
}
interface ExportButtonProps {
  historyList: HistoryItem[]
  filter: filter
}

function ExportToCVSButton({ historyList, filter }: ExportButtonProps) {
  const exportToCSV = () => {
    if (historyList.length === 0) return

    // Cabeceras
    const headers = ["Fecha,Monto,Duracion,Metodo\n"]

    // Filas (usamos todos los datos actuales o podrías hacer un fetch de TODO el historial)
    const rows = historyList.map((h: HistoryItem) => {
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

  return (
    <button
      onClick={exportToCSV}
      className="text-[10px] bg-gray-700 text-gray-300 px-3 py-1 rounded hover:bg-gray-600 border border-gray-600"
    >
      📥 Exportar CSV
    </button>
  )
}

export default ExportToCVSButton
