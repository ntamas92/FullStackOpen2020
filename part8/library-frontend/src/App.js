
import React, { useState, useEffect } from 'react'
import JwtDecode from 'jwt-decode'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import { useApolloClient, useSubscription } from '@apollo/client'
import Recommendations from './components/Recommendations'
import { BOOK_ADDED, ALL_BOOKS } from './queries/bookQueries'


const App = () => {
  const [page, setPage] = useState('authors')
  const [username, setUsername] = useState(null)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({subscriptionData}) => {
      console.log(subscriptionData.data.bookAdded)
      updateCacheWithBook(subscriptionData.data.bookAdded)
    }
  })

  useEffect(() => {
    const storedToken = window.localStorage.getItem('user-token')
    if (storedToken) {
      setUsername(JwtDecode(storedToken).username)
    }
  }, [])


  const updateCacheWithBook = (addedBook) => {
    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if(!dataInStore.allBooks.find(x => x.id === addedBook.id)){
      client.writeQuery({query: ALL_BOOKS, data: {allBooks: dataInStore.allBooks.concat(addedBook)}})
    }
  }

  const logout = () => {
    setUsername(null)
    window.localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {username && <button onClick={() => setPage('add')}>add book</button>}
        {username && <button onClick={() => setPage('recommend')}>recommend</button>}
        {username ?
          <button onClick={() => logout()} >logout</button> :
          <button onClick={() => setPage('login')}>login</button>}
      </div>

      {page === 'authors' && <Authors />}
      {page === 'books' && <Books />}
      {username && page === 'add' && <NewBook />}
      {username && page === 'recommend' && <Recommendations username={username} />}
      {page === 'login' &&
        <Login setToken={(token) => {
          localStorage.setItem('user-token', token);
          
          const decodedToken = JwtDecode(token)
          setUsername(decodedToken.username) 
          setPage('authors')
        }} />}

    </div>
  )
}

export default App