const regexFloat = /^\d*\.?\d*$/;
const regexInt = /^[0-9]*$/;

const checkFloat = (value, type) => {
  if(!(regexFloat.test(value))) {
    return `${type} must be a number`
  }
  else return '';
}

const checkInt = (value, type) => {
  if(!(regexInt.test(value))) {
    return `${type} must be a number`
  }
  else return '';
}

const validators = {

  name: (value, breeds) => {
    if(value.length < 3 || value.length > 50) {
      return 'Name must have 3 to 50 characters';
    }
    else if(!(/^[a-zA-Z '.-]*$/.test(value))) {
      return 'Name must contain only characters';
    }
    else if(breeds.find(b => b.name.toLowerCase() === value.toLowerCase())) {
      return 'Name already exists'
    }
    else {
      return '';
    }
  },

  height: (value) => {
    if(value.length < 1) return 'Please provide the Height';
    if(value < 10 || value > 150) return 'Height must be between 10 and 150';
    return checkFloat(value, 'Height');
  },

  weight: (value) => {
    if(value.length < 1) return 'Please provide the Weight';
    if(value < 1 || value > 120) return 'Weight must be between 1 and 120';
    return checkFloat(value, 'Weight');
  },

  life: (value) => {
    if(value < 1 || value > 30) return 'Life Span must be between 1 and 30';
    return checkInt(value, 'Life');
  },

  minMax: (min, max, type) => {
    if(min >= max) {
      return `Maximum ${type} must be larger than minimum ${type}`;
    }
    else
      return '';
  }

}

export default validators;