import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./app/store"
import "./index.css"
import App from "./App"
import { ThemeProvider } from "@emotion/react"
import theme from "./utils/muitheme"
import { autoLogin } from "./features/auth/authSlice"

store.dispatch(autoLogin())

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
)
