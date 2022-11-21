import React, { useEffect } from 'react';
import styles from './Pagination.module.css';

const Pagination = ({ pageNumber, setPageNumber, totalBreeds, breedsPerPage }) => {

  const pages = [];

  for(let i = 1; i <= Math.ceil(totalBreeds / breedsPerPage); i++) {
    pages.push(i);
  }

  const setPrevious = () => {
    if(pageNumber !== 1) setPageNumber(prev => prev - 1);
  }

  const setNext = () => {
    if(pageNumber < pages.length) setPageNumber(prev => prev + 1);
  }

  useEffect(() => {
    document.querySelector('#page-1')?.classList.remove(styles.active);
  }, [pageNumber])

  return (
    <>
      <div className={styles.container}>
        {pages.length > 1 &&
          <button className={styles.button} onClick={setPrevious} >Back</button>}
        {pages.length > 1 &&
          pages.map((page, index) => {
            return (
              <button id={`page-${page}`} key={index} value={page} className={page === 1 ? styles.active : null} onClick={() => { setPageNumber(page) }}>{page}</button>)
          })}
        {pages.length > 1 &&
          <button onClick={setNext}>Next</button>
        }

      </div>
    </>
  )
}

export default Pagination;