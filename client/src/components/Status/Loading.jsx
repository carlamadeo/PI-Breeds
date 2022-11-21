import React from 'react';
import logo from '../../img/doggies-logo.png';
import styles from './Loading.module.css';

const Loading = ({ message }) => {
  return (
    <>
      <div className={styles.container}>
        <img src={logo} alt='loading' className={styles.image} />
        <div className={styles.loading}></div>
        {
          message &&
          <h4>{message}...</h4>
        }
      </div>
    </>
  )
}

export default Loading;