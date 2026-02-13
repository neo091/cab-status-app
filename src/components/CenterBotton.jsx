import { useStatus } from "../context/status/useStatus"

import ToggleButton from "./ToggleButton"

function CenterBoton() {
  const { status, busyStatus, freeStatus, payStatus } = useStatus()

  const iniciatViajeToggle = () => {
    if (status === "libre") {
      busyStatus()
      return
    }
    if (status === "ocupado") {
      payStatus()
      return
    }
    if (status === "descansando") {
      freeStatus()
      return
    }
  }

  // Definimos colores de fondo según el estado para dar feedback visual rápido
  const statusStyles = {
    libre: "from-green-500/5 to-transparent",
    ocupado: "from-red-500/5 to-transparent",
    descansando: "from-yellow-500/5 to-transparent",
    pagando: "from-blue-500/5 to-transparent",
  }

  return (
    <main
      className={`flex-1 z-0 flex flex-col bg-gray-900 relative overflow-hidden`}
    >
      {/* Luces de fondo dinámicas según estado */}
      <div
        className={`absolute inset-0 bg-gradient-to-b ${statusStyles[status] || ""} transition-colors duration-700`}
      />

      <section className="relative z-10 flex-1 flex flex-col items-center justify-center px-6">
        {/* Contenedor del Botón con un anillo decorativo */}
        <div className="relative p-2 rounded-full border border-gray-800 shadow-2xl bg-gray-900/50 backdrop-blur-sm">
          {/* Pulsación visual si está libre */}
          {status === "libre" && (
            <div className="absolute inset-0 rounded-full bg-green-500/20 animate-ping" />
          )}

          <div className="relative z-20">
            <ToggleButton onPress={iniciatViajeToggle} />
          </div>
        </div>

        {/* Texto de instrucción inferior */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-[10px] uppercase font-black tracking-[0.3em] mb-2">
            Sistema Netto v0.1
          </p>
          <div className="px-6 py-2 rounded-2xl bg-gray-800/30 border border-gray-800 inline-block">
            <p className="text-sm font-bold text-gray-400">
              {status === "libre" && "Pulsa para iniciar servicio"}
              {status === "ocupado" && "Pulsa para finalizar viaje"}
              {status === "descansando" && "Pulsa para volver a libre"}
              {status === "pagando" && "Procesando cobro..."}
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default CenterBoton
