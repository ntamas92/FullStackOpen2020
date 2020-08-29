import React, { useState } from "react";

import { setExpiringMessage } from "../state/notification/notificationActions"
import { notificationType } from "./Notification";
import { useDispatch } from "react-redux";

import blogsActions from "../state/blogs/blogsActions"

const defaultBlogDetails = { title: "", author: "", url: "" };

const AddNewBlog = ({ newBlogToggleRef }) => {
  const dispatch = useDispatch()

  const handleAddNewBlog = (event) => {
    event.preventDefault();
    dispatch(blogsActions.addBlog(blogDetails));
    showNotification("Blog added", notificationType.INFO);
    newBlogToggleRef.current.toggleVisibility();
    console.log(blogDetails);
    setBlogDetails(defaultBlogDetails);
  };

  const showNotification = (message, notificationType) => {
    dispatch(setExpiringMessage({ message, type: notificationType }, 5000))
  };

  const [blogDetails, setBlogDetails] = useState(defaultBlogDetails);

  return (
    <div>
      <form data-cy="login-form" id="login-form" onSubmit={handleAddNewBlog}>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            id="title"
            className="form-control"
            value={blogDetails.title}
            onChange={({ target }) => setBlogDetails({ ...blogDetails, title: target.value })}></input>
          <label>Author:</label>
          <input
            type="text"
            id="author"
            className="form-control"
            value={blogDetails.author}
            onChange={({ target }) => setBlogDetails({ ...blogDetails, author: target.value })}></input>
          <label>Url:</label>
          <input
            type="text"
            id="url"
            className="form-control"
            value={blogDetails.url}
            onChange={({ target }) => setBlogDetails({ ...blogDetails, url: target.value })}></input>
          <button variant="primary" type="submit" className="btn btn-primary">Create</button>
        </div>
      </form>
    </div>
  );
};

export default AddNewBlog;
