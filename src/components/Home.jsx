import { Link } from "react-router-dom"
import { IconChart, IconClock, IconWhatsapp } from "../assets/Icons"
import PageTitle from "./PageTitle"

function HomeComponent() {
  return (
    <div className="bg-gray-900 min-h-screen text-white font-sans overflow-x-hidden">
      {/* --- HERO SECTION --- */}
      <header className="relative py-16 px-6 flex flex-col items-center text-center overflow-hidden">
        {/* Efecto de luz ambiental */}
        <div className="absolute top-0 w-72 h-72 bg-green-500/10 blur-[120px] rounded-full -z-10"></div>

        <div className="flex items-center gap-2 bg-gray-800 text-green-400 text-xs font-bold px-4 py-1.5 rounded-full border border-green-500/20 mb-6 uppercase tracking-widest">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          Netto: Tu liquidación bajo control
        </div>

        <PageTitle />

        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
          Tu parte del turno, <br />{" "}
          <span className="text-green-500 text-balance">
            clara y al instante.
          </span>
        </h2>

        <p className="text-gray-400 text-lg max-w-md mb-10 leading-relaxed">
          La app diseñada para que el taxista sepa exactamente cuánto dinero
          lleva en el bolsillo y cuánto debe liquidar.
        </p>

        <div className="flex flex-col w-full gap-4 px-4 sm:flex-row sm:justify-center">
          <Link
            to="/login"
            className="bg-green-500 text-black font-bold py-4 px-8 rounded-2xl text-lg hover:scale-105 transition-transform shadow-[0_0_20px_rgba(74,222,128,0.3)]"
          >
            Iniciar Jornada
          </Link>
          <button className="bg-gray-800 text-white font-bold py-4 px-8 rounded-2xl text-lg border border-gray-700">
            Ver Funciones
          </button>
        </div>
      </header>

      {/* --- FEATURE CARDS --- */}
      <section className="py-12 px-6 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <div className="bg-gray-800/50 p-8 rounded-3xl border border-gray-700 hover:border-green-500/50 transition-all group">
          <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-6 text-green-400 group-hover:scale-110 transition-transform">
            <IconClock />
          </div>
          <h3 className="text-xl font-bold mb-3">Liquidación Real</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Calculamos automáticamente tu 40%. Diferencia entre efectivo y
            tarjeta para que sepas qué entregar al final del día.
          </p>
        </div>

        <div className="bg-gray-800/50 p-8 rounded-3xl border border-gray-700 hover:border-blue-500/50 transition-all group">
          <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6 text-blue-400 group-hover:scale-110 transition-transform">
            <IconChart />
          </div>
          <h3 className="text-xl font-bold mb-3">Estadísticas Netas</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Visualiza tu rentabilidad real con gráficas de tus ingresos brutos
            frente a tu ganancia neta acumulada.
          </p>
        </div>

        <div className="bg-gray-800/50 p-8 rounded-3xl border border-gray-700 hover:border-purple-500/50 transition-all group">
          <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-6 text-purple-400 group-hover:scale-110 transition-transform">
            <IconWhatsapp />
          </div>
          <h3 className="text-xl font-bold mb-3">Reportes Pro</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Envía resúmenes detallados a tu jefe o socio por WhatsApp.
            Liquidación de caja transparente en un solo toque.
          </p>
        </div>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="py-20 bg-gray-900 border-y border-gray-800">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold mb-12">
            Control total en cada kilómetro
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <p className="text-4xl font-black text-green-500">40%</p>
              <p className="text-gray-500 text-[10px] uppercase tracking-widest mt-2 font-bold">
                Ganancia Automática
              </p>
            </div>
            <div>
              <p className="text-4xl font-black text-white">0.00</p>
              <p className="text-gray-500 text-[10px] uppercase tracking-widest mt-2 font-bold">
                Errores de caja
              </p>
            </div>
            <div>
              <p className="text-4xl font-black text-white">WA</p>
              <p className="text-gray-500 text-[10px] uppercase tracking-widest mt-2 font-bold">
                Reportes Integrados
              </p>
            </div>
            <div>
              <p className="text-4xl font-black text-white">SEC</p>
              <p className="text-gray-500 text-[10px] uppercase tracking-widest mt-2 font-bold">
                Datos en la nube
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER CTA --- */}
      <footer className="py-24 px-6 text-center">
        <h2 className="text-4xl font-bold mb-6">
          ¿Listo para conducir con Netto?
        </h2>
        <p className="text-gray-400 mb-10 max-w-lg mx-auto">
          La tecnología que tu taxi necesita para que tú solo te preocupes de
          conducir.
        </p>
        <Link
          to="/login"
          className="inline-block bg-white text-black font-bold py-4 px-12 rounded-2xl text-lg hover:bg-green-500 transition-colors"
        >
          Crear mi cuenta gratis
        </Link>
        <p className="mt-12 text-gray-600 text-sm font-medium uppercase tracking-[0.3em]">
          Netto &copy; 2026
        </p>
      </footer>
    </div>
  )
}

export default HomeComponent
