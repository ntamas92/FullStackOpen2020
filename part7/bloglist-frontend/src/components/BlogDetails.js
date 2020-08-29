import React from "react"
import { useParams, useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import blogsActions from "../state/blogs/blogsActions";
import { useField } from "../hooks/useField"

const BlogDetails = () => {
  const { id } = useParams()
  const blogs = useSelector(store => store.blogs)
  const blog = blogs.find(x => x.id === id)

  const [commentField, resetCommentField] = useField("text")

  const dispatch = useDispatch()
  const history = useHistory()

  const handleLikeClicked = async () => {
    dispatch(blogsActions.incrementLikesOnBlog(blog));
  };

  const handleRemoveBlog = async (blog) => {
    dispatch(blogsActions.removeBlog(blog));
    history.replace("/")
  };

  const handleAddComment = async () => {
    dispatch(blogsActions.addComment(blog, { text: commentField.value }))
    resetCommentField()
  }

  if (!blog) {
    return null
  }

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{blog.title} </h5>
        <h6 className="card-subtitle mb-2 text-muted">Added by: {blog.author}</h6>
        <p className="card-text">likes: {blog.likes}{" "}
          <button id="likeButton" type="button" className="btn btn-primary" onClick={() => handleLikeClicked(blog)}>
            like
        </button>{" "}
        </p>
        <div><a href={blog.url}>{blog.url}</a></div>
        <div>
          <button id="removeBlogButton" type="button" className="btn btn-warning" onClick={() => window.confirm(`Remove ${blog.title} by ${blog.author}?`) && handleRemoveBlog(blog)}>
            remove
          </button>
        </div>
      </div>

      <div className="comments">
        <h2>Comments</h2>

        <input {...commentField} className="form-control" />
        <button type="button" className="btn btn-secondary"  onClick={handleAddComment} >Add comment</button>

        <ul>
          {blog.comments.map((x, ind) => <li key={ind}>{x.text}</li>)}
        </ul>
      </div>
    </div>
  )
}

export default BlogDetails