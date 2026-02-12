import { useStatus } from "../context/status/useStatus"

const ToggleButton = ({ onPress }) => {
  const { status } = useStatus()
  return (
    <button
      className={`rounded-full  bg-gray-800 size-50 text-3xl uppercase shadow-md shadow-black
            ${status === "descansando" && " bg-gray-900 text-gray-400"}
            ${
              status === "libre" &&
              "text-green-950 bg-green-600 border-2 border-green-900"
            }
            ${
              status === "ocupado" &&
              "bg-red-600 text-red-950 border-2 border-red-900"
            }
            `}
      onClick={onPress}
    >
      {status !== "descansando"
        ? status === "libre"
          ? "Iniciar"
          : `Terminar`
        : "Terminar Descanso"}
    </button>
  )
}

export default ToggleButton
