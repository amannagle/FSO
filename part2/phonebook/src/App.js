import { useState } from "react";
const Filter=({handleFilter,filterBy})=>{
return(
  <p>Filter people shown with <input value={filterBy} onChange={handleFilter}/></p>
)
}

const Persons = ({persons})=>{
  return(
    <div>
        {persons.map((person) => (
          <p key={person.name}>{person.name} {person.phone}</p>
        ))}
      </div> 
  )
}

const PersonForm = ({handleSubmit,newName,newNumber,handlechange,setNewNumber})=>{
  return (
    <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handlechange} />
          <br/>
          phone: <input value={newNumber} onChange={(e)=>{setNewNumber(e.target.value)}} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}
const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', phone: '040-123456', id: 1 },
  { name: 'Ada Lovelace', phone: '39-44-5323523', id: 2 },
  { name: 'Dan Abramov', phone: '12-43-234345', id: 3 },
  { name: 'Mary Poppendieck', phone: '39-23-6423122', id: 4 }]);
  const [newName, setNewName] = useState("");
  const [newNumber,setNewNumber] = useState("")
  const [filterBy,setFilterBy] = useState("")
  const handlechange = (e) => {
    console.log(e.target.value);
    setNewName(e.target.value);
  };
  let  personsFiltered=persons.filter(person=>person.name.toLowerCase().startsWith(filterBy.toLowerCase()))
  const handleFilter=(e)=>{
     setFilterBy(e.target.value);
    
     console.log(personsFiltered);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit clicked");
    const names = persons.map((person) => person.name);
    if (names.includes(newName.toLowerCase())) {
      console.log(newName)
      alert(`${newName} is already added to phonebook`);
      setNewName("");
      return;
    }
    const newPerson = {
      name: newName,
      phone:newNumber
    };
    console.log("person object", newPerson);
    setPersons([...persons, newPerson]);
    setNewName("");
    setNewNumber("");
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter}
      filterBy={filterBy}/>
      <PersonForm
      handleSubmit={handleSubmit}
      newName={newName}
      newNumber={newNumber}
      handlechange={handlechange}
      setNewNumber={setNewNumber}/>
      
      <h2>Numbers</h2>
      <Persons persons={personsFiltered}
     />
    </div>
  );
};

export default App;
