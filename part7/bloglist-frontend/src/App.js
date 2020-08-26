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

import blogService from "./services/blogs";

import { setExpiringMessage } from "./state/notification/notificationActions"
import blogsActions from "./state/blogs/blogsActions"
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

  useEffect(() => {
    if (user) {
      blogService.getAll(user.token).then((blogs) => {
        dispatch(blogsActions.setBlogs(blogs));
      });
    }
  }, [user, dispatch]);


  const handleLogout = () => {
    window.localStorage.clear();
    dispatch(userActions.setUser(null))
  };

  const handleAddNewBlog = async (blogDetails) => {
    const result = await blogService.addNewBlog(blogDetails, user.token);
    dispatch(blogsActions.addBlog(result));
    showNotification("Blog added", notificationType.INFO);
    newBlogRef.current.toggleVisibility();
  };

  const handleLikeClicked = async (blog) => {
    const updatedBlog = await blogService.incrementLikes(blog, user.token);
    dispatch(blogsActions.modifyBlog(updatedBlog));
  };

  const handleRemoveBlog = async (blog) => {
    await blogService.removeBlog(blog, user.token);
    dispatch(blogsActions.removeBlog(blog));
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

              <h2>blogs</h2>
              {blogs
                .filter((blog) => blog)
                .sort((a, b) => b.likes - a.likes)
                .map((blog) => (
                  <Blog key={blog.id} blog={blog} handleLikeClicked={handleLikeClicked} handleRemoveBlog={handleRemoveBlog} />
                ))}
            </>
          )}
        </Route>
      </Switch>


    </div>
  );
};

export default App;
