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
      .catch((error)=>
        alert("id is not present or already deleted")
      );
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
    if (names.includes(newName.toLowerCase())) {
      if(window.confirm(`${newName} is already present in the Phonebook, replace old number with new ?`))
      {
        const obj=persons.find(person=>person.name===newName);
        const id=obj.id;
        console.log(`${id} needs to be updated with ${newNumber} and the old object is`,obj)
        const newobj={...obj,phone:newNumber};
        console.log(newobj,'is the updated object')
        Phoneservice.update(id,newobj)
        .then(response => { 
          setPersons(persons.map(person => person.id !== id ? person : response))
          setNewName("");
          setNewNumber("");
        })
        return
      }
      else
      return
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
