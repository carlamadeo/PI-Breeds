import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import { deleteBreed, getBreedDetail, getBreeds, setDeleteResponse, setDisplayBreeds } from '../../redux/actions';
import styles from './BreedDetail.module.css';
import noPicture from '../../img/newDog.png';
import Loading from '../Status/Loading';
import Error from '../Status/Error';
import Alert from '../Status/Alert';


const BreedDetail = () => {

  const params = useParams();
  const dispatch = useDispatch();
  const breed = useSelector(state => state.breed);
  const breeds = useSelector(state => state.breeds);
  const isLoading = useSelector(state => state.isLoading);
  const detailResponse = useSelector(state => state.getDetailResponse);
  const deleteResponse = useSelector(state => state.deleteResponse);
  const [isDeleting, setIsDeleting] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  let history = useHistory();

  const { name, image, min_weight, max_weight, min_height, max_height, min_life_span, max_life_span, temperaments } = breed;

  const isFromDB = isNaN(params.id);

  const sortedTemps = temperaments?.sort((a, b) => {
    if(a === null) return 1;
    else if(b === null) return -1;
    else if(a === b) return 0;
    return (a > b ? 1 : -1);
  });

  const handleDelete = () => {
    setIsDeleting('Deleting');
    dispatch(deleteBreed(params.id));
    dispatch(setDisplayBreeds(breeds));
  };

  const closeAlert = (event) => {
    event.preventDefault();
    setIsOpen(false);
    dispatch(setDeleteResponse(''));
    setIsDeleting('');
    history.push('/breeds');
  };

  useEffect(() => {
    setIsOpen(true);
    //eslint-disable-next-line
  }, [deleteResponse]);

  useEffect(() => {
    dispatch(getBreedDetail(params.id));
    setIsOpen(false);
  }, []);

  return (
    <>
      {Object.keys(deleteResponse).length !== 0 &&
        <Alert isOpen={isOpen} onClose={closeAlert} response={deleteResponse} className={styles.alert} />
      }

      {isLoading ? <Loading message={isDeleting} /> :
        Object.keys(detailResponse).length !== 0 ?
          <Error response={detailResponse} /> :
          <div className={styles.container}>
            <img src={image ? image : noPicture} alt={breed.name} />
            <div className={styles.name}>{name}</div>

            <div className={styles.dataContainer}>

              <div className={styles.data}>
                <span className={styles.iconWeight}></span>
                <span className={styles.text}>Weight</span>
                {min_weight && max_weight ? <span className={styles.info}>{min_weight}kg - {max_weight}kg</span> : <span className={styles.info}>Unknown</span>}
              </div>
              <hr />
              <div className={styles.data}>
                <span className={styles.iconHeight}></span>
                <span className={styles.text}>Height</span>
                {min_height && max_height ? <span className={styles.info}>{min_height}cm - {max_height}cm</span> : <span className={styles.info}>Unknown</span>}
              </div>
              <hr />
              <div className={styles.data}>
                <span className={styles.iconLife}></span>
                <span className={styles.text}>Life Span</span>
                {min_life_span && max_life_span ? <span className={styles.info}>{min_life_span} years - {max_life_span} years</span> : <span className={styles.info}>Unknown</span>}
              </div>
              <hr />
              <div className={styles.data}>
                <span className={styles.iconTemperaments}></span>
                <span className={styles.text}>Temperaments</span>
                <span className={styles.info}>
                  {sortedTemps?.map((temp, index) => <li key={index}>{temp}</li>)}</span>
              </div>
              <hr />
              {isFromDB &&
                <button className={styles.deleteButton} onClick={handleDelete}>Delete</button>}
              <NavLink to={'/breeds/'}><button className={styles.backButton}>Back</button></NavLink>
            </div>
          </div>
      }
    </>
  )
}

export default BreedDetail;