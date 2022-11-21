import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setDisplayBreeds } from '../../redux/actions';
import styles from './Sorts.module.css';

const Sorts = ({ setPageNumber }) => {

  const dispatch = useDispatch();
  const breedsToDisplay = useSelector(state => state.breedsToDisplay);

  const sortBy = (event) => {
    setPageNumber(1);
    const sortBy = event.target.value.split('-')[0];
    const ascDesc = event.target.value.split('-')[1];
    const sorted = [...breedsToDisplay].sort((a, b) => {
      if(a[sortBy] === null) return 1;
      else if(b[sortBy] === null) return -1;
      else if(a[sortBy] === b[sortBy]) return 0;
      return ascDesc === 'asc' ? (a[sortBy] > b[sortBy] ? 1 : -1) : (a[sortBy] < b[sortBy] ? 1 : -1);
    });
    dispatch(setDisplayBreeds(sorted));
  }

  return (
    <>
      <label>
        <select onChange={sortBy} defaultValue={'default'}>
          <option className={styles.default} value='default' disabled> ------ Order By ------ </option>
          <option value='name-asc'>Name A-Z</option>
          <option value='name-desc'>Name Z-A</option>
          <option value='min_weight-asc'>Min. Weight Low to High</option>
          <option value='min_weight-desc'>Min. Weight High to Low</option>
          <option value='max_weight-asc'>Max. Weight Low to High</option>
          <option value='max_weight-desc'>Max. Weight High to Low</option>
        </select>
      </label>
    </>
  )
}

export default Sorts;