
import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import { useApolloClient } from '@apollo/client'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    const storedToken = window.localStorage.getItem('user-token')
    if(storedToken){
      setToken(storedToken)
    }
  }, [])

  const logout = () => {
    setToken(null)
    window.localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token ?
          <button onClick={() => logout()} >logout</button> :
          <button onClick={() => setPage('login')}>login</button>}
      </div>

      {page === 'authors' && <Authors />}
      {page === 'books' && <Books />}
      {token && page === 'add' && <NewBook />}
      {page === 'login' && <Login setToken={(token) => { setToken(token); setPage('authors') }} />}
    </div>
  )
}

export default App