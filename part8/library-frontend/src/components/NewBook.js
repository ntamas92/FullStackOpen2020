import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_BOOK, ALL_BOOKS } from '../queries/bookQueries'
import { ALL_AUTHORS } from '../queries/authorQueries'

const initialBookState = {
  title: '',
  author: '',
  published: null,
  genre: '',
  genres: []
}

const NewBook = () => {
  const [book, setBook] = useState(initialBookState)
  const [addBookRequest] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }]
  })
  
  const submit = async (event) => {
    event.preventDefault()

    addBookRequest({ variables: { ...book } })
    setBook(initialBookState)
  }

  const addGenre = (genre) => {
    if (book.genres.includes(genre)) {
      return
    }

    setBook({ ...book, genres: book.genres.concat(book.genre) })
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={book.title}
            onChange={({ target }) => setBook({ ...book, title: target.value })}
          />
        </div>
        <div>
          author
          <input
            value={book.author}
            onChange={({ target }) => setBook({ ...book, author: target.value })}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={book.published}
            onChange={({ target }) => setBook({ ...book, published: Number(target.value) })}
          />
        </div>
        <div>
          <input
            value={book.genre}
            onChange={({ target }) => setBook({ ...book, genre: target.value })}
          />
          <button onClick={_ => addGenre(book.genre)} type="button">add genre</button>
        </div>
        <div>
          genres: {book.genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook