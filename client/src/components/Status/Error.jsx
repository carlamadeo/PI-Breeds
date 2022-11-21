import React from 'react';
import styles from './Error.module.css';

const Error = ({ response }) => {

  console.log(response)
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>Whoops!</h1>
        {response?.type === 'Bad Request' &&
          <div className={styles.detail}>Something went wrong</div>
        }
        {
          response ?
            <div className={styles.detail}>{response.message}</div> :
            <div className={styles.detail}>No Breeds Found</div>
        }

      </div>

    </>
  )
}

export default Error;