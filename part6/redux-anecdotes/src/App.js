import React from "react"
import CreateNewAnecdote from "./components/AnecdoteForm"
import AnecdoteList from "./components/AnecdoteList"
import Notification from "./components/Notification"

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList />
      
      <h2 style={{marginBottom:"5px"}}>Create new</h2>
      <CreateNewAnecdote />

      <h3>Notifications</h3>
      <Notification />
    </div>
  )
}

export default App
