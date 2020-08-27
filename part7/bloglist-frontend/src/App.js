import React, { useEffect, useRef } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./App.css";

import Blog from "./components/Blog";
import Login from "./components/Login";
import Users from "./components/Users"
import AddNewBlog from "./components/AddNewBlog";
import Togglable from "./components/utils/Togglable";
import Notification from "./components/Notification";
import UserDetails from "./components/UserDetails";

import blogsActions from "./state/blogs/blogsActions"
import usersActions from "./state/users/usersActions";
import BlogDetails from "./components/BlogDetails";

const App = () => {
  const dispatch = useDispatch()

  const blogs = useSelector(store => store.blogs)
  const user = useSelector(store => store.user)

  const newBlogRef = useRef();

  useEffect(() => {
    if (user) {
      dispatch(blogsActions.initializeBlogs())
      dispatch(usersActions.initializeUsers())
    }
  }, [user, dispatch]);

  return (
    <div>
      <Notification />

      <h2>Login</h2>
      <Login />

      {user && (
        <Switch>
          <Route path="/users/:id">
            <h2>User details</h2>
            <UserDetails />
          </Route>
          <Route path="/users">
            <h2>Users</h2>
            <Users />
          </Route>
          <Route path="/blogs/:id">
            <h2>Blogs</h2>
            <BlogDetails />
          </Route>

          <Route path="/">
            <div className="blogs">
              <Togglable buttonLabel="Create new blog" ref={newBlogRef}>
                <h2>Create new blog</h2>
                <AddNewBlog newBlogToggleRef={newBlogRef} />
              </Togglable>

              <h2>Blogs</h2>
              {blogs
                .filter((blog) => blog)
                .sort((a, b) => b.likes - a.likes)
                .map((blog) => <Blog key={blog.id} blog={blog} />)}
            </div>
          </Route>
        </Switch>
      )}
    </div>
  );
};

export default App;
