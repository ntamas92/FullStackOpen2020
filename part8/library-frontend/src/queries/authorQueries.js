import { gql } from '@apollo/client';

export const ALL_AUTHORS = gql`
query allAuthors {
  allAuthors {
    name
    bookCount
    born
  }
}
`

export const EDIT_AUTHOR = gql`
mutation editAuthor($name: String!, $setBornTo: Int) {
  editAuthor(name:$name, setBornTo:$setBornTo){
    name
    bookCount
    born
  }
}
`