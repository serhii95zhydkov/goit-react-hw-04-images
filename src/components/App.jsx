import { Component } from 'react';
import { searchImages } from 'services/api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

import styles from 'index.css';

export class App extends Component {
  state = {
    search: '',
    items: [],
    loading: false,
    error: null,
    page: 1,
    showModal: false,
    largeImageURL: '',
  };

  componentDidUpdate(_, prevState) {
    const { search, page } = this.state;
    if (prevState.search !== search || prevState.page !== page) {
      this.fetchImages();
    }
  }

  async fetchImages() {
    try {
      this.setState({ loading: true });
      const { search, page } = this.state;
      const { hits } = await searchImages(search, page);
      this.setState(({ items }) => ({
        items: [...items, ...hits],
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  }

  searchImages = ({ search }) => {
    this.setState({ search, items: [], page: 1 });
  };

  loadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  openModal = data => {
    this.setState({
      showModal: true,
      largeImageURL: data,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      largeImageURL: '',
    });
  };

  render() {
    const { items, loading, error, showModal, largeImageURL } = this.state;
    const { searchImages, loadMore, openModal, closeModal } = this;
    return (
      <div className={styles.app}>
        <Searchbar onSubmit={searchImages} />
        {items.length > 0 && (
          <ImageGallery items={items} openModal={openModal} />
        )}
        {error && <p className={styles.errorMessage}>{error}</p>}
        {loading && <Loader />}
        {Boolean(items.length) && !loading && <Button loadMore={loadMore} />}
        {showModal && (
          <Modal largeImageURL={largeImageURL} closeModal={closeModal}></Modal>
        )}
      </div>
    );
  }
}
