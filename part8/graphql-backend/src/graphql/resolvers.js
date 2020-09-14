const { gql, UserInputError, AuthenticationError } = require('apollo-server')
const { v1: uuid } = require('uuid')
const jwt = require("jsonwebtoken")
const Author = require("../models/author")
const Book = require("../models/book")
const User = require("../models/user")
require('dotenv').config()

/*
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
*/

const JWT_SECRET = process.env.JWT_SECRET

const allAuthors = async () => {
  const authors = await Author.find({})
  const books = await Book.find({})

  return authors.map(author => {
    const booksOfAuthor = books.filter(book => author._id.equals(book.author))
    return { ...author.toObject(), books: booksOfAuthor, bookCount: booksOfAuthor.length }
  })
}

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (_, args) => {
      let filteredBooks = await Book.find({}).populate("author")

      filteredBooks = filteredBooks.map(book => ({...book.toObject(), author:book.author.name}))

      if (args.author) {
        filteredBooks = filteredBooks.filter(book => book.author === args.author)
      }

      if (args.genre) {
        filteredBooks = filteredBooks.filter(book => book.genres.includes(args.genre))
      }

      return filteredBooks
    },
    allAuthors: allAuthors,
    me: (_, __, context) => context.currentUser
  },
  Mutation: {
    addBook: async (_, args, context) => {
      if(!context.currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      const { author: authorName, ...bookInput } = args.book

      let author = await Author.findOne({ name: authorName })

      if (!author) {
        author = new Author({ name: args.book.author })
        author = await author.save()
      }

      const book = new Book({ ...bookInput, author: author._id })

      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      return book
    },
    editAuthor: async (_, args, context) => {
      if(!context.currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      const author = await Author.findOne({ name: args.name })

      if (!author) {
        return null
      }

      if (args.setBornTo !== null && args.setBornTo !== undefined) {
        author.born = args.setBornTo
        try {
          await author.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }

      }

      const authors = await allAuthors()

      return authors.find(x => x._id.equals(author._id))
    },
    createUser: async (_, args) => {
      const user = await User.findOne({ username: args.username })

      if (user) {
        throw new UserInputError("User already exists", { invalidArgs: args.username })
      }

      const newUser = new User({ username: args.username })
      await newUser.save()

      return newUser
    },
    login: async (_, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user) {
        throw new UserInputError("User does not exist, or the password is invalid!")
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  }
}

module.exports = resolvers