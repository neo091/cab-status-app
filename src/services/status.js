import axios from "axios"

const apiUri =
  import.meta.env.VITE_API_URI_LOCAL ||
  "https://cabstatus-backend-v2.vercel.app"

// export async function addTrip({ conductor, monto, metodoPago, inicio }) {
//   try {
//     const response = await fetch(`${apiUri}/api/trips`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         conductor: conductor,
//         inicio: new Date(inicio),
//         fin: new Date(),
//         monto: parseFloat(monto),
//         metodoPago,
//       }),
//     })

//     if (!response.ok) {
//       throw new Error("Error al guardar el viaje")
//     }

//     const data = await response.json()
//     return data
//   } catch (error) {
//     console.error("Error:", error)
//     return { error: true }
//   }
// }

export async function updateDriverStatus({ status, name, inicio, fin }) {
  try {
    const response = await fetch(`${apiUri}/api/drivers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        status,
        inicio,
        fin,
      }),
    })
    if (!response.ok) throw new Error("Error actualizando estado")

    return { error: false }
  } catch (error) {
    return { error: true }
  }
}

export async function getDriverStatus({ name }) {
  try {
    const response = await fetch(`${apiUri}/api/drivers/${name}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
    if (!response.ok) throw new Error("Error actualizando estado")

    const body = await response.json()

    return { error: false, body }
  } catch (error) {
    return { error: true }
  }
}

export const updateStatus = async ({ token, status }) => {
  return await axios.patch(
    `${apiUri}/api/driver`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
}
