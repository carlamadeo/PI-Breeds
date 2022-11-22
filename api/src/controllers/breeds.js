const { Op } = require('sequelize');
const { Breed, Temperament } = require('../db');
const { API_URL, DB_ERROR, API_ERROR, NOT_FOUND, BREED_CREATED, BREED_DELETED, DB_POST_ERROR } = require('../utils');

const isUUID = (str) => {
  const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
  return regexExp.test(str);
}

const getApiBreeds = async (name, breedId) => {
  const breeds = [];

  try {
    const response = await fetch(API_URL);
    const apiBreeds = await response.json();

    for(dog of apiBreeds) {
      if(!name && !breedId || name && dog.name.toLowerCase().startsWith(name.toLowerCase()) || dog.id === breedId) {
        const breed = {
          id: dog.id,
          name: dog.name,
          min_weight: parseFloat(dog?.weight?.metric?.split(' - ')[0]),
          max_weight: parseFloat(dog?.weight?.metric?.split(' - ')[1]),
          min_life_span: breedId ? (parseInt(dog?.life_span?.split(' - ')[0])) : undefined,
          max_life_span: breedId ? (parseInt(dog?.life_span?.split(' - ')[1])) : undefined,
          min_height: breedId ? (parseInt(dog?.height?.metric?.split(' - ')[0])) : undefined,
          max_height: breedId ? (parseInt(dog?.height?.metric?.split(' - ')[1])) : undefined,
          temperaments: dog?.temperament?.split(', '),
          image: dog?.image?.url
        }
        if(dog.id === breedId) return breed;
        breeds.push(breed);
      }
    }
    return breeds;
  }
  catch(error) {
    API_ERROR.detail = error;
    throw (API_ERROR);
  }
}
//TODO: para no repetir codigo, hacer que el de breedId sea un array por mas que sea uno solo
const getDbBreeds = async (name, breedId) => {
  const findParams = {
    attributes: ['id', 'name', 'min_weight', 'max_weight'],
    include: {
      model: Temperament,
      attributes: ['name'],
      through: {
        attributes: [],
      }
    }
  }

  if(breedId) {
    try {
      findParams.attributes.push('min_life_span', 'max_life_span', 'min_height', 'max_height');
      findParams.where = { id: breedId };
      const dbBreed = await Breed.findOne(findParams);
      if(!dbBreed) return null;
      const temperaments = [];

      const breed = {
        id: dbBreed.id,
        name: dbBreed.name,
        min_weight: dbBreed.min_weight,
        max_weight: dbBreed.max_weight,
        min_life_span: dbBreed.min_life_span,
        max_life_span: dbBreed.max_life_span,
        min_height: dbBreed.min_height,
        max_height: dbBreed.max_height,
        temperaments: ''
      }

      dbBreed.Temperaments.map(t => {
        temperaments.push(t.name);
      });
      temperaments.join(', ');
      breed.temperaments = temperaments;
      return breed;
    }
    catch(error) {
      DB_ERROR.detail = error;
      throw (DB_ERROR);
    }
  }

  if(name) {
    findParams.where = { name: { [Op.iLike]: `${name}%` } }
  }
  try {
    const dbBreeds = await Breed.findAll(findParams);
    const breeds = [];
    dbBreeds.map(b => {
      const breed = {
        id: b.id,
        name: b.name,
        min_weight: b.min_weight,
        max_weight: b.max_weight,
        temperaments: ''
      }
      const temperaments = [];
      b.Temperaments.map(t => {
        temperaments.push(t.name);
      });
      temperaments.join(', ');
      breed.temperaments = temperaments;
      breeds.push(breed);
    });

    return breeds;
  }
  catch(error) {
    DB_ERROR.detail = error;
    throw (DB_ERROR);
  }
}

//TODO: la busqueda a hago por startsWith, me gustaría que se haga por palabra. 
//Ej: Terrier me debería traer todos los terriers (ahora no lo hace porque busco solo en la primera palabra) American Pit Bull Terrier

