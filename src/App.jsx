import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import "./App.css"
import Home from "./pages/Home"
import AdminDashboard from "./pages/AdminDashboard"
import AdminLogin from "./pages/AdminLogin"
import ProtectedRoute from "./components/ProtectedRoute"
import Conductor from "./pages/Conductor"
import Config from "./pages/Config"
import History from "./pages/History"

function App() {
  return (
    <Router basename="/taxi/">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/config" element={<Config />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/history" element={<History />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard/:conductor"
          element={
            <ProtectedRoute>
              <Conductor />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
