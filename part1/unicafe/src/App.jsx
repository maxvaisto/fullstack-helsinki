import { useState } from 'react'

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>
    {text}
  </button>
}

const StatisticLine = ({ text, value }) => {
    return <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
}


const Statistic = (props) => {
  const all = props.good + props.neutral + props.bad
  if (all === 0) {
      return <p>
      No feedback given
      </p>
  }
  return <table><thead>
        <StatisticLine text="good" value={props.good}/>
        <StatisticLine text="neutral" value={props.neutral}/>
        <StatisticLine text="bad" value={props.bad}/>
        <StatisticLine text="all" value={all}/>
        <StatisticLine text="average" value={(props.good - props.bad) / all}/>
        <StatisticLine text="positive" value={(props.good / all) * 100 + " %"}/>
      </thead></table>
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text='good' />
      <Button onClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button onClick={() => setBad(bad + 1)} text='bad' />
      <h1>statistics</h1>
      <Statistic good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App