import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import App from "./components/App"
import reducer from "./reducers"
import middleware from "./middleware"
import { createStore, compose } from "redux"
import SEO from "./components/home/SEO"

// let composeEnhancers = process.env.MODE === "production"
//   ? compose
//   : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__

const composeEnhancers =
  (process.env.MODE !== "production"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null) || compose

const store = createStore(reducer, composeEnhancers(middleware))

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <SEO />
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
)
