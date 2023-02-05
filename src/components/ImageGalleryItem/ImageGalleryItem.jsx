import styles from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({
  id,
  tags,
  webformatURL,
  largeImageURL,
  openModal,
}) => {
  return (
    <li
      className={styles.galleryItem}
      onClick={() => {
        openModal(largeImageURL);
      }}
    >
      <img className={styles.imageGalleryItem} src={webformatURL} alt={tags} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};
