import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useConfig } from "../context/config/useConfig"
import { useAuth } from "../context/auth/useAuth"
import {
  IconChevronLeft,
  IconClock,
  IconCog,
  IconWhatsapp,
} from "../assets/Icons"

const Config = () => {
  const {
    phone,
    updatePhone,
    whatsAppReport,
    togglewhatsAppReport,
    toggleAbreviated,
    abreviated,
  } = useConfig()
  const { logout } = useAuth()
  const [editPhone, setEditPhone] = useState(false)

  const savePhoneHandler = (e) => {
    e.preventDefault()
    setEditPhone(false)
    // Aquí podrías añadir un pequeño toast de "Guardado"
  }

  return (
    <main className="bg-gray-900 min-h-screen text-white p-6 pb-24">
      {/* Header Superior */}
      <div className="flex items-center gap-4 mb-10">
        <Link to="/" className="p-2 bg-gray-800 rounded-full hover:bg-gray-700">
          <IconChevronLeft size={8} />
        </Link>
        <h1 className="text-2xl font-bold">Ajustes</h1>
      </div>

      <div className="max-w-md mx-auto flex flex-col gap-6">
        {/* SECCIÓN WHATSAPP */}
        <section className="bg-gray-800/50 border border-gray-700 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="text-green-500">
                <IconWhatsapp size={6} />
              </div>
              <div>
                <h2 className="font-bold text-lg">Reportes por WhatsApp</h2>
                <p className="text-gray-500 text-xs text-balance">
                  Número donde se enviarán los detalles de cada viaje.
                </p>
              </div>
            </div>
            {/* TOGGLE SWITCH */}
            <button
              onClick={togglewhatsAppReport}
              className={`w-12 h-6 rounded-full transition-colors relative ${whatsAppReport ? "bg-green-500" : "bg-gray-700"}`}
            >
              <div
                className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${whatsAppReport ? "left-7" : "left-1"}`}
              />
            </button>
          </div>

          {/* {whatsAppReport && (
            <div className="pt-4 border-t border-gray-700/50">
              {editPhone ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    setEditPhone(false)
                  }}
                  className="flex gap-2"
                >
                  <input
                    type="tel"
                    autoFocus
                    onChange={(e) => updatePhone({ phone: e.target.value })}
                    value={phone}
                    className="flex-1 p-3 bg-gray-900 border border-green-500/30 rounded-xl text-center font-mono"
                  />
                  <button
                    type="submit"
                    className="bg-green-500 text-black px-4 rounded-xl font-bold"
                  >
                    OK
                  </button>
                </form>
              ) : (
                <div className="flex justify-between items-center">
                  <p className="text-xl font-mono text-gray-300">{phone}</p>
                  <button
                    onClick={() => setEditPhone(true)}
                    className="text-green-500 text-sm font-bold"
                  >
                    Editar
                  </button>
                </div>
              )}
            </div>
          )} */}

          {whatsAppReport && (
            <>
              {editPhone ? (
                <form
                  onSubmit={savePhoneHandler}
                  className="flex flex-col gap-4"
                >
                  <input
                    type="tel"
                    autoFocus
                    onChange={(e) => updatePhone({ phone: e.target.value })}
                    value={phone}
                    className="w-full p-4 bg-gray-900 border border-green-500/50 text-white text-center text-xl rounded-2xl outline-none focus:ring-2 ring-green-500/20 transition-all"
                    placeholder="Ej: 34600000000"
                  />
                  <button
                    type="submit"
                    className="w-full py-4 bg-green-500 text-black font-bold rounded-2xl hover:bg-green-400 transition-colors"
                  >
                    Guardar Número
                  </button>
                </form>
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <p className="text-3xl font-mono tracking-wider text-green-400">
                    {phone || "No configurado"}
                  </p>
                  <button
                    onClick={() => setEditPhone(true)}
                    className="text-sm font-bold text-gray-400 border border-gray-700 px-6 py-2 rounded-full hover:bg-gray-700 transition-all"
                  >
                    Cambiar número
                  </button>
                </div>
              )}
            </>
          )}
        </section>

        {/* SECCIÓN: PREFERENCIAS VISUALES */}

        {whatsAppReport && (
          <section className="bg-gray-800/50 border border-gray-700 rounded-3xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <IconClock size={6} className="text-blue-400" />
                <div>
                  <span className="font-bold block">Modo Abreviado</span>
                  <p className="text-[10px] text-gray-500 uppercase tracking-tighter">
                    Interfaz simplificada
                  </p>
                </div>
              </div>
              <button
                onClick={toggleAbreviated}
                className={`w-12 h-6 rounded-full transition-colors relative ${abreviated ? "bg-blue-500" : "bg-gray-700"}`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${abreviated ? "left-7" : "left-1"}`}
                />
              </button>
            </div>
          </section>
        )}

        {/* SECCIÓN MANTENIMIENTO (Futuro) */}
        <section className="bg-gray-800/50 border border-gray-700 rounded-3xl p-6 opacity-50">
          <div className="flex items-center gap-3">
            <IconCog size={6} className="text-gray-500" />
            <p className="font-bold text-gray-500 uppercase text-xs tracking-widest">
              Próximamente
            </p>
          </div>
          <p className="text-gray-600 text-sm mt-2 font-medium">
            Gestión de gastos de combustible y metas diarias.
          </p>
        </section>

        {/* BOTÓN CERRAR SESIÓN */}
        <button
          onClick={() => logout()}
          className="mt-4 py-4 bg-red-500/10 border border-red-500/20 text-red-500 font-bold rounded-2xl hover:bg-red-500/20 transition-all"
        >
          Cerrar Sesión del Turno
        </button>
      </div>
    </main>
  )
}

export default Config
