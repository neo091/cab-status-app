import { useEffect, useState } from "react"

import { logoutAdmin } from "../services/auth"
import { Link, useNavigate } from "react-router-dom"

export default function AdminDashboard() {
  const [drivers, setDrivers] = useState([])
  const navigate = useNavigate()

  const fetchDrivers = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URI}/api/drivers`)
      if (!res.ok) throw new Error("Error al cargar conductores")
      const data = await res.json()
      setDrivers(data)
      // console.log(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchDrivers()
    const interval = setInterval(fetchDrivers, 5000) // actualiza cada 5 segundos
    return () => clearInterval(interval)
  }, [])

  // Calcula duración si está ocupado
  const calcularDuracion = (inicio) => {
    if (!inicio) return "-"
    const diffMs = new Date() - new Date(inicio)
    const diffMin = Math.floor(diffMs / 60000)
    return `${diffMin} min`
  }

  const deleteDriverHandle = async (driver) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URI}/api/drivers/${driver}`,
        {
          method: "DELETE",
        }
      )
      if (!res.ok) throw new Error("Error al cargar conductores")
      const data = await res.json()
      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleLogout = () => {
    logoutAdmin()
    navigate("/")
  }

  return (
    <>
      <h1>Dashboard</h1>

      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>
              Conductor
            </th>
            <th style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>
              Estado
            </th>
            <th style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>
              Duración
            </th>
            <th style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>
              Último monto
            </th>
            <th style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>
              Acción
            </th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((d) => {
            const isOcupado = d.status === "ocupado"
            const isDescansando = d.status === "descansando"
            return (
              <tr key={d._id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "8px" }}>
                  <Link to={`${d.name}`}>{d.name}</Link>
                </td>
                <td
                  style={{
                    padding: "8px",
                    color: isDescansando ? "gray" : isOcupado ? "red" : "green",
                  }}
                >
                  {isDescansando
                    ? "😴 Descansando"
                    : isOcupado
                    ? "🔴 Ocupado"
                    : "🟢 Libre"}
                </td>
                <td style={{ padding: "8px" }}>
                  {isOcupado ? calcularDuracion(d.inicio) : "—"}
                </td>
                <td style={{ padding: "8px" }}>
                  {/* Aquí debería ir el último monto, si tienes esa info */}
                  {/* Por ahora ejemplo fijo */}
                  {d.lastViaje
                    ? `€${d.lastViaje.monto} ${d.lastViaje.metodoPago}`
                    : "—"}
                </td>
                <td>
                  <button onClick={() => deleteDriverHandle(d.name)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      <button
        onClick={handleLogout}
        style={{
          marginTop: "20px",
        }}
      >
        Cerrar sesión
      </button>
    </>
  )
}
