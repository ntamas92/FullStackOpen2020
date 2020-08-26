import React, { useState } from "react";
import { useDispatch } from "react-redux"

import blogsActions from "../state/blogs/blogsActions"

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: "solid",
  borderWidth: 1,
  marginBottom: 5,
};

const overview = (blog) => (
  <div>
    {blog.title} by {blog.author}
  </div>
);

const detailedView = (blog, handleLikeClicked, handleRemoveBlog) => (
  <div>
    {blog.title} <br />
    {blog.url} <br />
    likes: {blog.likes}{" "}
    <button id="likeButton" type="button" onClick={() => handleLikeClicked(blog)}>
      like
    </button>{" "}
    <br />
    {blog.author} <br />
    <button id="removeBlogButton" type="button" onClick={() => window.confirm(`Remove ${blog.title} by ${blog.author}?`) && handleRemoveBlog(blog)}>
      remove
    </button>
  </div>
);

const Blog = ({ blog }) => {
  const [showDetailedView, setShowDetailedView] = useState(false);

  const dispatch = useDispatch()

  const handleLikeClicked = async () => {
     dispatch(blogsActions.incrementLikesOnBlog());
  };

  const handleRemoveBlog = async (blog) => {
    dispatch(blogsActions.removeBlog(blog));
  };

  return (
    <div data-cy="blogContainer" className="blog" style={blogStyle}>
      {showDetailedView ? detailedView(blog, handleLikeClicked, handleRemoveBlog) : overview(blog)}

      <button type="button" onClick={() => setShowDetailedView(!showDetailedView)}>
        {showDetailedView ? "hide" : "show"}
      </button>
    </div>
  );
};

export default Blog;
