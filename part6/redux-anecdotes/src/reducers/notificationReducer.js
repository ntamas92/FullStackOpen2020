const initialState = null
let currentTimeoutId = null

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

export const setExpiringNotificationMessage = (message, timeout) => async (dispatch) => {
  if(currentTimeoutId){
    clearTimeout(currentTimeoutId)
  }

  dispatch(setNotificationMessageAction(message))

  await new Promise(resolve => currentTimeoutId = setTimeout(resolve, timeout))
  
  dispatch(clearNotificationMessageAction)
  currentTimeoutId = null
}

export default reducer
