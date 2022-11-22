import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { createBreed, setCreateResponse, getBreeds, setDisplayBreeds } from '../../redux/actions';
import Alert from '../Status/Alert';
import Loading from '../Status/Loading';
import validators from './formValidators';
import styles from './CreateBreed.module.css';

const CreateBreed = () => {

  const temperaments = useSelector(state => state.temperaments);
  const response = useSelector(state => state.createResponse);
  const isLoading = useSelector(state => state.isLoading);
  const breeds = useSelector(state => state.breeds);
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isCreating, setIsCreating] = useState('');
  let history = useHistory();

  const [input, setInput] = useState(
    { name: '', min_height: '', max_height: '', min_weight: '', max_weight: '', min_life_span: '', max_life_span: '', temperaments: [] }
  );

  const [errors, setErrors] = useState(
    {
      name: '', min_height: '', max_height: '', min_weight: '', max_weight: '', min_life_span: '', max_life_span: '', temperaments: '',
      heightMinMax: '', weightMinMax: '', lifeSpanMinMax: ''
    }
  );

  const handleChange = (event) => {
    event.preventDefault();
    setInput(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsCreating('Creating');
    if(Object.values(errors).every(e => e === '') && input.temperaments.length) {
      if(!input.min_life_span) delete input.min_life_span;
      if(!input.max_life_span) delete input.max_life_span;
      dispatch(createBreed(input));
      dispatch(setDisplayBreeds(breeds));
      document.querySelectorAll('input[type=checkbox]').forEach(el => el.checked = false);
      setErrors({
        name: '', min_height: '', max_height: '', min_weight: '', max_weight: '', min_life_span: '', max_life_span: '', temperaments: '',
        heightMinMax: '', weightMinMax: '', lifeSpanMinMax: ''
      });
      setInput({ name: '', min_height: '', max_height: '', min_weight: '', max_weight: '', min_life_span: '', max_life_span: '', temperaments: [] });
      //dispatch(getBreeds());
    }
  };

  const validate = (event) => {
    if(event.target.name === 'name')
      return setErrors(prev => ({ ...prev, name: validators['name'](event.target.value, breeds) }));
    if(event.target.value !== '') {
      let name = event.target.name;
      if(name.includes('_')) {
        name = name.split('_')[1];
      }
      setErrors(prev => ({ ...prev, [event.target.name]: validators[name](event.target.value) }));
      if(input.min_height && input.max_height) {
        setErrors(prev => ({ ...prev, heightMinMax: validators.minMax(input.min_height, input.max_height, 'Height') }));
      }
      if(input.min_weight && input.max_weight) {
        setErrors(prev => ({ ...prev, weightMinMax: validators.minMax(input.min_weight, input.max_weight, 'Weight') }));
      }
      if(input.min_life_span && input.max_life_span) {
        setErrors(prev => ({ ...prev, lifeSpanMinMax: validators.minMax(input.min_life_span, input.max_life_span, 'Life Span') }));
      }
    }
  }

  const addTemperament = (temp) => {
    const { id } = temp;
    if(!input.temperaments.find(temp => temp === id)) {
      setInput(prev => ({ ...prev, temperaments: [...prev.temperaments, temp] }));
      setErrors(prev => ({ ...prev, temperaments: '' }));
    }
    else {
      setInput(prev => ({ ...prev, temperaments: prev.temperaments.filter(temp => temp !== id) }));
      if(!input.temperaments.length) {
        setErrors(prev => ({ ...prev, temperaments: 'Please provide at least one Temperament' }));
      }
    }
  };

  const checkButtonState = () => {
    for(let i in input) {
      if(i !== 'min_life_span' && i !== 'max_life_span' && !input[i].length) return true;
    }
    for(let e in errors) {
      if(errors[e].length) return true;
    }
    return false;
  }

  const closeAlert = (event) => {
    event.preventDefault();

    setIsOpen(false);
    dispatch(setCreateResponse(''));
    setIsCreating('');
    history.push('/breeds');
  }

  useEffect(() => {
    setDisabled(checkButtonState());
    //eslint-disable-next-line
  }, [input]);

  useEffect(() => {
    setIsOpen(true);

    //eslint-disable-next-line
  }, [response]);

  useEffect(() => {
    setIsOpen(false);
  }, []);

  return (
    <>

      {Object.keys(response).length !== 0 &&
        <Alert isOpen={isOpen} onClose={closeAlert} response={response} />
      }

      {isLoading ? <Loading message={isCreating} /> :

        <form onSubmit={handleSubmit} className={styles.form} >
          <div className={styles.title}>Create Breed</div>

          <div className={styles.leftContainer}>
            <div className={styles.label}>Name <span className={styles.cross}>*</span> </div>
            <input key='name' type='text' name='name' value={input.name} placeholder='Name'
              onChange={(event) => { handleChange(event) }} onBlur={validate} className={styles.nameInput} />
            {errors?.name ? <div className={styles.error}>{errors?.name}</div> : null}

            <div className={styles.sharedInput}>
              <div className={styles.label}>Height <span className={styles.cross}>*</span> </div>
              <input key='min_height' type='text' name='min_height' value={input.min_height} placeholder='Min'
                onChange={(event) => { handleChange(event) }} onBlur={validate} className={styles.inputSmall} />
              <input key='max_height' type='text' name='max_height' value={input.max_height} placeholder='Max'
                onChange={(event) => { handleChange(event) }} onBlur={validate} className={`${styles.inputSmall} ${styles.inputRight}`} />
              {errors?.min_height || errors?.max_height ? <div className={styles.error}>{errors?.min_height || errors?.max_height}</div> :
                errors?.heightMinMax ? <div className={styles.error}>{errors?.heightMinMax}</div> :
                  null}
            </div>

            <div className={styles.sharedInput}>
              <div className={styles.label}>Weight <span className={styles.cross}>*</span> </div>
              <input key='min_weight' type='text' name='min_weight' value={input.min_weight} placeholder='Min'
                onChange={(event) => { handleChange(event) }} onBlur={validate} className={styles.inputSmall} />
              <input key='max_weight' type='text' name='max_weight' value={input.max_weight} placeholder='Max'
                onChange={(event) => { handleChange(event) }} onBlur={validate} className={`${styles.inputSmall} ${styles.inputRight}`} />
              {errors?.min_weight || errors?.max_weight ? <div className={styles.error}>{errors?.min_weight || errors?.max_weight}</div> :
                errors?.weightMinMax ? <div className={styles.error}>{errors?.weightMinMax}</div> :
                  null}
            </div>

            <div className={styles.sharedInput}>
              <div className={styles.label}>Life Span </div>
              <input key='min_life_span' type='text' name='min_life_span' value={input.min_life_span} placeholder='Min'
                onChange={(event) => { handleChange(event) }} onBlur={validate} className={styles.inputSmall} />
              <input key='max_life_span' type='text' name='max_life_span' value={input.max_life_span} placeholder='Max'
                onChange={(event) => { handleChange(event) }} onBlur={validate} className={`${styles.inputSmall} ${styles.inputRight}`} />
              {errors?.min_life_span || errors?.max_life_span ? <div className={styles.error}>{errors?.min_life_span || errors?.max_life_span}</div> :
                errors?.lifeSpanMinMax ? <div className={styles.error}>{errors?.lifeSpanMinMax}</div> :
                  null}
            </div>

          </div>

          <div className={styles.rightContainer}>
            <div className={styles.label}>Temperaments <span className={styles.cross}>*</span> </div>
            <div className={styles.temperaments}>
              {temperaments?.map(temp => {
                return (
                  <div key={temp.id}>
                    <label >
                      <div>
                        <input type='checkbox' onChange={() => { addTemperament(temp) }}></input>
                        <span>{temp.name}</span>
                      </div>
                    </label>
                  </div>
                )
              })
              }
            </div>
          </div>
          <div className={styles.backButton}>
            <NavLink to={'/breeds/'}><button >Back</button></NavLink>
          </div>
          <div className={styles.createButton}>
            <button disabled={disabled}>Create</button>
          </div>
        </form>
      }

    </>
  );
};

export default CreateBreed;