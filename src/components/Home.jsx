import { Link } from "react-router-dom"
import { IconChart, IconClock, IconWhatsapp } from "../assets/Icons"

function HomeComponent() {
  return (
    <div className="bg-gray-900 min-h-screen text-white font-sans overflow-x-hidden">
      {/* --- HERO SECTION --- */}
      <header className="relative py-16 px-6 flex flex-col items-center text-center overflow-hidden">
        <div className="absolute top-0 w-72 h-72 bg-green-500/10 blur-[120px] rounded-full -z-10"></div>

        <span className="bg-gray-800 text-green-400 text-xs font-bold px-4 py-1.5 rounded-full border border-green-500/20 mb-6 uppercase tracking-widest">
          🚀 Optimizado para el sector del taxi
        </span>

        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
          Toma el control de <br />{" "}
          <span className="text-green-500">tu recaudación.</span>
        </h1>

        <p className="text-gray-400 text-lg max-w-md mb-10 leading-relaxed">
          La herramienta definitiva para taxistas profesionales. Gestiona tus
          viajes, visualiza tus ganancias y olvida el papel.
        </p>

        <div className="flex flex-col w-full gap-4 px-4 sm:flex-row sm:justify-center">
          <Link
            to="/login"
            className="bg-green-500 text-black font-bold py-4 px-8 rounded-2xl text-lg hover:scale-105 transition-transform shadow-[0_0_20px_rgba(74,222,128,0.3)]"
          >
            Empezar Gratis
          </Link>
          <button className="bg-gray-800 text-white font-bold py-4 px-8 rounded-2xl text-lg border border-gray-700">
            Ver Demo
          </button>
        </div>
      </header>

      {/* --- FEATURE CARDS --- */}
      <section className="py-12 px-6 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <div className="bg-gray-800/50 p-8 rounded-3xl border border-gray-700 hover:border-green-500/50 transition-all">
          <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-6 text-green-400">
            <IconClock />
          </div>
          <h3 className="text-xl font-bold mb-3">Taxímetro Inteligente</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Cronómetro persistente que no se detiene aunque cierres la app.
            Control total sobre cada minuto de tu jornada.
          </p>
        </div>

        <div className="bg-gray-800/50 p-8 rounded-3xl border border-gray-700 hover:border-green-500/50 transition-all">
          <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6 text-blue-400">
            <IconChart />
          </div>
          <h3 className="text-xl font-bold mb-3">Estadísticas Reales</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Gráficas detalladas de tus ingresos diarios, semanales y mensuales.
            Descubre cuándo eres más rentable.
          </p>
        </div>

        <div className="bg-gray-800/50 p-8 rounded-3xl border border-gray-700 hover:border-green-500/50 transition-all">
          <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-6 text-purple-400">
            <IconWhatsapp />
          </div>
          <h3 className="text-xl font-bold mb-3">Reportes Instantáneos</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Envía recibos y reportes de facturación por WhatsApp con un solo
            toque. Sin líos de tickets perdidos.
          </p>
        </div>
      </section>

      {/* --- SOCIAL PROOF / STATS --- */}
      <section className="py-20 bg-gray-900 border-y border-gray-800">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold mb-12">
            Diseñado por y para taxistas
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <p className="text-4xl font-black text-green-500">+100%</p>
              <p className="text-gray-500 text-xs uppercase tracking-widest mt-2">
                Control
              </p>
            </div>
            <div>
              <p className="text-4xl font-black text-white">0€</p>
              <p className="text-gray-500 text-xs uppercase tracking-widest mt-2">
                Coste Oculto
              </p>
            </div>
            <div>
              <p className="text-4xl font-black text-white">24/7</p>
              <p className="text-gray-500 text-xs uppercase tracking-widest mt-2">
                Soporte
              </p>
            </div>
            <div>
              <p className="text-4xl font-black text-white">Cloud</p>
              <p className="text-gray-500 text-xs uppercase tracking-widest mt-2">
                Seguridad
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER CTA --- */}
      <footer className="py-20 px-6 text-center">
        <h2 className="text-4xl font-bold mb-6">
          ¿Listo para modernizar tu taxi?
        </h2>
        <p className="text-gray-400 mb-10">
          Únete a la nueva era de la facturación inteligente.
        </p>
        <Link
          to="/login"
          className="inline-block bg-white text-black font-bold py-4 px-12 rounded-2xl text-lg"
        >
          Empezar Ahora
        </Link>
      </footer>
    </div>
  )
}

export default HomeComponent
