import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { Navbar, Nav } from "react-bootstrap"

import userActions from "../state/user/userActions"

import { Button } from "react-bootstrap"

const Menu = () => {
  const user = useSelector(store => store.user)
  const dispatch = useDispatch()

  const handleLogout = () => {
    window.localStorage.clear();
    dispatch(userActions.setUser(null))
  };

  const LoggedInUserForm = ({ user, handleLogout }) => (
    <>
      <p className="text-light" >{user.name} logged in
      <Button type="button" style={{ marginLeft: 5 }} onClick={handleLogout}>
          logout
      </Button></p>
    </>
  )

  return (
    <div>
      {user &&
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#" as="span">
                <Link to="/users" >Users</Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link to="/blogs" >Blogs</Link></Nav.Link>
              <Nav.Item as="span" >
                <LoggedInUserForm user={user} handleLogout={handleLogout}  />
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Navbar>}
    </div>
  )
}

export default Menu