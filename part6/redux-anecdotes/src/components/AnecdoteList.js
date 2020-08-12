import React from "react"
import { voteAction } from "../reducers/anecdoteReducer"
import { setNotificationMessageAction, clearNotificationMessageAction } from "../reducers/notificationReducer"

import { useSelector, useDispatch } from "react-redux"

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()

  const vote = (anecdote) => () => {
    dispatch(voteAction(anecdote.id))

    //TODO: Encapsulate showing the message for a limited time into reducer itself
    dispatch(setNotificationMessageAction(`You voted ${anecdote.content}`))
    setTimeout(() => dispatch(clearNotificationMessageAction), 5000)
  } 

  return (
    <div className="anecdote-list">
      {anecdotes
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
