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

      <div className="comments">
        <h2>Comments</h2>

        <input {...commentField} />
        <button type="button" onClick={handleAddComment} >Add comment</button>

        <ul>
          {blog.comments.map((x, ind) => <li key={ind}>{x.text}</li>)}
        </ul>
      </div>
    </div>
  )
}

export default BlogDetails