import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import createStore from "./state/store"
import { Provider } from "react-redux"
import { combineReducers } from "redux"
import notificationReducer from "./state/notification/nofiticationReducer"
import blogsReducer from "./state/blogs/blogsReducer"
import userReducer from "./state/user/userReducer"
import { BrowserRouter as Router } from "react-router-dom"

const combinedReducers = combineReducers({ notification: notificationReducer, blogs: blogsReducer, user: userReducer })

const store = createStore(combinedReducers)

console.log("index")

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
  ,
  document.getElementById("root"))
