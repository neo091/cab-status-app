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

  return (
    <main className={`bg-gray-900 flex-1 flex flex-col`}>
      <section className="bg-gray-800 flex-1 flex items-center justify-center">
        <ToggleButton onPress={iniciatViajeToggle} />
      </section>
    </main>
  )
}

export default CenterBoton
