import React from "react"
import { voteAction } from "../reducers/anecdoteReducer"
import { useSelector, useDispatch } from "react-redux"

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  return (
    <div className="anecdote-list">
      {anecdotes
        .sort((lhs, rhs) => rhs.votes - lhs.votes)
        .map(anecdote => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => dispatch(voteAction(anecdote.id))}>vote</button>
            </div>
          </div>
        ))}
    </div>
  )
}

export default AnecdoteList
