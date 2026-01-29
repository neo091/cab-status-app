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

  const restStatus = () =>
    dispatch({ type: "CHANGE_STATUS", payload: "descansando" })

  useEffect(() => {
    localStorage.setItem("status", JSON.stringify({ status: state.status }))
  }, [state.status])

  return (
    <StatusContext.Provider
      value={{ status: state.status, freeStatus, busyStatus, restStatus }}
    >
      {children}
    </StatusContext.Provider>
  )
}
