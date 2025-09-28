import { useEffect, useState } from "react"
import ToggleButton from "../components/ToggleButton"
import Footer from "../components/Footer"
import Header from "../components/Header"
import { useStatusContext } from "../context/Status"
import { useAbreviatedContext } from "../context/abreviated"
import { useSessionContext } from "../context/Session.context"
import { Login } from "../components/Login"
import { useConfigContext } from "../context/Config"
import { updateStatus } from "../services/status"
import { addTrip } from "../services/trip.service"
import { IconDelete } from "../assets/Icons"

const Home = () => {
  const { status, busyStatus, freeStatus, restStatus } = useStatusContext()
  const { abreviated } = useAbreviatedContext()
  const { user, loading, token } = useSessionContext()
  const { telefono } = useConfigContext()

  const [startTime, setStartTime] = useState(
    localStorage.getItem("startTime") || null
  )

  const [duration, setDuration] = useState(null)

  const [displayTime, setDisplayTime] = useState("0:00")

  const [showDialog, setShowDialog] = useState(false)
  const [monto, setMonto] = useState("")
  const [metodoPago, setMetodoPago] = useState("efectivo")

  // 🔹 Función para calcular la duración
  const getDuration = () => {
    if (!startTime) return "0:00"

    const from = new Date(startTime)
    const to = new Date()

    const duracion = Math.floor((to - from) / 1000)
    const minutos = Math.floor(duracion / 60)
    const segundos = duracion % 60

    return `${minutos.toString().padStart(2, "0")}:${segundos
      .toString()
      .padStart(2, "0")}`
  }

  // 🔹 Inicia el contador y guarda el inicio en localStorage
  const startCounter = () => {
    const now = new Date()
    now.setMilliseconds(0) // 👈 evita saltar a 2 o 3 seg
    setStartTime(now.toISOString())
    localStorage.setItem("startTime", now.toISOString())
  }

  // 🔹 Detiene y limpia el contador
  const stopCounter = () => {
    setStartTime(null)
    localStorage.removeItem("startTime")
    setDisplayTime("0:00")
  }

  const iniciatViajeToggle = () => {
    const now = new Date()

    if (status === "libre") {
      busyStatus()
      setStartTime(now)
      updateStatus({
        token,
        status: "BUSY",
      })

      localStorage.setItem("startTime", now)
      startCounter()
      return
    }
    if (status === "ocupado") {
      freeStatus()
      updateStatus({
        status: "FREE",
        token,
      })
      setShowDialog(true)
      setDuration(getDuration())
      stopCounter()
      return
    }
    if (status === "descansando") {
      freeStatus()

      updateStatus({
        status: "FREE",
        token,
      })
      return
    }
  }

  const guardarPago = async () => {
    freeStatus()

    updateStatus({
      status: "FREE",
      token,
    })

    const data = {
      duration: duration,
      amount: parseFloat(monto),
      payMethod: metodoPago === "efectivo" ? "CASH" : "CARD",
    }

    await addTrip({ data, token })
  }

  const guardarPagoWhatsApp = () => {
    if (monto.length === 0) return

    const mensaje = abreviated
      ? `${monto}${metodoPago == "tarjeta" ? "t" : "e"}`
      : `✅ ${monto} € - ${metodoPago}`

    const link = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`

    window.open(link, "_blank") // Abre WhatsApp

    guardarPago()

    // Limpiar y cerrar diálogo
    setShowDialog(false)
    setMonto("")
    setMetodoPago("efectivo")
  }

  const cancelarPago = async () => {
    freeStatus()

    updateStatus({
      status: "FREE",
      token,
    })

    setStartTime(null)
    setShowDialog(false)
    setMonto("")
    setMetodoPago("efectivo")
  }
  const setAmountHandle = (e) => setMonto(monto + e.target.innerText)
  const deleteAmount = () => {
    if (monto.length !== 0) {
      const newTexto = monto.slice(0, monto.length - 1)
      setMonto(newTexto)
      console.log(newTexto)
    }
  }

  const descansar = async () => {
    restStatus()

    await updateStatus({
      status: "DISCONNECTED",
      token,
    })

    setStartTime(null)
    setShowDialog(false)
    setMonto("")
    setMetodoPago("efectivo")
  }

  useEffect(() => {
    if (!startTime) return

    const interval = setInterval(() => {
      setDisplayTime(getDuration())
    }, 1000)

    // primer render inmediato
    setDisplayTime(getDuration())

    return () => clearInterval(interval)
  }, [startTime])

  if (loading) return

  if (!user) return <Login />

  return (
    <>
      <main className="bg-gray-900 min-h-dvh flex flex-col">
        <Header timer={displayTime} />

        <section className="bg-gray-800 flex-1 flex items-center justify-center">
          <ToggleButton iniciatViajeToggle={iniciatViajeToggle} />
        </section>

        <Footer descansar={descansar} />

        {showDialog && (
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/80 flex justify-center items-center">
            <div className="bg-white p-5  max-w-3xl mx-4 rounded">
              <h3 className="text-center text-2xl font-black">
                Finalizar viaje
              </h3>

              <div className="w-full bg-gray-900 h-10 text-white flex items-center justify-center">
                <p className="text-white font-bold font-mono">{monto}</p>
              </div>

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

              <div className="grid grid-cols-3 gap-2  mb-5 ">
                <button
                  onClick={setAmountHandle}
                  className="bg-gray-700 text-white p-3 font-bold rounded-full"
                >
                  7
                </button>
                <button
                  onClick={setAmountHandle}
                  className="bg-gray-700 text-white p-3 font-bold rounded-full"
                >
                  8
                </button>
                <button
                  onClick={setAmountHandle}
                  className="bg-gray-700 text-white p-3 font-bold rounded-full"
                >
                  9
                </button>
                <button
                  onClick={setAmountHandle}
                  className="bg-gray-700 text-white p-3 font-bold rounded-full"
                >
                  4
                </button>
                <button
                  onClick={setAmountHandle}
                  className="bg-gray-700 text-white p-3 font-bold rounded-full"
                >
                  5
                </button>
                <button
                  onClick={setAmountHandle}
                  className="bg-gray-700 text-white p-3 font-bold rounded-full"
                >
                  6
                </button>
                <button
                  onClick={setAmountHandle}
                  className="bg-gray-700 text-white p-3 font-bold rounded-full"
                >
                  1
                </button>
                <button
                  onClick={setAmountHandle}
                  className="bg-gray-700 text-white p-3 font-bold rounded-full"
                >
                  2
                </button>
                <button
                  onClick={setAmountHandle}
                  className="bg-gray-700 text-white p-3 font-bold rounded-full"
                >
                  3
                </button>
                <button
                  onClick={setAmountHandle}
                  className="bg-gray-700 text-white p-3 font-bold rounded-full"
                >
                  0
                </button>
                <button
                  onClick={setAmountHandle}
                  className="bg-gray-700 text-white p-3 font-bold rounded-full"
                >
                  .
                </button>
                <button
                  onClick={deleteAmount}
                  className="bg-gray-700 text-white p-3 font-bold rounded-full text-center flex items-center justify-center"
                >
                  <IconDelete />
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
      </main>
    </>
  )
}

export default Home
