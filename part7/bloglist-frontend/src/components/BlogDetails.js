import React from "react"
import { useParams, useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import blogsActions from "../state/blogs/blogsActions";

const BlogDetails = () => {
  const { id } = useParams()
  const blogs = useSelector(store => store.blogs)
  const blog = blogs.find(x => x.id === id)

  const dispatch = useDispatch()
  const history = useHistory()

  const handleLikeClicked = async () => {
    dispatch(blogsActions.incrementLikesOnBlog(blog));
  };

  const handleRemoveBlog = async (blog) => {
    dispatch(blogsActions.removeBlog(blog));
    history.replace("/")
  };

  if (!blog) {
    return null
  }

  return (
    <div className="blog-details">
      <div>
        <div>{blog.title} <br /></div>
        <div><a href={blog.url}>{blog.url}</a></div>
        <div>likes: {blog.likes}{" "}
          <button id="likeButton" type="button" onClick={() => handleLikeClicked(blog)}>
            like
        </button>{" "}
        </div>
        <div>Added by: {blog.author}</div>
        <div>
          <button id="removeBlogButton" type="button" onClick={() => window.confirm(`Remove ${blog.title} by ${blog.author}?`) && handleRemoveBlog(blog)}>
            remove
          </button>
        </div>
      </div>
    </div>
  )
}

export default BlogDetails