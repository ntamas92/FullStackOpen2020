import React, { useState } from "react"
import { createNewAnecdote } from "../reducers/anecdoteReducer"
import { setExpiringNotificationMessage } from "../reducers/notificationReducer"
import { connect } from "react-redux"


const AnecdoteForm = (props) => {
  const handleCreateNewAnecdote = async event => {
    event.preventDefault()
    props.createNewAnecdote(newAnecdote)
    props.setExpiringNotificationMessage(`${newAnecdote} created`, 5000)
    setNewAnecdote("")
  }

  const [newAnecdote, setNewAnecdote] = useState("")
  
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

const connectedForm = connect(null, {createNewAnecdote, setExpiringNotificationMessage})(AnecdoteForm)

export default connectedForm
