import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"

import userActions from "../state/user/userActions"

const padding = {
  paddingRight: 5,
}

const Menu = () => {
  const user = useSelector(store => store.user)
  const dispatch = useDispatch()

  const handleLogout = () => {
    window.localStorage.clear();
    dispatch(userActions.setUser(null))
  };

  const LoggedInUserForm = ({ user, handleLogout }) => (
    <>
      <b style={padding}>{user.name} logged in </b>
      <button type="button" onClick={handleLogout}>
        logout
          </button>
    </>
  )

  return (
    <div>
      {user &&
        <div>
          <Link to="/users" style={padding}>Users</Link>
          <Link to="/blogs" style={padding}>Blogs</Link>
          <LoggedInUserForm user={user} handleLogout={handleLogout} style={padding} />
        </div>}
    </div>
  )
}

export default Menu