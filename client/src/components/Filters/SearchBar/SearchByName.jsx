import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDisplayBreeds, getBreedsByName, setByNameResponse } from '../../../redux/actions';
import styles from './SearchByName.module.css';

const SearchByName = ({ setPageNumber }) => {

  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const breeds = useSelector(state => state.breeds);
  const breedsByName = useSelector(state => state.breedsByName);

  const handleChange = (event) => {
    if(event.target.value === '') {
      dispatch(setDisplayBreeds(breeds));
      dispatch(setByNameResponse(''));
    }
    setInput(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(setByNameResponse(''));
    if(input !== '') {
      setPageNumber(1);
      dispatch(getBreedsByName(input));
    }
    document.querySelectorAll('input[type=checkbox]').forEach(el => el.checked = false);
    document.querySelectorAll('select')[0].selectedIndex = 0;
  }

  useEffect(() => {
    dispatch(setDisplayBreeds(breedsByName));
    //eslint-disable-next-line
  }, [breedsByName])


  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className={styles.search}>
          <input className={styles.searchTerm} type='text' value={input} placeholder='Name...' onChange={handleChange} />
          <button className={styles.searchButton} >
          </button>
        </div>
      </form>
    </>
  );
}

export default SearchByName;