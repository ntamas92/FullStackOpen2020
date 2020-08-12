import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { createNewAnecdoteAction } from "../reducers/anecdoteReducer"

const AnecdoteForm = () => {
  const handleCreateNewAnecdote = event => {
    event.preventDefault()
    dispatch(createNewAnecdoteAction(newAnecdote))
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
