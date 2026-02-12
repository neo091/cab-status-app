import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.jsx"
import { AuthProvider } from "./context/auth/AuthProvider.jsx"
import { StatusProvider } from "./context/status/StatusProvider.jsx"
import { ConfigProvider } from "./context/config/ConfigProvider.jsx"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <StatusProvider>
        <ConfigProvider>
          <App />
        </ConfigProvider>
      </StatusProvider>
    </AuthProvider>
  </StrictMode>,
)
