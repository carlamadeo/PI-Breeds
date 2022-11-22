import React from 'react';
import BreedCard from './BreedCard';
import Loading from '../Status/Loading';
import styles from './Breeds.module.css';
import { useSelector } from 'react-redux';
import Error from '../Status/Error';

const Breeds = ({ display }) => {

  console.log(display)

  const isLoading = useSelector(state => state.isLoading);
  const response = useSelector(state => state.getByNameResponse);

  return (
    <>
      {isLoading ?
        <Loading message={'Searching'} /> :
        <div className={styles.container}>
          {Object.keys(response).length !== 0 || !display.length ?
            <Error response={response} /> :
            display.length && display.map(breed => <BreedCard breed={breed} key={breed.id} />)}
        </div>
      }
    </>
  )
}

export default Breeds;