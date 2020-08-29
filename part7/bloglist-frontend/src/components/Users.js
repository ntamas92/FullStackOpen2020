import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const Users = () => {
  const users = useSelector(store => store.users)

  console.log(users)
  return (
    <div>
      <h2>Users</h2>

      <table className="table table-striped">
        <thead>
          <th>Username</th>
          <th>Blogs created</th>
        </thead>

        <tbody>
          {users.map(user =>
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>
                {user.blogs.length}
              </td>
            </tr>
          )}
        </tbody>

      </table>
    </div>)
}

export default Users