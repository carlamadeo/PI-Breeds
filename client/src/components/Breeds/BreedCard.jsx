import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './BreedCard.module.css';
import noPicture from '../../img/newDog.png';
import Loading from '../Status/Loading';
import { useSelector } from 'react-redux';

const Breed = ({ breed }) => {

  const { id, image, name, min_weight, max_weight, temperaments } = breed;
  const isLoading = useSelector(state => state.isLoading);

  const sortedTemps = temperaments?.sort((a, b) => {
    if(a === null) return 1;
    else if(b === null) return -1;
    else if(a === b) return 0;
    return (a > b ? 1 : -1);
  });

  return (
    <>
      {isLoading ?
        <Loading /> :
        <NavLink to={`/breeds/${id}`} className={styles.link}>
          <div className={styles.card}>
            <img src={image ? image : noPicture} alt={name} className={styles.image} />
            <div className={styles.information}>
              <div className={styles.name}>{name}</div>
              <div className={styles.temperaments}>
                {sortedTemps?.map((temp, index) =>
                  <span key={index} className={styles.temperaments}>{temp}{(sortedTemps.length - 1 === index) ? null : <span>, </span>}</span>
                )}
              </div>
            </div>

            <div className={styles.weightContainer}>
              <p className={styles.weightTitle}>Weight</p>
              <p className={styles.weight}> {min_weight}kg - {max_weight}kg </p>
            </div>

          </div>
        </NavLink>
      }
    </>

  )
}

export default Breed;
