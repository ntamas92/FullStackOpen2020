import React from "react";
import { Link } from "react-router-dom";

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: "solid",
  borderWidth: 1,
  marginBottom: 5,
};


const Blog = ({ blog }) => {
  return (
    <div data-cy="blogContainer" className="blog" style={blogStyle}>
      <div>
        <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
      </div>
    </div>
  );
};

export default Blog;
