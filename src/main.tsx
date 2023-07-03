import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./app/store"
import "./index.css"
import RouteProvider from "./routes/Routes"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouteProvider></RouteProvider>
    </Provider>
  </React.StrictMode>,
)
