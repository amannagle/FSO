import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");
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
    };
    console.log("person object", newPerson);
    setPersons([...persons, newPerson]);
    setNewName("");
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handlechange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map((person) => (
          <p key={person.name}>{person.name}</p>
        ))}
      </div>
    </div>
  );
};

export default App;
