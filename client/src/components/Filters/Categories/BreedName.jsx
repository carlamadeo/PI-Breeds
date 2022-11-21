import React from 'react';
import { useSelector } from 'react-redux';
import styles from './BreedName.module.css';

const BreedName = ({ filterByName, setFilterByName }) => {

  const breeds = useSelector(state => state.breeds);
  const breedsToDisplay = useSelector(state => state.breedsToDisplay)

  const handleChange = (id) => {
    if(filterByName.indexOf(id) >= 0) {
      setFilterByName(prev => prev.filter(breedId => breedId !== id))
    }
    else {
      if(breedsToDisplay.length) {
        setFilterByName(prev => [...prev, id]);
      }
    }
    document.querySelectorAll('select')[0].selectedIndex = 0;
  }

  return (
    <>
      <div className={styles.container}>
        {breeds?.map(breed => {
          return (
            <div key={breed.id}>
              <label key={breed.id}>
                <div key={breed.id}>
                  <input key={breed.id} type='checkbox' onChange={() => handleChange(breed.id)}></input>
                  <span>{breed.name}</span>
                </div>
              </label>
            </div>
          )
        })
        }
      </div>
    </>
  )
}

export default BreedName;