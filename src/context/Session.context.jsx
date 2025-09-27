import { createContext, useContext, useEffect, useState } from "react"
import { getUser, login } from "../services/auth"

const SessionContext = createContext()

export const SessionProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem("token") || null)
  const [loading, setLoading] = useState(true)

  const doLogin = async ({ username, password }) => {
    try {
      const result = await login({ username, password })

      if (!result?.user || !result?.token) {
        throw new Error("Credenciales inválidas")
      }

      setUser(result.user)
      setToken(result.token)
      localStorage.setItem("token", result.token)
      return true
    } catch (err) {
      console.error(err.response?.data?.message || err.message)
      return false
    }
  }

  const loadUserInfo = async (token) => {
    try {
      const result = await getUser({ token })
      setUser(result?.user || null)
    } catch (err) {
      console.error("Error cargando usuario:", err)
      setUser(null)
      setToken(null)
      localStorage.removeItem("token")
    } finally {
      setLoading(false)
    }
  }

  const checkUserToken = () => {
    if (token) {
      loadUserInfo(token)
    } else {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem("token")
  }

  useEffect(() => {
    checkUserToken()
  }, [])

  return (
    <SessionContext.Provider value={{ user, token, loading, doLogin, logout }}>
      {children}
    </SessionContext.Provider>
  )
}

export const useSessionContext = () => useContext(SessionContext)
