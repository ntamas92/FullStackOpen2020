import anecdoteService from "../services/anectodes"

const reducer = (state = [], action) => {
  switch (action.type) {
    case "MODIFY_ANECDOTE":
      const votedAnecdoteId = action.data.id
      return state.map(anecdote => (anecdote.id === votedAnecdoteId ? action.data : anecdote))
    case "ADD_ANECDOTE":
      return [...state, action.data]
    case "INIT_ANECDOTES":
      return action.data
    default:
      return state
  }
}

export const voteAction = id => async dispatch => {
  const modifiedAnecdote = await anecdoteService.voteToAnecdote(id)

  dispatch({
    type: "MODIFY_ANECDOTE",
    data: modifiedAnecdote,
  })
}

export const createNewAnecdote = (content) => async dispatch => {
  const createdNote = await anecdoteService.createNew(content)
  dispatch({
    type: "ADD_ANECDOTE",
    data: createdNote,
  })
}

export const initAnecdotes = () => async dispatch => {
  const notes = await anecdoteService.getAll()
  dispatch({
    type: "INIT_ANECDOTES",
    data: notes,
  })

  return notes
}

export default reducer
