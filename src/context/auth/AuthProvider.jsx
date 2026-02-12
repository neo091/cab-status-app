import { useEffect, useReducer } from "react"
import { AuthContext } from "./AuthContext"
import { authReducer } from "./AuthReducer"
import { loginService } from "../../services/auth"

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
        return new Error("Error de login")
      }

      dispatch({ type: "LOGIN_SUCCESS", payload: user.user_metadata })
    } catch (error) {
      console.log("error:", error.message)
    }
  }
  const logout = () => {
    dispatch({ type: "LOGOUT" })
    localStorage.removeItem("auth_session")
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
