const initialState = null

const reducer = (state = initialState, action) => {
  if (action.type === "SET_MESSAGE") {
    return action.data
  }
  else if (action.type === "CLEAR"){
      return initialState
  }

  return state
}

export const setNotificationMessageAction = message => {
  return {
    type: "SET_MESSAGE",
    data: message,
  }
}

export const clearNotificationMessageAction = {
    type: "CLEAR",
}

export const setExpiringNotificationMessage = (message, dispatch) => {
  dispatch(setNotificationMessageAction(message))
  setTimeout(() => dispatch(clearNotificationMessageAction), 5000)
}

export default reducer