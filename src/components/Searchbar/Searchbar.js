import React from 'react';
import { ImSearch } from 'react-icons/im';
import css from './SearchBar.module.css';

class SearchBar extends React.Component {
  state = {
    search: '',
  };

  handleNameChange = e => {
    this.setState({ search: e.currentTarget.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.search.trim() === '') {
      alert('Будь ласка, введіть дані для пошуку!');
      return;
    }
    this.props.onSubmit(this.state.search);
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.searchFormButton}>
            <ImSearch />
            <span className={css.searchFormButtonLabel}>Search</span>
          </button>

          <input
            className={css.searchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleNameChange}
          />
        </form>
      </header>
    );
  }
}

export default SearchBar;
