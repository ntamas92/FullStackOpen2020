
let currentTimeoutId = null

const clearNotificationMessageAction = () => { return { type: "CLEAR" } }

const setNotificationMessageAction = message => {
  return {
    type: "SET_MESSAGE",
    data: message
  }
}

export const clearNotificationMessage = async (dispatch) => dispatch(clearNotificationMessageAction())

export const setExpiringMessage = (message, timeout) => async dispatch => {
  if (currentTimeoutId)
    dispatch(clearNotificationMessage)

  dispatch(setNotificationMessageAction(message))

  await new Promise(resolve => currentTimeoutId = setTimeout(() => resolve(), timeout))

  dispatch(clearNotificationMessage)
  currentTimeoutId = null
}