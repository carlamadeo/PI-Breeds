import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import SearchByName from '../Filters/SearchBar/SearchByName';
import Pagination from '../Pagination/Pagination';
import Breeds from '../Breeds/Breeds';
import Filters from '../Filters/Filters';
import styles from './Home.module.css';
import Error from '../Status/Error';

const Home = () => {

  const breedsToDisplay = useSelector(state => state.breedsToDisplay);
  const [pageNumber, setPageNumber] = useState(1);
  const response = useSelector(state => state.getResponse);

  const breedsPerPage = 8;
  const lastBreed = pageNumber * breedsPerPage;
  const firstBreed = lastBreed - breedsPerPage;
  const display = breedsToDisplay.slice(firstBreed, lastBreed);

  const changeButtonStyle = () => {
    document.querySelectorAll('[id^="page-"]').forEach(element => {
      element.classList.remove(styles.currentPage);
    });
    //document.querySelectorAll('[id^="page-"]')}
    document.querySelector(`#page-${pageNumber}`)?.classList.add(styles.currentPage);
  }

  useEffect(() => {
    changeButtonStyle();
    //eslint-disable-next-line
  }, [pageNumber]);


  return (
    <>
      {Object.keys(response).length !== 0 ?
        <Error message={response} /> :
        <div className={styles.homeContainer}>
          <div className={styles.searchBar}>
            <SearchByName setPageNumber={setPageNumber} />
          </div>
          <section className={styles.filters}>
            <Filters setPageNumber={setPageNumber} />
          </section>
          <section className={styles.breedsContainer}>
            <Breeds display={display} />
          </section>
          <footer className={styles.pagination}>
            <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} totalBreeds={breedsToDisplay.length} breedsPerPage={breedsPerPage} />
          </footer>
        </div>}
    </>
  )
};

export default Home;

