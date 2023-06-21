const Header = (props) => {
  console.log(props)
  return <h1>{props.course}</h1>;
};

const Part = (props) =>{
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  )
}
const Content = ({parts}) => {
  return (
    <>
    {parts.map(part=><Part part={part.name} exercises={part.exercises}/>)}
    </>
  );
};

const Total = ({parts}) => {
return(  <p>Total : {parts.reduce((result,item)=>result+item.exercises,0)}</p>)

}
const Course=({course})=>{
  return(
    <div>
    <Header course={course.name} />
    <Content
     parts={course.parts}
    />
    <Total parts={course.parts}/>
  </div>
  )
}

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
        exercises: 15
      },
      {
        name:'Redux',
        exercises:13
      }
    ]
  }

  return (
  <Course course={course} />
  )
};

export default App;
