import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" , phone:"123-4944"}]);
  const [newName, setNewName] = useState("");
  const [newNumber,setNewNumber] = useState("")
  const handlechange = (e) => {
    console.log(e.target.value);
    setNewName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit clicked");
    const names = persons.map((person) => person.name);
    if (names.includes(newName.toLowerCase())) {
      alert(`${newName} is already added to the phonebook`);
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
      <h2>Numbers</h2>
      <div>
        {persons.map((person) => (
          <p key={person.name}>{person.name} {person.phone}</p>
        ))}
      </div>
    </div>
  );
};

export default App;
