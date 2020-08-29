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
    <div className="list-group">
      <h2>{user.name} details</h2>

      <h4>Added blogs:</h4>
      <ul>
        {user.blogs.map(blog => <li className="list-group-item" key={blog.id}>{blog.title}</li>)}
      </ul>
    </div>
  )
}

export default UserDetails