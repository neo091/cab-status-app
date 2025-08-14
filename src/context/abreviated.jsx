import { createContext, useContext, useEffect, useState } from "react"

const AbreviatedContext = createContext()

export const AbreviatedProvider = ({ children }) => {
  const [abreviated, setAbreviated] = useState(null)

  const toggleAbreviated = () => {
    if (abreviated) {
      setAbreviated(null)
      localStorage.removeItem("abreviated")
    } else {
      localStorage.setItem("abreviated", true)
      setAbreviated(true)
    }
  }

  useEffect(() => {
    setAbreviated(localStorage.getItem("abreviated") || null)
  }, [abreviated])

  return (
    <AbreviatedContext.Provider value={{ abreviated, toggleAbreviated }}>
      {children}
    </AbreviatedContext.Provider>
  )
}

export const useAbreviatedContext = () => useContext(AbreviatedContext)
