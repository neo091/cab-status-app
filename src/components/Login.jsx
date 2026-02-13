import { useState } from "react"
import { useNavigate, Link } from "react-router-dom" // Asumiendo que usas react-router
import Swal from "sweetalert2"
import { useAuth } from "../context/auth/useAuth"

export const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login } = useAuth()
  const navigate = useNavigate()

  const loginHandle = async (e) => {
    e.preventDefault()
    const newUsername = email.trim().toLowerCase()
    const newPassword = password.trim()

    if (!newUsername || !newPassword) {
      Swal.fire({
        icon: "error",
        title: "Cuidado!",
        text: "Email y contraseña son obligatorios",
        background: "#1f2937",
        color: "#fff",
        confirmButtonColor: "#4ade80",
      })
      return
    }

    try {
      const success = await login({ email: newUsername, password: newPassword })

      if (success) {
        navigate("/")
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error de acceso",
        text: "Verifica tu correo y contraseña.",
        background: "#1f2937",
        color: "#fff",
        confirmButtonColor: "#ef4444",
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center px-4 relative overflow-hidden">
      {/* Decoración de fondo para mantener el estilo de la Landing */}
      <div className="absolute top-0 w-72 h-72 bg-green-500/10 blur-[120px] rounded-full -z-0"></div>

      <div className="w-full max-w-md z-10">
        {/* Logo o Nombre de la App */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-white tracking-tighter">
            TAXI<span className="text-green-500">FLOW</span>
          </h1>
          <p className="text-gray-400 mt-2">Bienvenido de nuevo, compañero.</p>
        </div>

        <form onSubmit={loginHandle}>
          <div className="bg-gray-800 p-8 rounded-3xl shadow-2xl border border-gray-700 flex flex-col gap-6">
            <h3 className="text-xl font-bold text-white mb-2">
              Iniciar Sesión
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase ml-1">
                  Email
                </label>
                <input
                  className="bg-gray-900/50 border border-gray-700 p-4 rounded-2xl block w-full text-white mt-1 focus:border-green-500 outline-none transition-all"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase ml-1">
                  Contraseña
                </label>
                <input
                  className="bg-gray-900/50 border border-gray-700 p-4 rounded-2xl block w-full text-white mt-1 focus:border-green-500 outline-none transition-all"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submint"
              className="rounded-2xl p-4 bg-green-500 text-black font-bold text-lg hover:bg-green-400 transition-colors shadow-lg shadow-green-500/20 mt-2"
              onClick={loginHandle}
            >
              Entrar al Turno
            </button>

            <div className="text-center">
              <Link
                to="/"
                className="text-gray-500 text-sm hover:text-white transition-colors"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
          </div>
        </form>

        {/* Link para registro (opcional) */}
        <p className="text-center text-gray-500 mt-8 text-sm">
          ¿No tienes cuenta?{" "}
          <span className="text-green-500 font-bold cursor-pointer">
            Contacta con soporte
          </span>
        </p>
      </div>
    </div>
  )
}
