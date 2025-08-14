import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.jsx"
import { AbreviatedProvider } from "./context/abreviated.jsx"
import { StatusProvider } from "./context/Status.jsx"
import { ConfigProvider } from "./context/Config.jsx"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <StatusProvider>
      <ConfigProvider>
        <AbreviatedProvider>
          <App />
        </AbreviatedProvider>
      </ConfigProvider>
    </StatusProvider>
  </StrictMode>
)
