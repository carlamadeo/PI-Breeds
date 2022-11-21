import {
  GET_BREEDS,
  GET_RESPONSE,
  SET_DISPLAY_BREEDS,
  GET_BREEDS_BY_NAME,
  GET_BREEDS_BY_NAME_RESPONSE,
  GET_BREED_DETAIL,
  GET_BREED_DETAIL_RESPONSE,
  CREATE_BREED,
  GET_TEMPERAMENTS,
  CREATE_RESPONSE,
  TOGGLE_LOADING
} from '../actions/'

const initialState = {
  breeds: [],
  breedsToDisplay: [],
  breedsByName: [],
  breed: '',
  temperaments: [],
  isLoading: true,
  createResponse: {},
  getResponse: {},
  getByNameResponse: {},
  getDetailResponse: {}
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch(type) {
    case GET_BREEDS:
      return { ...state, breeds: payload };
    case GET_RESPONSE:
      return { ...state, getResponse: payload };
    case SET_DISPLAY_BREEDS:
      return { ...state, breedsToDisplay: payload };
    case GET_BREEDS_BY_NAME:
      return { ...state, breedsByName: payload };
    case GET_BREEDS_BY_NAME_RESPONSE:
      return { ...state, getByNameResponse: payload }
    case GET_BREED_DETAIL:
      return { ...state, breed: payload };
    case GET_BREED_DETAIL_RESPONSE:
      return { ...state, getDetailResponse: payload };
    case CREATE_BREED:
      return { ...state, breeds: [...state.breeds, payload] };
    case GET_TEMPERAMENTS:
      return { ...state, temperaments: payload };
    case TOGGLE_LOADING:
      return { ...state, isLoading: payload }
    case CREATE_RESPONSE:
      return { ...state, createResponse: payload };
    default:
      return state;
  }
}

export default rootReducer;