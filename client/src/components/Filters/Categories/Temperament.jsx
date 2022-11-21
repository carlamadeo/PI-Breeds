import React from 'react';
import { useSelector } from 'react-redux';
import styles from './Temperament.module.css';

const Temperament = ({ filterByTemperament, setFilterByTemperament }) => {

  const temperaments = useSelector(state => state.temperaments);

  const handleChange = (name, event) => {
    //TODO: esto me parece que no lo estoy usando
    if(event.target.checked) {
      event.target.classList.value += styles.newSelected;
    }
    if(filterByTemperament.indexOf(name) >= 0) {
      setFilterByTemperament(prev => prev.filter(tempName => tempName !== name))
    }
    else {
      setFilterByTemperament(prev => [...prev, name]);
    }
    document.querySelectorAll('select')[0].selectedIndex = 0;
  }

  return (
    <>

      <div className={styles.container}>
        {temperaments?.map(temp => {
          return (
            <div key={temp.id}>
              <label >
                <div>
                  <input type='checkbox' onChange={(event) => handleChange(temp.name, event)}></input>
                  <span>{temp.name}</span>
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

export default Temperament;