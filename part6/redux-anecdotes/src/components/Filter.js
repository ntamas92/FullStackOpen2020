import React from "react"
import { connect } from "react-redux"
import { setFilterAction } from "../reducers/filterReducer"

const Filter = props => {
  const filterMessage = props.filter

  return (
    <div style={{ marginBottom: 10 }}>
      filter <input value={filterMessage} onChange={evt => props.setFilterAction(evt.target.value)} />
    </div>
  )
}

const connectedFilter = connect(
  state => { return { filter: state.filter } },
  { setFilterAction }
)(Filter)

export default connectedFilter
