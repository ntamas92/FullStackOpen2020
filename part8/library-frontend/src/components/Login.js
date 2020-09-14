import React, { useState, useEffect } from 'react'
import { LOGIN } from "../queries/userQueries"
import { useMutation } from '@apollo/client'

const Login = ({ setToken, setError }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [loginRequest, loginResult] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if(loginResult.data){
      const token = loginResult.data.login.value
      setToken(token)
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginResult.data])

  const onLogin = (event) => {
    event.preventDefault()
    loginRequest({ variables: { username, password } })
  }


  return <div>
    <form onSubmit={onLogin}>
      <p>
        <label>username: </label>
        <input type="text" value={username} onChange={event => { setUsername(event.target.value) }}></input>
      </p>
      <p>
        <label>password: </label>
        <input type="password" value={password} onChange={event => { setPassword(event.target.value) }}></input>
      </p>
      <button type="submit">login</button>
    </form>
  </div>
}

export default Login;