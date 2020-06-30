import React from 'react';

const RenderNumbers = ({persons, filterText}) => <ul>
  {persons
    .filter((person) => {
      return person.name.toUpperCase().includes(filterText.toUpperCase());
    })
    .map((person) => (
      <li key={person.name}>
        {person.name}: {person.number}
      </li>
    ))}
</ul>

export default RenderNumbers;