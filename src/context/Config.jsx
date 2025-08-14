import { createContext, useContext, useState } from "react"

const ConfigContext = createContext()

export const ConfigProvider = ({ children }) => {
  const [telefono, setTelefono] = useState(
    localStorage.getItem("telefono") || "604994352"
  )

  return (
    <ConfigContext.Provider value={{ telefono, setTelefono }}>
      {children}
    </ConfigContext.Provider>
  )
}

export const useConfigContext = () => useContext(ConfigContext)
