import React, { useState } from "react";
import loginService from "../services/login"
import { useDispatch } from "react-redux";

import { setExpiringMessage } from "../state/notification/notificationActions"
import userActions from "../state/user/userActions"
import { notificationType } from "./Notification";



const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch()

  const handleLoginEvent = async (event) => {
    event.preventDefault();
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
    }
  };

  const showNotification = (message, notificationType) => {
    dispatch(setExpiringMessage({ message, notificationType }, 5000))
  }

  return (
    <div>
      <form data-cy="login-form" id="login-form" onSubmit={(event) => handleLoginEvent(event)}>
        <div>
          Username:
          <input type="text" value={username} name="username" onChange={(event) => setUsername(event.target.value)} />
        </div>
        <div>
          Password:
          <input type="password" value={password} name="password" onChange={(event) => setPassword(event.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
