import React from "react"
import { connect } from "react-redux"
import { voteAction } from "../reducers/anecdoteReducer"
import { setExpiringNotificationMessage } from "../reducers/notificationReducer"

const mapStateToProps = state => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
  }
}

const AnecdoteList = props => {
  const anecdotes = props.anecdotes
  const filter = props.filter

  const filteredAnecdotes = anecdotes.filter(x => x.content.toLowerCase().includes(filter))

  const vote = anecdote => () => {
    props.voteAction(anecdote)
    props.setExpiringNotificationMessage(`You voted ${anecdote.content}`, 5000)
  }

  return (
    <div className="anecdote-list">
      {filteredAnecdotes
        .sort((lhs, rhs) => rhs.votes - lhs.votes)
        .map(anecdote => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={vote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  )
}

const connectedAnecdoteList = connect(mapStateToProps, { voteAction, setExpiringNotificationMessage })(AnecdoteList)
export default connectedAnecdoteList
