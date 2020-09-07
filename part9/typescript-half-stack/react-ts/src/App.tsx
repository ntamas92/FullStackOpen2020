import React from "react";
import { CoursePart } from "./types/CourseParts";
import { assert } from "console";

const Header: React.FC<{ courseName: string }> = ({ courseName }) => {
  return (
    <div className="header">
      <h1>{courseName}</h1>
    </div>
  )
}

const Content: React.FC<{ parts: Array<{ name: string; exerciseCount: number }> }> = ({ parts }) => {
  return (
    <div className="content">
      {parts.map((part, index) => <div key={index} style={{ border: '1px solid black', margin:'5px' }}>
        <Part coursePart={part} /></div>)}
    </div>
  )
}

const Total: React.FC<{ totalExercises: number }> = ({ totalExercises }) => {
  return (
    <div className="total">
      Number of exercises: {totalExercises}
    </div>
  )
}

const Part: React.FC<{ coursePart: CoursePart }> = ({ coursePart }) => {

  const BaseContent = () => (
    <>
      <p>{coursePart.name} {coursePart.exerciseCount} </p>
      {coursePart.description && <p>description: {coursePart.description}</p>}
    </>
  )

  if ("groupProjectCount" in coursePart) {
    return (
      <div>
        <BaseContent />
        <p>group project count: {coursePart.groupProjectCount}</p>
      </div>)
  }
  else if ("exerciseSubmissionLink" in coursePart) {
    return (<div>
      <BaseContent />
      <p>exerciseSubmissionLink: {coursePart.exerciseSubmissionLink}</p>
    </div>)
  }

  return <BaseContent />
}


const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts: Array<CoursePart> = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    }
  ];

  return (
    <div>
      <Header courseName={courseName} />
      <Content parts={courseParts} />
      <Total totalExercises={courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)} />
    </div>
  );
}

export default App;