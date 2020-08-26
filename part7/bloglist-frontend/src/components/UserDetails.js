import React from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"

const UserDetails = () => {
  const { id } = useParams()
  const users = useSelector(store => store.users)
  const user = users.find(x => x.id === id)

  if(!user){
    return (<div>User with id {id} not found...</div>)
  }

  return (
    <div className="user-details">
      <h2>{user.name}</h2>

      <h3>Added blogs</h3>
      <ul>
        {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
      </ul>
    </div>
  )
}

export default UserDetails