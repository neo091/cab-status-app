import React, { useRef, useState } from "react"
import { useConfigContext } from "../context/Config"
import { Link } from "react-router-dom"

const Config = () => {
  const { telefono, setTelefono } = useConfigContext()

  const telefonoInputRef = useRef()

  const [cambiar, setCambiar] = useState(false)

  const cambiarHande = () => {
    setCambiar(true)
  }

  const guardarHandle = () => {
    setCambiar(false)
    const newValue = telefonoInputRef.current.value
    localStorage.setItem("telefono", newValue.toString())
    setTelefono(newValue.toString())
  }

  return (
    <main className="bg-gray-900 min-h-dvh flex flex-col">
      <section className="bg-gray-800 flex-1 flex flex-col gap-5 items-center justify-center">
        {cambiar ? (
          <>
            <input
              ref={telefonoInputRef}
              type="number"
              defaultValue={telefono}
              className="p-2 bg-gray-200 text-center text-2xl rounded"
            />

            <button
              onClick={guardarHandle}
              className="px-6 py-2  bg-blue-600 text-white rounded"
            >
              Guardar
            </button>
          </>
        ) : (
          <>
            <p className="text-center text-white text-2xl w-full">{telefono}</p>
            <button
              onClick={cambiarHande}
              className="px-6 py-2  bg-blue-600 text-white rounded"
            >
              Cambiar
            </button>
          </>
        )}

        <Link to={"/"} className="px-6 py-2  bg-gray-900 text-white rounded">
          Volver
        </Link>
      </section>
    </main>
  )
}

export default Config
