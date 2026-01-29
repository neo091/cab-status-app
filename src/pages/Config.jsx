import { useState } from "react"
import { Link } from "react-router-dom"
import { useConfig } from "../context/config/useConfig"

const Config = () => {
  const { phone, updatePhone } = useConfig()

  const [editPhone, setEditPhone] = useState(false)

  const editHandler = () => {
    setEditPhone(true)
  }

  const savePhoneHandler = () => {
    setEditPhone(false)
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
                onChange={(e) => updatePhone({ phone: e.target.value })}
                value={phone}
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
            <p className="text-center text-white text-2xl w-full">{phone}</p>
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
