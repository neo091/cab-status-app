import { useState } from "react"
import { useConfigContext } from "../context/Config"
import { Link } from "react-router-dom"

const Config = () => {
  const { telefono, setTelefono } = useConfigContext()

  const [editPhone, setEditPhone] = useState(false)

  const editHandler = () => {
    setEditPhone(true)
  }

  const savePhoneHandler = () => {
    setEditPhone(false)
    localStorage.setItem("telefono", telefono)
  }

  return (
    <main className="bg-gray-900 min-h-dvh flex flex-col">
      <section className="bg-gray-800 flex-1 flex flex-col gap-5 items-center justify-center">
        {editPhone ? (
          <>
            <form
              onSubmit={savePhoneHandler}
              className=" flex flex-col gap-5 items-center justify-center"
            >
              <input
                type="number"
                onChange={(e) => setTelefono(e.target.value)}
                value={telefono}
                className="p-2 bg-gray-200 text-center text-2xl rounded"
              />

              <button
                type="submit"
                className="px-6 py-2  bg-blue-600 text-white rounded"
              >
                Guardar
              </button>
            </form>
          </>
        ) : (
          <>
            <p className="text-center text-white text-2xl w-full">{telefono}</p>
            <button
              onClick={editHandler}
              className="px-6 py-2  bg-blue-600 text-white rounded"
            >
              Editar
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
