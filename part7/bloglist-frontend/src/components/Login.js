import React, { useState } from "react";
import PropTypes from "prop-types";

const Login = ({ handleLogin }) => {
  Login.propTypes = {
    handleLogin: PropTypes.func.isRequired,
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginEvent = async (event) => {
    event.preventDefault();
    handleLogin({ username, password });
  };

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
