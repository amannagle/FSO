import { useState } from "react";
import Phoneservice from "./Service/Phone";
import { useEffect } from "react";

const Notification = ({message})=>{
  if(!message)
  {return}
  return(
    
    <h2 className="message">{message}</h2>
  )
}

const Error = ({error})=>{
  if(!error)
  {return}
  return(
    
    <h2 className="error">{error}</h2>
  )
}
const Filter = ({ handleFilter, filterBy }) => {
  return (
    <p>
      Filter people shown with{" "}
      <input value={filterBy} onChange={handleFilter} />
    </p>
  );
};

const Persons = ({ persons,handleDelete }) => {
  return (
    <div>
      {persons.map((person) => (
        <p key={person.name}>
          {person.name} {person.phone}
          <button onClick={()=>handleDelete(person)}>delete</button>
        </p>
        
      ))}
    </div>
  );
};

const PersonForm = ({
  handleSubmit,
  newName,
  newNumber,
  handlechange,
  setNewNumber,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={newName} onChange={handlechange} />
        <br />
        phone:{" "}
        <input
          value={newNumber}
          onChange={(e) => {
            setNewNumber(e.target.value);
          }}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  console.log("persons object is",persons);
  console.log("filter by value is",filterBy)
  const handleDelete = (person) => {
    if (window.confirm(`delete ${person.name} ?`)) {
      console.log("we need to delete person", person);
      const id = person.id;
      console.log("This id will be deleted", id);
      Phoneservice.deletePerson(id).then((response) =>
        setPersons(persons.filter((person) => person.id !== id))
      )
      .catch((error)=>{
       setError(`Information of ${person.name} has already been deleted`)
       setPersons(persons.filter(person => person.id !== id))
       setTimeout(()=>{
        setError("")
      },10000)
    })
    }
  };
  
  
  const getPersons = () => {
    Phoneservice.getAll()
    .then((response) => setPersons(response));
  };
  useEffect(getPersons, []);
  const handlechange = (e) => {
    console.log(e.target.value);
    setNewName(e.target.value);
  };
  let personsFiltered = persons.filter((person) =>
    person?.name?.toLowerCase()?.startsWith(filterBy.toLowerCase())
  );
  const handleFilter = (e) => {
    setFilterBy(e.target.value);
    console.log(personsFiltered);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit clicked");
    const names = persons.map((person) => person.name.toLowerCase());
    console.log(names);
    const newPerson = {
      name: newName,
      phone: newNumber,
    };
    console.log("person object", newPerson);
    Phoneservice.add(newPerson).then(response=>{
      setPersons([...persons, response]);
      setMessage(`${newPerson.name} Added`)
      setTimeout(()=>{
        setMessage("")
      },10000)
      setNewName("");
      setNewNumber("");
    })
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Error error={error} />
      <Filter handleFilter={handleFilter} filterBy={filterBy} />
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        newNumber={newNumber}
        handlechange={handlechange}
        setNewNumber={setNewNumber}
      />

      <h2>Numbers</h2>
      <Persons persons={personsFiltered} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
