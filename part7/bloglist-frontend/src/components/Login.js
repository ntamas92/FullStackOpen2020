import React from "react";
import loginService from "../services/login"
import { useDispatch, useSelector } from "react-redux";

import { useField } from "../hooks/useField"

import { setExpiringMessage } from "../state/notification/notificationActions"
import userActions from "../state/user/userActions"
import { notificationType } from "./Notification";
import { useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

const Login = () => {
  const dispatch = useDispatch()
  const user = useSelector(store => store.user)
  const history = useHistory()

  const handleLogin = async (username, password) => {

    let credentials;
    try {
      credentials = await loginService.login({ username, password });
    } catch (error) {
      showNotification(`Error during login: ${error}`, notificationType.ERROR);
      return;
    }

    if (credentials) {
      window.localStorage.setItem("loggedInUser", JSON.stringify(credentials));
      dispatch(userActions.setUser(credentials))
      showNotification("User logged in", notificationType.INFO);
      history.replace("/")
    }
  };

  const showNotification = (message, notificationType) => {
    dispatch(setExpiringMessage({ message, type: notificationType }, 5000))
  }

  return (!user && <LoginForm handleLogin={handleLogin} />);
};

const LoginForm = ({ handleLogin }) => {
  const [username, resetUsername] = useField("text")
  const [password, resetPassword] = useField("password")

  const onLogin = (event) => {
    event.preventDefault();

    handleLogin(username.value, password.value)

    resetUsername()
    resetPassword()
  }

  return (
    <div>
      <h2>Login</h2>
      <form data-cy="login-form" id="login-form" onSubmit={(event) => onLogin(event, username, password)}>
        <div className="form-group">
          <label>Username:</label>
          <input type="text" name="username" className="form-control" {...username} />
          <label>Password:</label>
          <input type="password" name="password" className="form-control" {...password} />
          <button variant="primary" type="submit" className="btn btn-primary">Login</button>
        </div>
      </form>
    </div>
  )
}

export default Login;
