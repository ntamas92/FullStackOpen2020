import React from "react";
import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
  return (
    <div data-cy="blogContainer">
        <Link to={`/blogs/${blog.id}`} className="list-group-item list-group-item-action">{blog.title} by {blog.author}</Link>
    </div>
  );
};

export default Blog;
