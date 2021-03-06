import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import App from "./App"
import { combineReducers } from "redux"
import anecdoteReducer from "./reducers/anecdoteReducer"
import notificationReducer from "./reducers/notificationReducer"
import filterReducer from "./reducers/filterReducer"

import createStore from "./state/store"

const combinedReducer = combineReducers({ anecdotes: anecdoteReducer, notification: notificationReducer, filter: filterReducer })

const store = createStore(combinedReducer)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
)
