import React from "react"
import { voteAction } from "../reducers/anecdoteReducer"
import { setExpiringNotificationMessage } from "../reducers/notificationReducer"

import { useSelector, useDispatch } from "react-redux"

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)

  const filteredAnecdotes = anecdotes.filter(x => x.content.toLowerCase().includes(filter))
  const dispatch = useDispatch()

  const vote = (anecdote) => () => {
    dispatch(voteAction(anecdote.id))

    setExpiringNotificationMessage(`You voted ${anecdote.content}`, dispatch)
  } 

  return (
    <div className="anecdote-list">
      {filteredAnecdotes
        .sort((lhs, rhs) => rhs.votes - lhs.votes)
        .map(anecdote => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={vote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  )
}

export default AnecdoteList
