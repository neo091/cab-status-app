import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const Conductor = () => {
  const { conductor } = useParams()
  const [selectedDriver, setSelectedDriver] = useState(conductor || null)
  const [viajes, setViajes] = useState([])
  const [totalEfectivo, setTotalEfectivo] = useState(0)

  const fetchViajes = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URI}/api/trips/${conductor}`
    )
    const data = await res.json()
    setViajes(data)
    setSelectedDriver(conductor)
  }

  useEffect(() => {
    fetchViajes()
  }, [])

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.title}>
        Historial de <span style={{ color: "#00bfff" }}>{conductor}</span>
      </h2>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Inicio</th>
              <th style={styles.th}>Fin</th>
              <th style={styles.th}>Duración</th>
              <th style={styles.th}>Monto</th>
              <th style={styles.th}>Método</th>
            </tr>
          </thead>
          <tbody>
            {viajes.map((v) => (
              <tr key={v._id}>
                <td style={styles.td}>
                  {new Date(v.inicio).toLocaleTimeString()}
                </td>
                <td style={styles.td}>
                  {new Date(v.fin).toLocaleTimeString()}
                </td>
                <td style={styles.td}>
                  {v.inicio && v.fin
                    ? (() => {
                        const diffMs = new Date(v.fin) - new Date(v.inicio)
                        const totalSeconds = Math.floor(diffMs / 1000)
                        const minutes = Math.floor(totalSeconds / 60)
                        const seconds = totalSeconds % 60

                        if (minutes > 0) {
                          return `${minutes} min ${seconds} s`
                        } else {
                          return `${seconds} s`
                        }
                      })()
                    : "N/A"}
                </td>

                <td style={styles.td}>€{v.monto}</td>
                <td style={styles.td}>{v.metodoPago}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const styles = {
  wrapper: {
    maxWidth: "100%",
    padding: "1rem",
    boxSizing: "border-box",
  },
  title: {
    fontSize: "1.4rem",
    marginBottom: "1rem",
    textAlign: "center",
    color: "#ffffff",
  },
  tableContainer: {
    overflowX: "auto",
    backgroundColor: "#2f2f2f",
    borderRadius: "8px",
    border: "1px solid #444",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.4)",
  },
  table: {
    minWidth: "280px", // importante para que no colapse en móviles
    maxWidth: "100%",
    borderCollapse: "collapse",
    width: "100%",
  },
  th: {
    backgroundColor: "#3a3a3a",
    color: "#ffffff",
    textAlign: "left",
    padding: "12px",
    fontWeight: "bold",
    fontSize: "0.85rem",
    whiteSpace: "nowrap",
  },
  td: {
    padding: "10px 12px",
    borderTop: "1px solid #444",
    fontSize: "0.85rem",
    color: "#dddddd",
    whiteSpace: "nowrap",
  },
}

export default Conductor
