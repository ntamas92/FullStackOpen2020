import React, { useEffect } from "react"
import CreateNewAnecdote from "./components/AnecdoteForm"
import AnecdoteList from "./components/AnecdoteList"
import Notification from "./components/Notification"
import Filter from "./components/Filter"

import anecdoteService from "./services/anectodes"
import { useDispatch } from "react-redux"
import { initAnecdotesAction } from "./reducers/anecdoteReducer"

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    anecdoteService.getAll().then(response => {
      dispatch(initAnecdotesAction(response))
    })  
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />

      <Filter />

      <AnecdoteList />

      <h2 style={{ marginBottom: "5px" }}>Create new</h2>
      <CreateNewAnecdote />
    </div>
  )
}

export default App
