import { useState } from "react"
import { IconDelete } from "../assets/Icons"
import { useConfig } from "../context/config/useConfig"
import { useStatus } from "../context/status/useStatus"
import { supabase } from "../lib/supabase"
import { useAuth } from "../context/auth/useAuth"

function FinishTripDoalog() {
  const { phone, abreviated, whatsAppReport, currency } = useConfig()
  const { status, freeStatus } = useStatus()
  const [monto, setMonto] = useState("")
  const [metodoPago, setMetodoPago] = useState("efectivo")
  const { user } = useAuth()

  const saveData = async (dataSave) => {
    const { data, error } = await supabase
      .from("history")
      .insert([dataSave])
      .select()

    if (error) return new Error(error.message)

    return { data }
  }

  const guardarPago = () => {
    const data = {
      user_id: user.id,
      duration: localStorage.getItem("duration"),
      amount: parseFloat(monto).toString(),
      paymethod: metodoPago === "efectivo" ? "CASH" : "CARD",
    }
    try {
      saveData(data)
    } catch (error) {
      console.log(error)
    } finally {
      dissmiss()
    }
  }

  const guardarPagoWhatsApp = () => {
    if (!monto || parseFloat(monto) === 0) return
    guardarPago()

    if (whatsAppReport) {
      const letraPago = metodoPago === "tarjeta" ? "t" : "e"

      const mensaje = abreviated
        ? `✅ ${monto}${letraPago}`
        : `✅ Recaudación: ${monto}${currency} [${metodoPago.toUpperCase()}]`
      const url = `https://wa.me/${phone}?text=${encodeURIComponent(mensaje)}`
      window.open(url, "_blank")
    }
  }

  const dissmiss = () => {
    setMonto("")
    setMetodoPago("efectivo")
    freeStatus()
  }
  const setAmountHandle = (e) => setMonto(monto + e.target.innerText)
  const deleteAmount = () => {
    if (monto.length !== 0) {
      const newTexto = monto.slice(0, monto.length - 1)
      setMonto(newTexto)
    }
  }

  return (
    <div
      className={`absolute top-0 left-0 fade-in right-0 bottom-0 bg-black/80 flex justify-center items-center ${status === "pagando" ? "" : " hidden "}`}
    >
      <div className="bg-white p-5 w-sm mx-4 rounded">
        <h3 className="text-center text-2xl font-black mb-2">
          Finalizar viaje
        </h3>

        <div className="w-full bg-gray-900 text-white flex items-center justify-center rounded-full h-12">
          <p className="text-white font-bold font-mono">
            {monto || 0} <span className="text-green-500 ml-2">{currency}</span>
          </p>
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

        <div className="grid grid-cols-3 mb-2 gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((n) => (
            <button
              key={n}
              onClick={setAmountHandle}
              className="bg-gray-700 text-white p-3 font-bold rounded-full"
            >
              {n}
            </button>
          ))}

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
          <button onClick={dissmiss} className="rounded-full p-3 bg-red-400">
            Cancelar
          </button>

          <button
            disabled={monto.length === 0}
            className="rounded-full p-3 bg-green-400 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={guardarPagoWhatsApp}
          >
            {whatsAppReport ? "Enviar por WhatsApp" : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default FinishTripDoalog
