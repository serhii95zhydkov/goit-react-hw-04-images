import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import styles from './imageGallery.module.css';
import PropTypes from 'prop-types';

export const ImageGallery = ({ items, openModal }) => {
  return (
    <ul className={styles.gallery}>
      {items.map(({ id, tags, webformatURL, largeImageURL }) => {
        return (
          <ImageGalleryItem
            key={id}
            tags={tags}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            openModal={openModal}
          />
        );
      })}
    </ul>
  );
};

ImageGallery.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,
  openModal: PropTypes.func.isRequired,
};
