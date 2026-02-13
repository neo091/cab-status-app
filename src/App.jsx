import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom"
import "./App.css"
import Home from "./pages/Home"
import ProtectedRoute from "./components/ProtectedRoute"
import Config from "./pages/Config"
import History from "./pages/History"
import { Login } from "./components/Login"
import Loader from "./components/Loader"
import { useAuth } from "./context/auth/useAuth"

const LoginRedirect = () => {
  const { user, loading } = useAuth()
  if (loading) return <Loader />
  return user ? <Navigate to="/" /> : <Login />
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginRedirect />} />
        <Route
          path="/config"
          element={
            <ProtectedRoute>
              <Config />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
