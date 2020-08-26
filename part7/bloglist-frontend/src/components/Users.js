import React from "react"
import { useSelector } from "react-redux"

const Users = () => {
  const users = useSelector(store => store.users)
  console.log(users)
  return (
    <div>
      <table>
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>

        {users.map(x => <tr key={x.id}>
          <td>
            {x.name}
          </td>
          <td>
            {x.blogs.length}
          </td>
        </tr>)}

      </table>
    </div>)
}

export default Users