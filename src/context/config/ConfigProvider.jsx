import { useEffect, useReducer } from "react"
import { ConfigContext } from "./ConfigContext"
import { configReducer } from "./ConfigReducer"

const LOCAL_CONFIG = "local_config"

const initialState = {
  phone: "604994352",
  abreviated: true,
  whatsAppReport: false,
  currency: "€",
}

export const ConfigProvider = ({ children }) => {
  const [state, dispatch] = useReducer(configReducer, undefined, () => {
    const localData = JSON.parse(localStorage.getItem(LOCAL_CONFIG))
    return localData ? localData : initialState
  })
  const setCurrency = (symbol) =>
    dispatch({ type: "SET_CURRENCY", payload: symbol })
  const toggleAbreviated = () => dispatch({ type: "TOGGLE_ABREVIATED" })
  const togglewhatsAppReport = () =>
    dispatch({ type: "TOGGLE_WHATSAPP_REPORT" })
  const updatePhone = ({ phone }) =>
    dispatch({ type: "UPDATE_PHONE", payload: phone })

  useEffect(() => {
    localStorage.setItem(LOCAL_CONFIG, JSON.stringify(state))
  }, [state])

  return (
    <ConfigContext.Provider
      value={{
        phone: state.phone,
        abreviated: state.abreviated,
        whatsAppReport: state.whatsAppReport,
        currency: state.currency,
        setCurrency,
        toggleAbreviated,
        updatePhone,
        togglewhatsAppReport,
      }}
    >
      {children}
    </ConfigContext.Provider>
  )
}
