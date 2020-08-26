import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import blogService from "./services/blogs";
import loginService from "./services/login";
import AddNewBlog from "./components/AddNewBlog";
import Notification, { notificationType } from "./components/Notification";
import Togglable from "./components/utils/Togglable";
import "./App.css";

import { setExpiringMessage } from "./state/notification/notificationActions"
import { useDispatch } from "react-redux";

const App = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);

  const dispatch = useDispatch()

  const newBlogRef = useRef();

  useEffect(() => {
    const storedUser = window.localStorage.getItem("loggedInUser");
    if (storedUser) {
      console.log(storedUser);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      blogService.getAll(user.token).then((blogs) => {
        setBlogs(blogs);
      });
    }
  }, [user]);

  const handleLogin = async ({ username, password }) => {
    let credentials;
    try {
      credentials = await loginService.login({ username, password });
    } catch (error) {
      showNotification(`Error during login: ${error}`, notificationType.ERROR);
      return;
    }

    if (credentials) {
      window.localStorage.setItem("loggedInUser", JSON.stringify(credentials));
      setUser(credentials);
      showNotification("User logged in", notificationType.INFO);
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  const handleAddNewBlog = async (blogDetails) => {
    const result = await blogService.addNewBlog(blogDetails, user.token);
    setBlogs(blogs.concat(result));
    showNotification("Blog added", notificationType.INFO);
    newBlogRef.current.toggleVisibility();
  };

  const handleLikeClicked = async (blog) => {
    const updatedBlog = await blogService.incrementLikes(blog, user.token);
    setBlogs(blogs.map((x) => (x.id !== updatedBlog.id ? x : updatedBlog)));
  };

  const handleRemoveBlog = async (blog) => {
    await blogService.removeBlog(blog, user.token);
    setBlogs(blogs.filter((x) => x !== blog));
  };

  const showNotification = (message, notificationType) => {
    dispatch(setExpiringMessage({ message, notificationType }, 5000))
  };

  return (
    <div>
      <Notification />

      <h2>login</h2>
      {user === null ? (
        <Login handleLogin={handleLogin} />
      ) : (
          <div>
            <p>{user.name} logged in</p>
            <button type="button" onClick={handleLogout}>
              logout
          </button>
          </div>
        )}

      {user && (
        <>
          <Togglable buttonLabel="new blog" ref={newBlogRef}>
            <h2>create new</h2>
            <AddNewBlog submitNewBlog={handleAddNewBlog} />
          </Togglable>

          <h2>blogs</h2>
          {blogs
            .filter((blog) => blog)
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog key={blog.id} blog={blog} handleLikeClicked={handleLikeClicked} handleRemoveBlog={handleRemoveBlog} />
            ))}
        </>
      )}
    </div>
  );
};

export default App;
