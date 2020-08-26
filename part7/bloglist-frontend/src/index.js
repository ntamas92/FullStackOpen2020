import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import createStore from "./state/store"
import { Provider } from "react-redux"
import { combineReducers } from "redux"
import notificationReducer from "./state/notification/nofiticationReducer"

const store = createStore(combineReducers({ notification: notificationReducer }))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root"))
