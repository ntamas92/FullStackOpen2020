import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { setFilterAction } from "../reducers/filterReducer"

const Filter = () => {
  const filterMessage = useSelector(state => state.filter)
  const dispatch = useDispatch()

  return (
    <div style={{marginBottom: 10}}>
      filter <input value={filterMessage} onChange={evt => dispatch(setFilterAction(evt.target.value))} />
    </div>
  )
}

export default Filter
