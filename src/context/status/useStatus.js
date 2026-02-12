import { useContext } from "react"
import { StatusContext } from "./StatusContext"

export const useStatus = () => {
  const context = useContext(StatusContext)

  if (!context) {
    throw new Error("useStatus must be used withing a StatusProvider")
  }

  return context
}
