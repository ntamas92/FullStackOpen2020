import React, { useEffect, useState } from "react"
import { BOOKS_BY_GENRE } from "../queries/bookQueries"
import { USER_DETAILS } from "../queries/userQueries"
import { useQuery, useLazyQuery } from "@apollo/client"

const Recommendations = (props) => {
  const currentUserResponse = useQuery(USER_DETAILS)
  const [booksByGenreRequest, booksByGenreResponse] = useLazyQuery(BOOKS_BY_GENRE)

  const [genre, setGenre] = useState(null)
  const [booksByGenre, setBooksByGenre] = useState([])

  useEffect(() => {
    if (currentUserResponse.data) {
      const genre = currentUserResponse.data.me.favouriteGenre
      setGenre(genre)
      booksByGenreRequest({ variables: {genre} })
    }

  }, [currentUserResponse.data, booksByGenreRequest])

  useEffect(() => {
    if (booksByGenreResponse.data) {
      setBooksByGenre(booksByGenreResponse.data.allBooks)
    }
  }, [booksByGenreResponse.data, setBooksByGenre])

  if (currentUserResponse.loading) {
    return <div>Loading...</div>
  }

  return <div>
    <p>Books in your favourite genre <b>{genre}</b></p>
    <ul>
      {booksByGenre.map(x => <li>{x.title} by {x.author}</li>)}
    </ul>
  </div>
}

export default Recommendations