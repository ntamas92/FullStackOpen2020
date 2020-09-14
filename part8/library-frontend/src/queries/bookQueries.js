import { gql } from '@apollo/client';

export const ALL_BOOKS = gql`
query allBooks {
  allBooks {
    title
    author
    published
    genres
  }
}
`

export const BOOKS_BY_GENRE = gql`
  query booksByGenre($genre:String!){
    allBooks(genre:$genre){
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