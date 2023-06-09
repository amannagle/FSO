import { useState } from 'react'
const Button =({text,handleclick})=>
{
  return(
    <button onClick={handleclick}>{text}</button>
  )
}
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [votes,setVotes]=useState(Array(8).fill(0));
  const [selected, setSelected] = useState(0)
  const [max,setMax]=useState(0)
  const handleVote=()=>{
    
    let new_vote=[...votes]
    new_vote[selected]=new_vote[selected]+1;
    setVotes(new_vote)
    console.log(new_vote)
     let max=Math.max(...new_vote);
    console.log("max=",max)
    max=new_vote.indexOf(max)
    console.log("index of max",max)
    setMax(max)
  }
  const handleclick=()=>{
    let random = Math.floor(Math.random()*anecdotes.length)
    setSelected(random);
    console.log("selected",random)
  }
  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br/>
      has {votes[selected]} votes
      <Button text=
      "next anecdote" handleclick={handleclick}/>
      <Button text="vote" handleclick={handleVote}/>
    <h1>Anecdote with the most votes</h1>
    {anecdotes[max]}
    </div>
  )
}

export default App