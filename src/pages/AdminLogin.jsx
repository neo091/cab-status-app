import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { loginAdmin } from "../services/auth"

export default function AdminLogin() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleLogin = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URI}/api/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      const data = await res.json()
      console.log(data)

      if (data.success) {
        loginAdmin("fake_admin")
        navigate("/admin/dashboard")
      }
    } else {
      setError("Contraseña incorrecta")
    }
  }

  return (
    <div
      className="login-box"
      style={{
        marginTop: "20px",
        display: "inline-block",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <h2 style={{ textAlign: "center", width: "100%" }}>Admin Login</h2>
      <input
        style={{
          padding: "10px",
          width: "100%",
          boxSizing: "border-box",
          fontSize: "24px",
        }}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña"
      />
      <br />

      <button
        onClick={handleLogin}
        style={{
          marginTop: "20px",
          display: "inline-block",
          width: "100%",
          boxSizing: "border-box",
          fontSize: "24px",
        }}
      >
        Iniciar sesión
      </button>
      <br />
      <button
        onClick={() => {
          navigate("/")
        }}
        style={{
          marginTop: "20px",
          display: "inline-block",
          background: "white",
          color: "black",
        }}
      >
        Home
      </button>
      {error && <p className="error">{error}</p>}
    </div>
  )
}
