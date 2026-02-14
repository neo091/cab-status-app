import { supabase } from "./supabase"

/**
 * Obtiene los registros de actividad y calcula las métricas de liquidación.
 * @param userId - ID del conductor
 * @param page - Página actual
 * @param itemsPerPage - Cantidad de registros por página
 * @param dateLimit - ISO String para filtrar desde una fecha específica
 */

export const fetchHistoryData = async (
  userId: string,
  page: number,
  itemsPerPage: number,
  dateLimit: string | null,
) => {
  const from = page * itemsPerPage
  const to = from + itemsPerPage - 1

  // 1. Consulta para la lista paginada
  let query = supabase
    .from("history")
    .select("*", { count: "exact" })
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .range(from, to)

  if (dateLimit) query = query.gte("created_at", dateLimit)

  // 2. Consulta para los totales (ligera)
  let totalQuery = supabase
    .from("history")
    .select("amount, paymethod")
    .eq("user_id", userId)

  if (dateLimit) totalQuery = totalQuery.gte("created_at", dateLimit)

  // Ejecutamos ambas en paralelo para máxima velocidad
  const [resList, resTotal] = await Promise.all([query, totalQuery])

  if (resList.error) throw resList.error
  if (resTotal.error) throw resTotal.error

  // --- LÓGICA DE NEGOCIO (NETTO) ---
  const data = resTotal.data || []

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

  const gananciaNeta = (bruto * 40) / 100
  const diferenciaEfectivo = gananciaNeta - efectivo

  return {
    history: resList.data,
    count: resList.count,
    stats: {
      totalBruto: bruto,
      totalTarjeta: tarjeta,
      totalEfectivo: efectivo,
      gananciaNeta,
      diferenciaEfectivo,
    },
  }
}

export const deleteHistoryRecord = async (recordId: string, userId: string) => {
  const { error } = await supabase
    .from("history")
    .delete()
    .eq("id", recordId)
    .eq("user_id", userId)
  if (error) throw error
}
