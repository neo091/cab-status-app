import { Navigate } from "react-router-dom"
import { useAuth } from "../context/auth/useAuth"

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    )
  }
  return user ? children : <Navigate to="/login" />
}
