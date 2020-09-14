const { ApolloServer, gql, UserInputError } = require('apollo-server')

const typeDefs = require("./graphql/types")
const resolvers = require("./graphql/resolvers")
require('dotenv').config()
const jwt = require("jsonwebtoken")
const User = require("./models/user")


let MONGODB_URI = process.env.MONGODB_URI
let JWT_SECRET = process.env.JWT_SECRET

const mongoose = require("mongoose")

mongoose.set('useFindAndModify', false)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => { console.log('connected to MongoDB') })
  .catch((error) => { console.log('error connection to MongoDB:', error.message) })

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const authHeader = req ? req.headers.authorization : null

    if (authHeader) {
      const serializedToken = authHeader.split(" ")[1]
      const decodedToken = jwt.verify(serializedToken, JWT_SECRET)

      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Listening at ${subscriptionsUrl}`)
})