const getBreeds = async (req, res) => {
  //Obtener un listado de las razas de perro
  //Debe devolver solo los datos necesarios para la ruta principal
  //Obtener un listado de las razas de perro que contengan la palabra ingresada como query parameter

  const { name } = req.query

  try {
    const apiBreeds = await getApiBreeds(name);
    const dbBreeds = await getDbBreeds(name);

    if(!dbBreeds.length && !apiBreeds.length) return res.status(404).send(NOT_FOUND);

    const sorted = [...apiBreeds, ...dbBreeds].sort((a, b) => {
      if(a.name === null) return 1;
      else if(b.name === null) return -1;
      else if(a.name === b.name) return 0;
      return (a.name > b.name ? 1 : -1);
    });

    return res.status(200).send(sorted);
  }
  catch(error) {
    res.status(400).send(error);
  }
}

const getBreedDetail = async (req, res) => {
  //Obtener el detalle de una raza de perro en particular
  //Debe traer solo los datos pedidos en la ruta de detalle de raza de perro
  //Incluir los temperamentos asociados
  const { breedId } = req.params;

  try {

    if(isUUID(breedId)) {
      const dbBreeds = await getDbBreeds(undefined, breedId.toString());
      if(!dbBreeds) return res.status(404).send(NOT_FOUND);
      return res.status(200).send(dbBreeds);
    }

    const apiBreeds = await getApiBreeds(undefined, parseInt(breedId));
    if(!apiBreeds.name) return res.status(404).send(NOT_FOUND);
    return res.status(200).send(apiBreeds);

  }
  catch(error) {
    res.status(400).send(error);
  }
}

const createBreed = async (req, res) => {
  //Recibe los datos recolectados desde el formulario controlado de la ruta de creación de raza de perro por body
  //Crea una raza de perro en la base de datos relacionada con sus temperamentos
  const { name, temperaments } = req.body;
  const newTemps = [];

  try {
    const response = await fetch(API_URL);
    const apiBreeds = await response.json();

    for(breed of apiBreeds) {
      if(name && breed.name.toLowerCase() === name.toLowerCase()) {
        DB_POST_ERROR.detail = 'Name already exists';
        return res.status(400).send(DB_POST_ERROR);
      }
    }
  }
  catch(error) {
    return res.status(400).send(DB_POST_ERROR);
  }

  try {

    if(!temperaments || !temperaments.length) {
      DB_POST_ERROR.detail = 'Please provide at least one temperament';
      throw DB_POST_ERROR;
    }

    for(temp of temperaments) {
      const dbTemperament = await Temperament.findByPk(temp);
      if(dbTemperament && !newTemps.includes(dbTemperament)) {
        newTemps.push(dbTemperament);
      }
      else {
        DB_POST_ERROR.detail = `${temp} is not a valid temperament`;
        throw DB_POST_ERROR;
      }
    }
    const breed = await Breed.create(req.body);
    for(temp of newTemps) {
      await breed.addTemperaments(temp);
    }
    return res.status(201).send(BREED_CREATED);
  }
  catch(error) {
    if(error.errors) DB_POST_ERROR.detail = error.errors[0]?.message;          //Errors from Model (sequelize model Breeds) 
    if(error.parent?.detail) DB_POST_ERROR.detail = error.parent?.detail;     //TODO: no me acuerdo para que lo hice, revisar!
    return res.status(400).send(DB_POST_ERROR);
  }
}

const deleteBreed = async (req, res) => {
  const { breedId } = req.params;

  console.log(typeof (breedId))

  try {

    const response = await Breed.destroy({
      where: {
        id: breedId
      }
    });

    if(response) return res.status(200).send(BREED_DELETED);
    return res.status(200).send({ type: 'Not Deleted', detail: 'No breeds found' });

  } catch(error) {
    DB_ERROR.detail = error;
    return res.status(400).send(DB_ERROR);
  }
}

module.exports = {
  getBreeds,
  getBreedDetail,
  createBreed,
  deleteBreed
};