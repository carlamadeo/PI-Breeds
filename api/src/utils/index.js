const { API_KEY } = process.env;
const API_URL = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;
const API_ERROR = { type: 'Bad Request', message: 'Could not retrieve data from API' };
const DB_ERROR = { type: 'Bad Request', message: 'Could not retrieve data from Database' };
const DB_POST_ERROR = { type: 'Error', message: 'Validation error' };
const NOT_FOUND = { type: 'Not Found', message: 'No breeds found' };
const BREED_CREATED = { type: 'Created', detail: 'Breed created successfully!' };
const BREED_DELETED = { type: 'Deleted', detail: 'Breed deleted successfully!' };
const toPascalCase = (str) => {
  if(/^[\p{L}\d]+$/iu.test(str)) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  return str.replace(
    /([\p{L}\d])([\p{L}\d]*)/giu,
    (g0, g1, g2) => g1.toUpperCase() + g2.toLowerCase()
  ).replace(/[^\p{L}\d]/giu, ' ');
}

module.exports = {
  API_KEY,
  API_URL,
  API_ERROR,
  DB_ERROR,
  DB_POST_ERROR,
  NOT_FOUND,
  BREED_CREATED,
  BREED_DELETED,
  toPascalCase
}