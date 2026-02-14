import { useEffect, useReducer } from "react"
import { AuthContext } from "./AuthContext"
import { authReducer } from "./AuthReducer"
import { loginService, logoutService } from "../../services/auth"

// Estado inicial por defecto
const initialState = {
  user: null,
  loading: false,
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, undefined, () => {
    const localData = localStorage.getItem("auth_session")
    return localData ? JSON.parse(localData) : initialState
  })

  const login = async ({ email, password }) => {
    dispatch({ type: "INIT_LOGIN" })

    try {
      const { user, error } = await loginService({ email, password })

      if (error) {
        dispatch({ type: "LOGOUT" })
        // LANZAMOS el error para que el componente lo reciba
        throw new Error(error.message || "Credenciales incorrectas")
      }

      const userData = {
        id: user.id,
        ...user.user_metadata,
      }

      dispatch({ type: "LOGIN_SUCCESS", payload: userData })

      // Devolvemos los datos para confirmar éxito al componente
      return userData
    } catch (error) {
      console.error("error en context:", error.message)
      // RE-LANZAMOS el error hacia el componente
      throw error
    }
  }

  const logout = async () => {
    try {
      dispatch({ type: "LOGOUT" })
      await logoutService()
      localStorage.removeItem("auth_session")
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    localStorage.setItem(
      "auth_session",
      JSON.stringify({ user: state.user, loading: state.loading }),
    )
  }, [state.user])

  return (
    <AuthContext.Provider
      value={{ user: state.user, loading: state.loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}
