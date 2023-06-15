import { useState } from 'react'
const Header= ()=>{
  return(
    <h1>
    Give Feedback
    </h1>
  )
}
const Statsline = ({text,value})=>{
  return(
    <p>{text} {value}</p>
  )
}
const Stats =({good,bad,neutral})=>{
  let all=good+bad+neutral
  let average=(good-bad)/(good+bad+neutral) || 0
  let positive=good/(good+bad+neutral)*100 || 0
  positive=positive+"%";
  if(all === 0)
  return(
    <h3>No feedback given</h3>
  )
  return(
    <>
    <h3>Statistics</h3>
    <Statsline text="good" value={good}/>
    <Statsline text="neutral" value={neutral}/>
    <Statsline text="bad" value={bad}/>
    <Statsline text="all" value={all}/>
    <Statsline text="average" value={average}/>
    <Statsline text="good" value={good}/>
    <Statsline text="positive" value={positive}/>
    </>
  )
}
const Button = ({text,handleclick})=>{
  return(
  <button onClick={handleclick}>
    {text}
  </button>
  )
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const handleGood=()=>setGood(good+1)
  const handleNeutral=()=>setNeutral(neutral+1)
  const handleBad=()=>setBad(bad+1)
  return (
    <div>
      <Header/>
      <Button text="good" handleclick={handleGood}/>
      <Button text="netural" handleclick={handleNeutral}/>
      <Button text="bad" handleclick={handleBad}/>
      <Stats
      good={good}
      bad={bad}
      neutral={neutral}/>
    </div>
  )
}
export default App;