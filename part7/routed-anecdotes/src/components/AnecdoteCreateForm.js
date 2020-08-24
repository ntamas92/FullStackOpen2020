import React from "react"
import { useField } from "../hooks/useField"

const CreateNew = props => {
  //An alternative way of stripping down the reset method from useField is to 
  //export the properties of useField as is, and import them like the following:
  //const { reset: contentReset, ...content } = useField("text")
  const [content, contentReset] = useField("text")
  const [author, authorReset] = useField("text")
  const [info, infoReset] = useField("text")

  const handleSubmit = e => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    })
  }

  const resetFields = e => {
    contentReset()
    authorReset()
    infoReset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button type="submit">create</button>
        <button type="button" onClick={resetFields}>
          reset
        </button>
      </form>
    </div>
  )
}

export default CreateNew
