import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { createNewAnecdote } from "../reducers/anecdoteReducer"
import { setExpiringNotificationMessage } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
  const handleCreateNewAnecdote = async event => {
    event.preventDefault()
    dispatch(createNewAnecdote(newAnecdote))

    dispatch(setExpiringNotificationMessage(`${newAnecdote} created`, 5000))
    setNewAnecdote("")
  }

  const [newAnecdote, setNewAnecdote] = useState("")
  const dispatch = useDispatch()
  return (
    <div>
      <form onSubmit={handleCreateNewAnecdote}>
        <div>
          <input value={newAnecdote} onChange={newVal => setNewAnecdote(newVal.target.value)} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
