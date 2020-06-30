import React, { useState } from "react";
import Filter from "./components/filter";
import PersonForm from "./components/personForm";
import Persons from "./components/persons";

const defaultPersons = [
  { name: "Arto Hellas", number: "040-123456" },
  { name: "Ada Lovelace", number: "39-44-5323523" },
  { name: "Dan Abramov", number: "12-43-234345" },
  { name: "Mary Poppendieck", number: "39-23-6423122" },
];

const App = () => {
  const [persons, setPersons] = useState(defaultPersons);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterText, setFilterText] = useState("");

  const addNewName = (event) => {
    event.preventDefault();
    if (persons.findIndex((x) => x.name === newName) !== -1) {
      alert(`${newName} is already added to the phonebook`);
      return;
    }

    const newPerson = { name: newName, number: newNumber };
    setPersons(persons.concat(newPerson));
  };

  return (
    <div>
      <h1>Phonebook</h1>

      <Filter
        filterText={filterText}
        onFilterChange={(event) => setFilterText(event.target.value)}
      />

      <h3>Add a new</h3>
      <PersonForm
        name={newName}
        setNewNameHandler={(event) => setNewName(event.target.value)}
        number={newNumber}
        setNewNumberHandler={(event) => setNewNumber(event.target.value)}
        addNewNameHandler={addNewName}
      />

      <h3>Numbers</h3>
      <Persons persons={persons} filterText={filterText} />
    </div>
  );
};

export default App;
