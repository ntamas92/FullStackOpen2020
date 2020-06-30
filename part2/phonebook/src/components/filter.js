import React from "react";

const Filter = ({ filterText, onFilterChange }) => 
  <p>
    filter shown with
    <input value={filterText} onChange={onFilterChange} />
  </p>;

export default Filter;