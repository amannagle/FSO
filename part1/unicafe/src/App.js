import { useState } from 'react'
const Header= ()=>{
  return(
    <h1>
    Give Feedback
    </h1>
  )
}
const Stats =({good,bad,neutral})=>{
  let average=(good-bad)/(good+bad+neutral) || 0
  let positive=good/(good+bad+neutral)*100 || 0
  return(
    <>
    <h3>Statistics</h3>
    <p>good {good}</p>
    <p>netural {neutral}</p>
    <p>bad {bad}</p>
    <p>average {average}</p>
    <p>positive {positive+" %"}</p>
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