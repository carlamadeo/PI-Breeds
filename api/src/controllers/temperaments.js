const { Temperament } = require('../db');
const { API_URL, DB_ERROR, API_ERROR, DB_POST_ERROR } = require('../utils');

const temperamentsInDB = async () => {
  try {
    const hasData = await Temperament.findAndCountAll();
    if(hasData.count) return true;
    return false;
  }
  catch(error) {
    DB_ERROR.detail = error;
    throw DB_ERROR;
  }
};

//TODO: refactorizada, ver si se puede mejorar un poco más
const setTemperamentsTable = async () => {

  let temperaments = [];

  try {
    const apiResponse = await fetch(API_URL);
    const breeds = await apiResponse.json();

    const temps = breeds.map(temp => temp.temperament);
    const allTemps = temps.map(temp => temp && temp.split(',')).flat();

    allTemps.forEach(temp => {
      let insertTemp;
      if(temp) {
        insertTemp = temp.trim();
        if(temperaments.indexOf(insertTemp) < 0) temperaments.push(insertTemp);
      }
    });
    temperaments.sort();
  }
  catch(error) {
    API_ERROR.detail = error;
    throw API_ERROR;
  }

  for(name of temperaments) {
    try {
      await Temperament.findOrCreate({
        where: {
          name
        },
        defaults: {
          name
        }
      });
    }
    catch(error) {
      DB_POST_ERROR.detail = error;
      throw DB_POST_ERROR;
    }
  }

};

const getTemperaments = async (req, res) => {
  //Obtener todos los temperamentos posibles
  //En una primera instancia deberán obtenerlos desde la API externa y guardarlos en su propia base de datos y luego ya utilizarlos desde allí
  try {
    if(!await temperamentsInDB()) await setTemperamentsTable();
    const dbTemperaments = await Temperament.findAll();
    return res.status(200).send(dbTemperaments);
  }
  catch(error) {
    return res.status(400).send(error);
  }
};

module.exports = {
  setTemperamentsTable,
  getTemperaments
};