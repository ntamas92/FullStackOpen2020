import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries/bookQueries'

const Books = () => {

  const [selectedGenre, setSelectedGenre] = useState(null)
  const getAllBooks = useQuery(ALL_BOOKS)

  if (getAllBooks.loading) {
    return <div>Loading...</div>
  }

  const books = getAllBooks.data.allBooks

  const genres = books.flatMap(book => book.genres)
  
  const filteredBooks = selectedGenre ? books.filter(x => x.genres.includes(selectedGenre)) : books

  return (
    <div>
      <h2>books</h2>

      {selectedGenre && <p>In selected genre <b>{selectedGenre}</b></p>}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {filteredBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <p>
        {genres.map(x => <button type="button" onClick={() => setSelectedGenre(x)}>{x}</button>)}
        <button type="button" onClick={() => setSelectedGenre(null)}>All genres</button>
      </p> 
    </div>
  )
}

export default Books