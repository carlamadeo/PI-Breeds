import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBreedsByName, setByNameResponse, setDisplayBreeds } from '../../redux/actions'
import BreedName from './Categories/BreedName';
import Temperament from './Categories/Temperament';
import Sorts from './Sorts';
import styles from './Filters.module.css';

const Filters = ({ setPageNumber }) => {

  const dispatch = useDispatch();
  const [filterByName, setFilterByName] = useState([]);
  const [filterByTemperament, setFilterByTemperament] = useState([]);
  const breeds = useSelector(state => state.breeds);
  const breedsByName = useSelector(state => state.breedsByName);

  useEffect(() => {
    setPageNumber(1);
    const tempsBreeds = filterBreedsTemps();
    const nameBreeds = filterBreedsByName();
    dispatch(setByNameResponse(''));
    if(tempsBreeds.length && nameBreeds.length) {
      dispatch(setDisplayBreeds(nameBreeds.filter(dog => tempsBreeds.includes(dog))));
    }
    else if(tempsBreeds.length) {
      dispatch(setDisplayBreeds(tempsBreeds));
    }
    else {
      dispatch(setDisplayBreeds(nameBreeds));
    }
    //eslint-disable-next-line
  }, [filterByName, filterByTemperament]);

  const filterBreedsByName = () => {
    if(breedsByName.length) {
      return breedsByName.filter(breed => {
        return filterByName.includes(breed.id);
      })
    }
    return breeds.filter(breed => {
      return filterByName.includes(breed.id);
    })
  }

  const filterBreedsTemps = () => {
    if(breedsByName.length) {
      return breedsByName.filter(breed => {
        return filterByTemperament.every(temp => breed.temperaments?.indexOf(temp) >= 0);
      })
    }
    return breeds.filter(breed => {
      return filterByTemperament.every(temp => breed.temperaments?.indexOf(temp) >= 0);
    })
  }

  const clearFilters = () => {
    document.querySelectorAll('input[type=checkbox]').forEach(el => el.checked = false);
    document.querySelector('input[type=text]').value = '';
    document.querySelectorAll('select')[0].selectedIndex = 0;
    dispatch(setByNameResponse(''));
    dispatch(getBreedsByName(''));
    dispatch(setDisplayBreeds(breeds));
    setFilterByName([]);
    setFilterByTemperament([]);
  }

  useEffect(() => {
    document.querySelector('input[type=text]').value = '';
  }, [clearFilters])


  return (
    <>
      <div className={styles.container}>
        <div className={styles.sorts}><Sorts setPageNumber={setPageNumber}></Sorts></div>
        <div className={styles.clearButton}><button onClick={clearFilters}>Clear Filters</button></div>

        <div className={styles.filtersContainer}>
          <div className={styles.nameContainer}>
            <div className={styles.title}>Filter By Name</div>
            <BreedName filterByName={filterByName} setFilterByName={setFilterByName} />
          </div>
          <div className={styles.temperamentContainer}>
            <div className={styles.title}>Filter By Temperaments</div>
            <Temperament filterByTemperament={filterByTemperament} setFilterByTemperament={setFilterByTemperament} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Filters;