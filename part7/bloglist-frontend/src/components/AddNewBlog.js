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
    dispatch(setExpiringMessage({ message, notificationType }, 5000))
  };

  const [blogDetails, setBlogDetails] = useState(defaultBlogDetails);

  return (
    <div>
      <form id="addNewBlogForm" onSubmit={handleAddNewBlog}>
        <div>
          title:{" "}
          <input
            type="text"
            id="title"
            value={blogDetails.title}
            onChange={({ target }) => setBlogDetails({ ...blogDetails, title: target.value })}></input>
        </div>
        <div>
          author:{" "}
          <input
            type="text"
            id="author"
            value={blogDetails.author}
            onChange={({ target }) => setBlogDetails({ ...blogDetails, author: target.value })}></input>
        </div>
        <div>
          url:{" "}
          <input
            type="text"
            id="url"
            value={blogDetails.url}
            onChange={({ target }) => setBlogDetails({ ...blogDetails, url: target.value })}></input>
        </div>
        <button id="submitCreateBlog" type="submit">create</button>
      </form>
    </div>
  );
};

export default AddNewBlog;
