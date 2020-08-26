import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const Users = () => {
  const users = useSelector(store => store.users)

  console.log(users)
  return (
    <div>
      <table>
        <thead>
          <th></th>
          <th>blogs created</th>
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