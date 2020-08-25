const jwt = require('jsonwebtoken')

const getAndDecodeToken = request => {
    const token = getTokenFrom(request)

    if(token){
        return jwt.verify(token, process.env.SECRET)
    }

    return token
}

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      return authorization.substring(7)
    }
    return null
  }

module.exports = getAndDecodeToken