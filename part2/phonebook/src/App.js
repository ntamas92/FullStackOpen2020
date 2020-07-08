import React, { useState, useEffect } from "react";
import Filter from "./components/filter";
import PersonForm from "./components/personForm";
import RenderPersons from "./components/persons";
import phoneBookService from "./services/phoneBookAccess";
import Notification from "./components/notification";

const defaultNotificationMessage = { message: null, isError: false }

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterText, setFilterText] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(defaultNotificationMessage);

  const notifyUser = (message, isError) => {
    setNotificationMessage({message, isError})
    setTimeout(() => {
      setNotificationMessage(defaultNotificationMessage)
    }, 5000)
  }

  useEffect(() => {
    phoneBookService.getAll().then((x) => setPersons(x));
  }, []);

  const addNewName = (event) => {
    event.preventDefault();

    const existingPerson = persons.find((x) => x.name === newName);
    if (existingPerson !== undefined) {
      updateExistingEntryIfNecessary(existingPerson);
      return;
    }

    const newPerson = { name: newName, number: newNumber };
    phoneBookService.addPhoneEntry(newPerson).then((x) => {
      setPersons(persons.concat(x));
      notifyUser(`Added ${newPerson.name}`, false);
    });
  };

  const removePersonHandler = (personToDelete) => {
    phoneBookService.removePhoneEntry(personToDelete.id).then((x) => {
      setPersons(persons.filter((x) => x.name !== personToDelete.name));
      notifyUser(`Removed ${personToDelete.name}`, false);
    });
  };

  const updateExistingEntryIfNecessary = (existingEntry) => {
    const shallUpdate = window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`);

    if (shallUpdate) {
      const updatedPerson = { ...existingEntry, number: newNumber };
      phoneBookService
        .updatePhoneEntry(existingEntry.id, updatedPerson)
        .then(() => {
          setPersons(persons.map((x) => (x.id !== updatedPerson.id ? x : updatedPerson)));
          notifyUser(`Updated ${existingEntry.name}'s phone number.`, false);
        })
        .catch((error) => {
          notifyUser(`Error happened: ${error}`, true);
        });
    }
    return;
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification {...notificationMessage} />

      <Filter filterText={filterText} onFilterChange={(event) => setFilterText(event.target.value)} />

      <h3>Add a new</h3>
      <PersonForm
        name={newName}
        setNewNameHandler={(event) => setNewName(event.target.value)}
        number={newNumber}
        setNewNumberHandler={(event) => setNewNumber(event.target.value)}
        addNewNameHandler={addNewName}
      />

      <h3>Numbers</h3>
      <RenderPersons persons={persons} filterText={filterText} deletionHandler={removePersonHandler} />
    </div>
  );
};

export default App;
