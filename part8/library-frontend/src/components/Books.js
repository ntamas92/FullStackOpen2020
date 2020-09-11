import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries/bookQueries'

const Books = (props) => {
  const getAllBooks = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }

  if(getAllBooks.loading){
    return <div>Loading...</div>
  }

  const books = getAllBooks.data.allBooks

  return (
    <div>
      <h2>books</h2>

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
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books