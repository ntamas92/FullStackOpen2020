import React, { useEffect, useRef } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./App.css";

import Blog from "./components/Blog";
import Login from "./components/Login";
import Users from "./components/Users"
import AddNewBlog from "./components/AddNewBlog";
import Togglable from "./components/utils/Togglable";
import Notification, { notificationType } from "./components/Notification";

import blogsActions from "./state/blogs/blogsActions"

import { setExpiringMessage } from "./state/notification/notificationActions"

import userActions from "./state/user/userActions"

const App = () => {
  const dispatch = useDispatch()

  const blogs = useSelector(store => store.blogs)
  const user = useSelector(store => store.user)

  const newBlogRef = useRef();

  useEffect(() => {
    const storedUser = window.localStorage.getItem("loggedInUser");
    console.log("storeduser", storedUser)
    if (storedUser) {
      dispatch(userActions.setUser(JSON.parse(storedUser)))
    }
  }, [dispatch]);

  useEffect(() => { dispatch(blogsActions.initializeBlogs()) }, [user, dispatch]);

  const handleLogout = () => {
    window.localStorage.clear();
    dispatch(userActions.setUser(null))
  };

  const handleAddNewBlog = async (blogDetails) => {
    dispatch(blogsActions.addBlog(blogDetails));
    showNotification("Blog added", notificationType.INFO);
    newBlogRef.current.toggleVisibility();
  };

  const showNotification = (message, notificationType) => {
    dispatch(setExpiringMessage({ message, notificationType }, 5000))
  };

  return (
    <div>
      <Notification />

      <h2>login</h2>
      {user === null ? (
        <Login />
      ) : (
          <div>
            <p>{user.name} logged in</p>
            <button type="button" onClick={handleLogout}>
              logout
          </button>
          </div>
        )}

      <Switch>
        <Route path="/users">
          <Users />
        </Route>

        <Route path="/">
          {user && (
            <>
              <Togglable buttonLabel="new blog" ref={newBlogRef}>
                <h2>create new</h2>
                <AddNewBlog submitNewBlog={handleAddNewBlog} />
              </Togglable>

              <h2>Blogs</h2>
              {blogs
                .filter((blog) => blog)
                .sort((a, b) => b.likes - a.likes)
                .map((blog) => <Blog key={blog.id} blog={blog} />)}
            </>
          )}
        </Route>
      </Switch>


    </div>
  );
};

export default App;
