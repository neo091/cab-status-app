import { Navigate } from "react-router-dom"
import { isAdminLoggedIn } from "../services/auth.js"

export default function ProtectedRoute({ children }) {
  return isAdminLoggedIn() ? children : <Navigate to="/admin/login" />
}
