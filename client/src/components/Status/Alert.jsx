import React from 'react';
import styles from './Alert.module.css';

const Alert = ({ isOpen, onClose, response }) => {

  if(response.detail.startsWith('Ya existe')) response.detail = 'Name already exists';

  return (
    <>

      {isOpen && response.type === 'Created' &&
        <div className={`${styles.message} ${styles.messageGood}`}>
          <div className={styles.messageBody}>
            <p className={styles.messageTitle}>Congratulations</p>
            <p>{response.detail}</p>
          </div>
          <button className={styles.closeButton} onClick={onClose}>Close</button>
        </div>
      }
      {isOpen && response.type === 'Error' &&
        <div className={`${styles.message} ${styles.messageWrong}`}>
          <div className={styles.messageBody}>
            <p className={styles.messageTitle}>Error</p>
            <p>{response.detail}</p>
          </div>
          <button className={styles.closeButton} onClick={onClose}>Close</button>
        </div>
      }

    </>
  );
}

export default Alert;