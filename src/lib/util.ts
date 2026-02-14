type Trip = {
  created_at: string
  amount: string
}

// Definimos la forma del objeto que usaremos para agrupar
interface GroupedData {
  [key: string]: { name: string; total: number; rawDate: Date }
}

export const prepareChartData = (list: Trip[]) => {
  if (!list || list.length === 0) return []

  const grouped = list.reduce((acc: GroupedData, trip) => {
    const dateObj = new Date(trip.created_at)

    // Usamos una clave que sea fácil de ordenar (YYYY-MM-DD)
    const key = dateObj.toISOString().split("T")[0]

    const label = dateObj.toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
    })

    if (!acc[key]) {
      acc[key] = {
        name: label,
        total: 0,
        rawDate: dateObj, // Guardamos la fecha real para ordenar bien al final
      }
    }

    acc[key].total += parseFloat(trip.amount)
    return acc
  }, {})

  // Convertimos a array y ordenamos cronológicamente (de más viejo a más nuevo para la gráfica)
  return Object.values(grouped).sort(
    (a, b) => a.rawDate.getTime() - b.rawDate.getTime(),
  )
}

export const getDateRange = (filterType: string) => {
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
export const calculateSettlement = (
  amount: number,
  paymethod: string,
  percentage: number,
) => {
  const bruto = amount
  const neto = (bruto * percentage) / 100
  const efectivo = paymethod.toUpperCase() === "CASH" ? bruto : 0
  return neto - efectivo
}
