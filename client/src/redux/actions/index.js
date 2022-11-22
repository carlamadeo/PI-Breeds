export const GET_BREEDS = 'GET_BREEDS';
export const SET_DISPLAY_BREEDS = 'SET_DISPLAY_BREEDS';
export const GET_BREEDS_BY_NAME = 'GET_BREEDS_BY_NAME';
export const GET_BREEDS_BY_NAME_RESPONSE = 'GET_BREEDS_BY_NAME_RESPONSE';
export const GET_BREED_DETAIL = 'GET_BREED_DETAIL';
export const GET_BREED_DETAIL_RESPONSE = 'GET_BREED_DETAIL_RESPONSE';
export const CREATE_BREED = 'CREATE_BREED';
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS';
export const TOGGLE_LOADING = 'TOGGLE_LOADING';
export const CREATE_RESPONSE = 'CREATE_RESPONSE';
export const DELETE_RESPONSE = 'DELETE_RESPONSE';
export const GET_RESPONSE = 'GET_RESPONSE';
const URL = 'http://localhost:3001';

//TODO: VER TODOS LOS CATCHS ERRORS!!

const getBreeds = () => {
  return async (dispatch) => {
    dispatch({ type: TOGGLE_LOADING, payload: true });
    try {
      const response = await fetch(`${URL}/dogs/`);
      const payload = await response.json();
      if(response.ok) {
        dispatch({ type: GET_BREEDS, payload });
        dispatch({ type: SET_DISPLAY_BREEDS, payload });
        dispatch({ type: TOGGLE_LOADING, payload: false });
      }
      else {
        throw (payload);
      }
    }
    catch(error) {
      dispatch({ type: GET_RESPONSE, payload: error });
      dispatch({ type: TOGGLE_LOADING, payload: false });
    }
  }
}

const setDisplayBreeds = (payload) => {
  return (dispatch) => {
    dispatch({ type: TOGGLE_LOADING, payload: true });
    dispatch({ type: SET_DISPLAY_BREEDS, payload });
    dispatch({ type: TOGGLE_LOADING, payload: false });
  }
}

const getBreedsByName = (name) => {
  return async (dispatch) => {
    dispatch({ type: TOGGLE_LOADING, payload: true });
    try {
      const response = await fetch(`${URL}/dogs?name=${name}`);
      const payload = await response.json();
      if(response.ok) {
        dispatch({ type: GET_BREEDS_BY_NAME, payload });
        dispatch({ type: TOGGLE_LOADING, payload: false });
      }
      else {
        throw (payload);
      }
    }
    catch(error) {
      dispatch({ type: TOGGLE_LOADING, payload: false });
      dispatch(setByNameResponse(error));
    }
  }
}

const setByNameResponse = (payload) => {
  return async (dispatch) => {
    dispatch({ type: GET_BREEDS_BY_NAME_RESPONSE, payload });
  }
}

const getBreedDetail = (id) => {
  return async (dispatch) => {
    dispatch({ type: TOGGLE_LOADING, payload: true });
    try {
      const response = await fetch(`${URL}/dogs/${id}`);
      const payload = await response.json();
      if(response.ok) {
        dispatch({ type: GET_BREED_DETAIL, payload });
        dispatch({ type: TOGGLE_LOADING, payload: false });
      }
      else {
        throw (payload);
      }
    }
    catch(error) {
      dispatch({ type: TOGGLE_LOADING, payload: false });
      dispatch(setByIdResponse(error));
    }
  }
}

const setByIdResponse = (payload) => {
  return async (dispatch) => {
    dispatch({ type: GET_BREED_DETAIL_RESPONSE, payload });
  }
}

const createBreed = (breed) => {
  return async (dispatch) => {
    dispatch({ type: TOGGLE_LOADING, payload: true });
    try {
      const response = await fetch(`${URL}/dogs/`, {
        method: 'POST',
        body: JSON.stringify(breed),
        headers: { 'Content-Type': 'application/json' }
      });
      const payload = await response.json();
      if(payload.type === 'Error') throw (payload);
      dispatch(setCreateResponse(payload));
      dispatch({ type: TOGGLE_LOADING, payload: false });
    }
    catch(error) {
      dispatch({ type: TOGGLE_LOADING, payload: false });
      dispatch(setCreateResponse(error));
    }
  }
}

const setCreateResponse = (payload) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_RESPONSE, payload });
  }
}

const deleteBreed = (id) => {
  return async (dispatch) => {
    dispatch({ type: TOGGLE_LOADING, payload: true });
    try {
      const response = await fetch(`${URL}/dogs/${id}`, {
        method: 'DELETE'
      });
      const payload = await response.json();
      if(payload.type === 'Error') throw (payload);
      dispatch(setDeleteResponse(payload));
      dispatch({ type: TOGGLE_LOADING, payload: false });
    }
    catch(error) {
      dispatch({ type: TOGGLE_LOADING, payload: false });
      dispatch(setDeleteResponse(error));
    }
  }
}

const setDeleteResponse = (payload) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_RESPONSE, payload });
  }
}

const getTemperaments = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${URL}/temperaments`);
      const payload = await response.json();
      dispatch({ type: GET_TEMPERAMENTS, payload });
    }
    catch(error) {
      console.warn(error);
    }
  }
}

export {
  getBreeds,
  setDisplayBreeds,
  getBreedsByName,
  setByNameResponse,
  getBreedDetail,
  createBreed,
  setCreateResponse,
  deleteBreed,
  setDeleteResponse,
  getTemperaments
}