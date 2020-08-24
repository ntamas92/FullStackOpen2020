import React, { useState } from "react"
import { Switch, Route, Link, useHistory, useRouteMatch } from "react-router-dom"
import About from "./components/About"
import AnecdoteList from "./components/AnecdoteList"
import CreateNew from "./components/AnecdoteCreateForm"
import AnecdoteDetails from "./components/AnecdoteDetails"

const Menu = () => {
  const padding = {
    paddingRight: 5,
  }
  return (
    <div>
      <Link to="/" style={padding}>
        anecdotes
      </Link>
      <Link to="/create" style={padding}>
        create new
      </Link>
      <Link to="/about" style={padding}>
        about
      </Link>
    </div>
  )
}

const Footer = () => (
  <div>
    Anecdote app for <a href="https://courses.helsinki.fi/fi/tkt21009">Full Stack -websovelluskehitys</a>. See{" "}
    <a href="https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js">
      https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js
    </a>{" "}
    for the source code.
  </div>
)

const App = () => {
  const history = useHistory()
  const detailsRouteMatch = useRouteMatch("/anecdotes/:id")
  
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: "1",
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: "2",
    },
  ])

  const [notification, setNotification] = useState("")

  const addNew = anecdote => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))

    history.push("/")

    setNotification(`A new anecdote ${anecdote.content} was created!`)
    setTimeout(() => setNotification(null), 10000)
  }

  const anecdoteById = id => anecdotes.find(a => a.id === id)

  const vote = id => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    }

    setAnecdotes(anecdotes.map(a => (a.id === id ? voted : a)))
  }

  const getAnecdoteByRoute = () => {
    return detailsRouteMatch ? anecdoteById(detailsRouteMatch.params.id) : null
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      {notification && <div>{notification}</div>}

      <Switch>
        <Route path="/anecdotes/:id">
          <AnecdoteDetails anecdote={getAnecdoteByRoute()} onVoted={vote} />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/create">
          <CreateNew addNew={addNew} />
        </Route>
        <Route path="/">
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
      </Switch>
      <Footer />
    </div>
  )
}

export default App
