import { useState } from "react";
import Phoneservice from "./Service/Phone";
import { useEffect } from "react";
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

  const handleDelete = (person) => {
    if(window.confirm(`delete ${person.name} ?`))
    {
    console.log("we need to delete person",person);
    const id=person.id;
    console.log("This id will be deleted",id);
    Phoneservice.deletePerson(person,person.id).then(response=>
      setPersons(persons.filter((person)=>person.id!==id))
    )
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
    person.name.toLowerCase().startsWith(filterBy.toLowerCase())
  );
  const handleFilter = (e) => {
    setFilterBy(e.target);
    console.log(personsFiltered);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit clicked");
    const names = persons.map((person) => person.name.toLowerCase());
    console.log(names);
    if (names.includes(newName.toLowerCase())) {
      console.log("name was already present")
      console.log(newName);
      alert(`${newName} is already added to phonebook`);
      setNewName("");
      return;
    }
    console.log("name wasnt present")
    const newPerson = {
      name: newName,
      phone: newNumber,
    };
    console.log("person object", newPerson);
    Phoneservice.add(newPerson).then(response=>{
      setPersons([...persons, response]);
      setNewName("");
      setNewNumber("");
    })
  };
  return (
    <div>
      <h2>Phonebook</h2>
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
