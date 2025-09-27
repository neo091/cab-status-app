import { createContext, useContext, useEffect, useState } from "react"

const StatusContext = createContext()

export const StatusProvider = ({ children }) => {
  const [status, setStatus] = useState(null)

  const freeStatus = () => {
    setStatus("libre")
    localStorage.setItem("status", "libre")
  }

  const busyStatus = () => {
    setStatus("ocupado")
    localStorage.setItem("status", "ocupado")
  }

  const restStatus = () => {
    setStatus("descansando")
    localStorage.setItem("status", "descansando")
  }

  const deleteStatus = () => {
    setStatus(null)
    localStorage.removeItem("status")
  }

  useEffect(() => {
    setStatus(localStorage.getItem("status") || "libre")
  }, [status])

  return (
    <StatusContext.Provider
      value={{ status, deleteStatus, freeStatus, busyStatus, restStatus }}
    >
      {children}
    </StatusContext.Provider>
  )
}

export const useStatusContext = () => useContext(StatusContext)
