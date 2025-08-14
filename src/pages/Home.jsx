import { useEffect, useState } from "react"

import {
  addTrip,
  getDriverStatus,
  updateDriverStatus,
} from "../services/status"
import ToggleButton from "../components/ToggleButton"
import Footer from "../components/Footer"
import Header from "../components/Header"
import { useStatusContext } from "../context/Status"
import { useAbreviatedContext } from "../context/abreviated"
import Swal from "sweetalert2"

const Home = () => {
  const apiUri =
    import.meta.env.VITE_API_URI_LOCAL ||
    "https://cabstatus-backend-v2.vercel.app"

  const { status, busyStatus, freeStatus, restStatus } = useStatusContext()
  const { abreviated } = useAbreviatedContext()

  const [inicio, setInicio] = useState(localStorage.getItem("inicio") || null)
  const [fin, setFin] = useState(localStorage.getItem("fin") || null)
  const [showDialog, setShowDialog] = useState(false)
  const [monto, setMonto] = useState("")
  const [metodoPago, setMetodoPago] = useState("efectivo")

  const [telefono, setTelefono] = useState(
    localStorage.getItem("telefono") || "604994352"
  )
  const [showEditTelefono, setShowEditTelefono] = useState(false)
  const [telefonoTemp, setTelefonoTemp] = useState(telefono)

  const [nombreConductor, setNombreConductor] = useState(
    localStorage.getItem("nombreConductor") || ""
  )
  const [showEditNombre, setShowEditNombre] = useState(!nombreConductor) // si no hay nombre, mostrar modal para ingresar
  const [nombreTemp, setNombreTemp] = useState(nombreConductor)

  const newDriverStatus = async (
    statusValue,
    inicioValue = null,
    finValue = null,
    newDriverName = ""
  ) => {
    try {
      const response = await fetch(`${apiUri}/api/drivers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newDriverName,
          status: statusValue,
          inicio: inicioValue,
          fin: finValue,
        }),
      })
      if (!response.ok) throw new Error("Error actualizando estado")

      localStorage.setItem("status", statusValue)
    } catch (error) {
      console.error(error)
    }
  }

  const iniciatViajeToggle = () => {
    const now = new Date()

    if (status === "libre") {
      busyStatus()
      setInicio(now)
      setFin(null)
      updateDriverStatus({
        status: "ocupado",
        name: nombreConductor,
        inicio: now,
        fin: null,
      })

      localStorage.setItem("inicio", now)
      localStorage.removeItem("fin")
      return
    }
    if (status === "ocupado") {
      freeStatus()
      updateDriverStatus({
        status: "libre",
        name: nombreConductor,
        inicio: now,
        fin: now,
      })
      setShowDialog(true)
      return
    }

    if (status === "descansando") {
      freeStatus()
      // updateDriverStatus("libre", now, null)

      updateDriverStatus({
        status: "libre",
        name: nombreConductor,
        inicio: now,
        fin: now,
      })
      return
    }
  }
  const fixInicio = new Date(inicio)
  const fixFin = new Date(fin)

  const duracion =
    fixInicio && fin ? Math.floor((fixFin - fixInicio) / 1000) : 0
  const minutos = Math.floor(duracion / 60)
  const segundos = duracion % 60

  const guardarPago = async ({ conductor }) => {
    await addTrip({ conductor, monto, metodoPago, inicio })
      .then((result) => {
        const now = new Date()
        setFin(now)

        updateDriverStatus({
          status: "libre",
          name: nombreConductor,
          inicio: now,
          fin: now,
        })
        localStorage.setItem("status", "libre")
        localStorage.setItem("fin", now)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const guardarPagoWhatsApp = () => {
    const mensaje = abreviated
      ? `${monto}${metodoPago == "tarjeta" ? "t" : "e"}`
      : `✅ ${monto} € - ${metodoPago}`

    const link = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`

    window.open(link, "_blank") // Abre WhatsApp

    guardarPago({ conductor: nombreConductor })

    // Limpiar y cerrar diálogo
    setShowDialog(false)
    setMonto("")
    setMetodoPago("efectivo")
  }

  const cancelarPago = async () => {
    freeStatus()
    await updateDriverStatus({
      status: "libre",
      name: nombreConductor,
      inicio,
      fin: new Date(),
    })

    localStorage.setItem("fin", new Date())
    setFin(new Date())
    setShowDialog(false)
    setMonto("")
    setMetodoPago("efectivo")
  }

  const descansar = async () => {
    restStatus()

    await updateDriverStatus({
      status: "descansando",
      name: nombreConductor,
      inicio: new Date(),
      fin: new Date(),
    })

    setInicio(null)
    setFin(null)
    setShowDialog(false)
    setMonto("")
    setMetodoPago("efectivo")
  }

  useEffect(() => {
    if (nombreConductor !== "") {
      getDriverStatus({ name: nombreConductor }).then((result) => {
        if (result.body.status === "ocupado") {
          busyStatus()
        }

        if (result.body.status === "descansando") {
          restStatus()
        }
      })
    }
  }, [])

  return (
    <>
      <main className="bg-gray-900 min-h-dvh flex flex-col">
        <Header
          nombreConductor={nombreConductor}
          minutos={minutos}
          segundos={segundos}
          inicio={inicio}
          fin={fin}
        />

        <section className="bg-gray-800 flex-1 flex items-center justify-center">
          <ToggleButton iniciatViajeToggle={iniciatViajeToggle} />
        </section>

        <Footer descansar={descansar} />

        {showDialog && (
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/80 flex justify-center items-center">
            <div className="bg-white p-5 w-full mx-4 rounded">
              <h3 className="text-center text-2xl font-black">
                Finalizar viaje
              </h3>

              <label>Monto cobrado (€):</label>

              <input
                className="bg-gray-400 p-2 rounded block w-full"
                type="number"
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
                min="0"
                step="0.01"
              />

              <div className="flex gap-2 mt-5 mb-5">
                <button
                  onClick={() => setMetodoPago("efectivo")}
                  className={`rounded flex-1 p-3 ${
                    metodoPago === "efectivo"
                      ? "bg-green-500 text-green-900  font-black"
                      : "bg-gray-300"
                  }`}
                >
                  <i className="fa-solid fa-money-bill-wave"></i> Efectivo
                </button>
                <button
                  onClick={() => setMetodoPago("tarjeta")}
                  className={`rounded flex-1 p-3 ${
                    metodoPago === "tarjeta"
                      ? "bg-green-500 text-green-900  font-black"
                      : "bg-gray-300"
                  }`}
                >
                  <i className="fa-solid fa-credit-card"></i> Tarjeta
                </button>
              </div>

              <div className="flex gap-2 justify-between">
                <button
                  onClick={cancelarPago}
                  className="rounded p-3 bg-red-400"
                >
                  Cancelar
                </button>

                <button
                  className="rounded p-3 bg-green-400"
                  onClick={guardarPagoWhatsApp}
                >
                  Enviar por WhatsApp
                </button>
              </div>
            </div>
          </div>
        )}

        {showEditNombre && (
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/80 flex justify-center items-center">
            <div className="bg-white p-5 w-full mx-4 rounded">
              <input
                className="bg-gray-200 p-4 rounded block w-full mb-8 text-black"
                type="text"
                value={nombreTemp}
                onChange={(e) => setNombreTemp(e.target.value)}
                placeholder="Tu nombre"
              />
              <div style={{ marginTop: "10px" }}>
                <button
                  className="rounded p-4 bg-green-400 w-full"
                  onClick={() => {
                    if (!nombreTemp.trim()) {
                      alert("El nombre es obligatorio")
                      return
                    }
                    setNombreConductor(nombreTemp.trim())
                    localStorage.setItem("nombreConductor", nombreTemp.trim())
                    setShowEditNombre(false)
                    newDriverStatus(
                      "libre",
                      new Date(),
                      new Date(),
                      nombreTemp.trim()
                    )
                  }}
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        )}

        {showEditTelefono && (
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/80 flex justify-center items-center">
            <div className="bg-white p-5 w-full mx-4 rounded">
              <h3>Editar número de WhatsApp</h3>
              <input
                type="tel"
                value={telefonoTemp}
                onChange={(e) => setTelefonoTemp(e.target.value)}
                placeholder="Ej: 34600000000"
              />
              <div style={{ marginTop: "10px" }}>
                <button
                  onClick={() => {
                    const limpio = telefonoTemp.replace(/\D/g, "")
                    if (!limpio) {
                      alert("Número inválido")
                      return
                    }
                    setTelefono(limpio)
                    localStorage.setItem("telefono", limpio)
                    setShowEditTelefono(false)
                  }}
                >
                  Guardar
                </button>
                <button
                  onClick={() => setShowEditTelefono(false)}
                  style={{ marginLeft: "10px" }}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  )
}

export default Home
