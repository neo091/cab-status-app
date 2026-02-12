import { useState } from "react"

import Swal from "sweetalert2"
import { useAuth } from "../context/auth/useAuth"

export const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login } = useAuth()

  const loginHandle = () => {
    const newUsername = email.trim().toLocaleLowerCase()
    const newPassword = password.trim().toLocaleLowerCase()

    if (!newUsername && newUsername == "") {
      console.log("username is empty")
      return
    }

    if (!newUsername || !newPassword) {
      Swal.fire("Cuidado!", "Usuario y contraseña son obligatorios")
      return
    }

    login({ email: newUsername, password: newPassword })
  }

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/80 flex justify-center items-center">
      <div className="bg-white p-5 w-full max-w-sm mx-4 rounded flex flex-col gap-2">
        <h3 className="text-center font-bold text-2xl">Acceder</h3>

        <input
          className="bg-gray-200 p-4 rounded block w-full text-black"
          name="username"
          type="text"
          value={email.toLowerCase()}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Usuario"
        />

        <input
          className="bg-gray-200 p-4 rounded block w-full text-black"
          name="password"
          type="password"
          value={password.trim().toLowerCase()}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
        />

        <div>
          <button
            className="rounded p-4 bg-green-400 w-full"
            onClick={loginHandle}
          >
            Acceder
          </button>
        </div>
      </div>
    </div>
  )
}
