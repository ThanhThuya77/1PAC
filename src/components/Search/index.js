
import React from 'react';

const Search = (props) => {
  return (
    <div className="search">
      <i className="fas fa-search"></i>
      <input
        value={props.value}
        type="text"
        className="search-input"
        placeholder="search"
        onChange={(e) => props.handleSearch(e)}
        id="search-bar"
      />
    </div>
  );
};

export default Search;
