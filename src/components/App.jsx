import { useCallback, useEffect, useState } from 'react';
import { searchImages } from 'services/api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

import styles from 'index.css';

export const App = () => {
  const [search, setSearch] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');

  useEffect(() => {
    if (!search) {
      return;
    }

    if (search) {
      const fetchImages = async () => {
        try {
          setLoading(true);
          const { hits } = await searchImages(search, page);
          setItems(prevItems => [...prevItems, ...hits]);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
      fetchImages();
    }
  }, [search, page]);

  const onSearchImages = ({ search }) => {
    setSearch(search);
    setItems([]);
    setPage(1);
  };

  const loadMore = useCallback(() => {
    setPage(prevPage => prevPage + 1);
  }, []);

  const openModal = useCallback(data => {
    setShowModal(true);
    setLargeImageURL(data);
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
    setLargeImageURL('');
  }, []);

  return (
    <div className={styles.app}>
      <Searchbar onSubmit={onSearchImages} />
      {items.length > 0 && <ImageGallery items={items} openModal={openModal} />}
      {error && <p className={styles.errorMessage}>{error}</p>}
      {loading && <Loader />}
      {Boolean(items.length) && !loading && <Button loadMore={loadMore} />}
      {showModal && (
        <Modal largeImageURL={largeImageURL} onClose={closeModal}></Modal>
      )}
    </div>
  );
};
