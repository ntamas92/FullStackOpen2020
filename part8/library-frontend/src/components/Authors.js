
import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR,  } from '../queries/authorQueries'

const SetBirthYearForm = ({ authors }) => {
  const [name, setName] = useState(authors[0].name)
  const [birthYear, setBirthYear] = useState(0)

  const [setBirthYearRequest] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const submitSetBirthYear = event => {
    event.preventDefault()

    console.log(name)
    setBirthYearRequest({variables: {name, setBornTo:birthYear }})
    setName(authors[0].name)
    setBirthYear(0)
  }

  return (
    <div>
      <h3>Set Birth year for author</h3>
      <form onSubmit={submitSetBirthYear}>
        <select value={name} onChange={evt => setName(evt.target.value)}>
          {authors.map(x => <option value={x.name} label={x.name}/>)}
        </select>
        <input type="number" value={birthYear} onChange={evt => setBirthYear(Number(evt.target.value))} />
        <button type="submit">Set birth year</button>
      </form>
    </div>
  )
}

const Authors = (props) => {
  const getAuthorResult = useQuery(ALL_AUTHORS)

  if (!props.show) {
    return null
  }

  if (getAuthorResult.loading) {
    return <div>Loading...</div>
  }

  const authors = getAuthorResult.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <SetBirthYearForm authors={authors} />
    </div>
  )
}

export default Authors
