const reducer = (state = [], action) => {
  switch (action.type) {
    case "VOTE":
      const votedAnecdoteId = action.data.id;
      return state.map(anecdote => anecdote.id === votedAnecdoteId ? { ...anecdote, votes: anecdote.votes + 1 } : anecdote);
    case "ADD_ANECDOTE":
      return [...state, action.data]
    case "INIT_ANECDOTES":
      return action.data
    default:
      return state;
  }
};

export const voteAction = id => {
  return {
    type: "VOTE",
    data: { id: id },
  }
}

export const createNewAnecdoteAction = data => {
  return {
    type: "ADD_ANECDOTE",
    data: data,
  }
}

export const initAnecdotesAction = anecdotes => {
  return {
    type: "INIT_ANECDOTES",
    data: anecdotes
  }
}

export default reducer;
