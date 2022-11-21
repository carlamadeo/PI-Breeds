import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { getBreedDetail } from '../../redux/actions';
import styles from './BreedDetail.module.css';
import noPicture from '../../img/newDog.png';
import Loading from '../Status/Loading';
import Error from '../Status/Error';

const BreedDetail = () => {

  const params = useParams();
  const breed = useSelector(state => state.breed);
  const isLoading = useSelector(state => state.isLoading);
  const response = useSelector(state => state.getDetailResponse);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBreedDetail(params.id));
    //eslint-disable-next-line
  }, []);

  return (
    <>
      {isLoading ? <Loading /> :
        Object.keys(response).length !== 0 ?
          <Error response={response} /> :
          <div className={styles.container}>
            <img src={breed.image ? breed.image : noPicture} alt={breed.name} />
            <div className={styles.name}>{breed.name}</div>

            <div className={styles.dataContainer}>

              <div className={styles.data}>
                <span className={styles.iconWeight}></span>
                <span className={styles.text}>Weight</span>
                {breed.min_weight && breed.max_weight ? <span className={styles.info}>{breed.min_weight}kg - {breed.max_weight}kg</span> : <span>Unknown</span>}
              </div>
              <hr />
              <div className={styles.data}>
                <span className={styles.iconHeight}></span>
                <span className={styles.text}>Height</span>
                {breed.min_height && breed.max_height ? <span className={styles.info}>{breed.min_height}cm - {breed.max_height}cm</span> : <span>Unknown</span>}
              </div>
              <hr />
              <div className={styles.data}>
                <span className={styles.iconLife}></span>
                <span className={styles.text}>Life Span</span>
                {breed.min_life_span && breed.max_life_span ? <span className={styles.info}>{breed.min_life_span} years - {breed.max_life_span} years</span> : <span className={styles.info}>Unknown</span>}
              </div>
              <hr />
              <div className={styles.data}>
                <span className={styles.iconTemperaments}></span>
                <span className={styles.text}>Temperaments</span>
                <span className={styles.info}>
                  {breed.temperaments?.map((temp, index) => <li key={index}>{temp}</li>)}</span>
              </div>
              <hr />
              <NavLink to={'/breeds/'}><button className={styles.backButton}>Back</button></NavLink>
            </div>
          </div>
      }
    </>
  )
}

export default BreedDetail;