import { gql } from '@apollo/client';

export const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    id
    title
    author
    published
    genres
  }
`

export const ALL_BOOKS = gql`
query allBooks {
  allBooks {
    ...BookDetails
  }
}
${BOOK_DETAILS}
`

export const BOOKS_BY_GENRE = gql`
  query booksByGenre($genre:String!){
    allBooks(genre:$genre){
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const ADD_BOOK = gql`
mutation addBook($title: String!, $published: Int!, $author: String!, $genres:[String!]!) {
  addBook(
    book: {
      title: $title
      published: $published
      author: $author
      genres: $genres
    }
  ){
    ...BookDetails
  }
}
${BOOK_DETAILS}
`

export const BOOK_ADDED = gql`
subscription {
  bookAdded {
    ...BookDetails
  }
}
${BOOK_DETAILS}
`