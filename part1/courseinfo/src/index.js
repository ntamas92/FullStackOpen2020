import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => (
  <h1>{props.course}</h1>
)

const Part = (props) => (
  <p>
    {props.name} {props.excerciseNum}
  </p>
)

const Content = (props) => {
  return props.parts.map(element => 
      <Part name={element.name} excerciseNum={element.exercises}/>
    )
}

const Total = (props) => (
  <p>Number of exercises {props.totalExcerciseNum}</p>
)
  



const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ],

    totalExercises: function() { 
      return this.parts.map(x => x.exercises).reduce((x, y) => x + y, 0)
    }
  }

  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts} />
      <Total totalExcerciseNum={course.totalExercises()}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))