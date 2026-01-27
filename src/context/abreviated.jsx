import { createContext, useContext, useEffect, useReducer } from "react"
import { abreviatedReducer } from "./AbreviatedReduce"

const AbreviatedContext = createContext()

const ABREVIATED_TXT = "abreviated"

export const AbreviatedProvider = ({ children }) => {
  const [state, dispatch] = useReducer(abreviatedReducer, undefined, () => {
    const abreviatedLocal = localStorage.getItem(ABREVIATED_TXT)
    return {
      abreviated: abreviatedLocal || false,
    }
  })

  const toggleAbreviated = () => dispatch({ type: "TOGGLE_ABREVIATED" })

  useEffect(() => {
    localStorage.setItem(ABREVIATED_TXT, state.abreviated)
  }, [state.abreviated])
  return (
    <AbreviatedContext.Provider
      value={{ abreviated: state.abreviated, toggleAbreviated }}
    >
      {children}
    </AbreviatedContext.Provider>
  )
}

export const useAbreviatedContext = () => useContext(AbreviatedContext)
