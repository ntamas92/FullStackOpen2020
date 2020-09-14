const { gql } = require('apollo-server')


const typeDefs = gql`

  type User {
    username: String!,
    favouriteGenre: String,
    id: ID!
  }

  type Token {
    value: String!
  }

  type Book {
    title: String!,
    published: Int!,
    author: String!,
    id: ID!,
    genres: [String!]!
  }

  input BookInput{
    title: String!,
    published: Int!,
    author: String!,
    genres: [String!]!
  }

  type Author {
    name: String!
    id: ID!,
    born: Int,
    bookCount: Int!
    books: [Book!]!
  }

  type Query {
    bookCount: Int!,
    authorCount: Int!,
    allBooks(author:String, genre:String): [Book!]!,
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(book: BookInput!):Book!,
    editAuthor(name: String!, setBornTo:Int):Author
    createUser(username:String!, password:String!): User
    editUser(username:String!, setFavouriteGenre:String): User
    login(username:String!, password:String!): Token
  }
`
module.exports = typeDefs