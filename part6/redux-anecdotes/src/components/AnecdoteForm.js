import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { createNewAnecdoteAction } from "../reducers/anecdoteReducer"
import { setExpiringNotificationMessage } from "../reducers/notificationReducer"
import anecdoteService from "../services/anectodes"

const AnecdoteForm = () => {
  const handleCreateNewAnecdote = async event => {
    event.preventDefault()

    const createdAnecdote = await anecdoteService.createNew(newAnecdote)
    dispatch(createNewAnecdoteAction(createdAnecdote))

    setExpiringNotificationMessage(`${newAnecdote} created`, dispatch)
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
