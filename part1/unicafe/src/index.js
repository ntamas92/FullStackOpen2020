import React, { useState } from "react";
import ReactDOM from "react-dom";

const Statistic = ({ text, value }) => (
  <>
    <td>{text}</td>
    <td>{value}</td>
  </>
);

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;

  if (all === 0) {
    return (
      <div>
        <p>No statistics given</p>
      </div>
    );
  }

  return (
    <table>
      <tr>
        <Statistic text="good" value={good} />
      </tr>
      <tr>
        <Statistic text="neutral" value={neutral} />
      </tr>
      <tr>
        <Statistic text="bad" value={bad} />
      </tr>
      <tr>
        <Statistic text="all" value={all} />
      </tr>
      <tr>
        <Statistic text="average" value={(good - bad) / all} />
      </tr>
      <tr>
        <Statistic text="positive" value={(good / all) * 100 + " %"} />
      </tr>
    </table>
  );
};

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
