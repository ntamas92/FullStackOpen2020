import React from "react";

const Header = (props) => <h1>{props.course}</h1>;

const Part = (props) => (
  <p>
    {props.name} {props.excerciseNum}
  </p>
);

const Content = (props) => {
  return props.parts.map((element) => (
    <Part key={element.id} name={element.name} excerciseNum={element.exercises} />
  ));
};

const Total = (props) => <p><b>total of {props.totalExcerciseNum} excercises</b></p>;

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total totalExcerciseNum={course.parts.map((x) => x.exercises).reduce((x, y) => x + y, 0)} />
    </div>
  );
};

export default Course;
