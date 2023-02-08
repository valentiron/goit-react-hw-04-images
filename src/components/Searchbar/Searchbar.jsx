import { useState } from 'react';
import PropTypes from 'prop-types';

export default function Searchbar({ onSubmit }) {
  const [searchQuery, isSearchQuery] = useState(null);

  function handleChange(event) {
    isSearchQuery(event.currentTarget.value.toLowerCase());
  }

  function handleSubmit(event) {
    event.preventDefault();
    event.target.reset();

    onSubmit(searchQuery);
    isSearchQuery(null);
  }

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="button-label"></span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
