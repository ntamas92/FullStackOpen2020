import { createStore as reduxCreateStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"

const createStore = reducer => reduxCreateStore(reducer, applyMiddleware(thunk))

export default createStore