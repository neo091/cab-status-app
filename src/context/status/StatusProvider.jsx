import { useEffect, useReducer } from "react"
import { StatusContext } from "./StatusContext"
import { StatusReducer } from "./StatusReducer"

const initialState = {
  status: "libre",
}

export const StatusProvider = ({ children }) => {
  const [state, dispatch] = useReducer(StatusReducer, undefined, () => {
    return JSON.parse(localStorage.getItem("status")) || initialState
  })

  const freeStatus = () => dispatch({ type: "CHANGE_STATUS", payload: "libre" })

  const busyStatus = () =>
    dispatch({ type: "CHANGE_STATUS", payload: "ocupado" })

  const restStatus = () => {
    // Si ya estoy descansando, al pulsar el botón me pongo en "libre"
    if (state.status === "descansando") {
      dispatch({ type: "CHANGE_STATUS", payload: "libre" })
    } else {
      // Si estoy en cualquier otro estado, me pongo a descansar ecepto si estoy ocupado, que no me deja descansar

      if (state.status !== "ocupado") {
        dispatch({ type: "CHANGE_STATUS", payload: "descansando" })
      }
    }
  }
  const payStatus = () =>
    dispatch({ type: "CHANGE_STATUS", payload: "pagando" })

  useEffect(() => {
    localStorage.setItem("status", JSON.stringify({ status: state.status }))
  }, [state.status])

  return (
    <StatusContext.Provider
      value={{
        status: state.status,
        freeStatus,
        busyStatus,
        restStatus,
        payStatus,
      }}
    >
      {children}
    </StatusContext.Provider>
  )
}
