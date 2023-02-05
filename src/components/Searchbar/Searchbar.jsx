import { Component } from 'react';
import styles from './searchbar.module.css';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
  state = {
    search: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { onSubmit } = this.props;
    onSubmit({ ...this.state });
    this.reset();
  };

  reset() {
    this.setState({
      search: '',
    });
  }

  render() {
    const { search } = this.state;
    const { handleChange, handleSubmit } = this;
    return (
      <header className={styles.searchbar}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <button type="submit" className={styles.formButton}>
            <span className={styles.formButtonLabel}>Search</span>
          </button>

          <input
            className={styles.formInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={search}
            onChange={handleChange}
            name="search"
            required
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
