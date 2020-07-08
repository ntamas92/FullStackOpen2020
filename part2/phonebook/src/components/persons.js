import React from "react";

const handleDeletion = (person, deletionHandler) => () => {
  if (window.confirm(`Delete ${person.name}?`)) {
    deletionHandler(person);
  }
};

const RenderPersons = ({ persons, filterText, deletionHandler }) => (
  <ul>
    {persons
      .filter((person) => {
        return person.name.toUpperCase().includes(filterText.toUpperCase());
      })
      .map((person) => (
        <li key={person.name}>
          {person.name}: {person.number}
          <button type="button" onClick={handleDeletion(person, deletionHandler)}>
            delete
          </button>
        </li>
      ))}
  </ul>
);

export default RenderPersons;
