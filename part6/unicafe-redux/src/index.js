import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const increment = (incrementTarget) => () => {
    store.dispatch({ type: incrementTarget })
  }

  const reset = () => {
    store.dispatch({ type: 'ZERO' })
  }

  const state = store.getState()

  return (
    <div>
      <button onClick={increment('GOOD')}>good</button>
      <button onClick={increment('OK')}>neutral</button>
      <button onClick={increment('BAD')}>bad</button>
      <button onClick={reset}>reset stats</button>
      <div>good {state.good}</div>
      <div>neutral {state.ok}</div>
      <div>bad {state.bad}</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
