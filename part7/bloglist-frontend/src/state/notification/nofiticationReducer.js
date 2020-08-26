const initialState = null

const notificationReducer = (state = initialState, action) => {
  console.log(action)

  if (action.type === "SET_MESSAGE")
    return action.data
  else if (action.type === "CLEAR")
    return initialState

  return state
}

export default notificationReducer