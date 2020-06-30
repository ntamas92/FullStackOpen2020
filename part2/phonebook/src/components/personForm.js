import React from 'react'

const PersonForm = ({
    name,
    number,
    setNewNameHandler,
    setNewNumberHandler,
    addNewNameHandler,
  }) => 
    <form onSubmit={addNewNameHandler}>
      <div>
        name: <input value={name} onChange={setNewNameHandler} />
      </div>
      <div>
        number: <input value={number} onChange={setNewNumberHandler} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>;
  
export default PersonForm;