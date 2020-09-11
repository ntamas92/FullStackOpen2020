import { gql } from '@apollo/client';

export const ALL_BOOKS = gql`
query allBooks {
  allBooks {
    title
    author
    published
  }
}
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
    title
    published
    author
    genres
  }
}
`