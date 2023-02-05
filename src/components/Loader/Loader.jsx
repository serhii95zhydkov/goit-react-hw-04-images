import { Audio } from 'react-loader-spinner';
import styles from './loader.module.css';

export const Loader = () => {
  return (
    <div className={styles.loader}>
      <Audio />
    </div>
  );
};
