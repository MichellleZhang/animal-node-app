import * as petsDao from './pets-dao.js'

const findPetById = async (req, res) => {
    const petId = req.params.id;
    const pet = await petsDao.findPetById(petId)
    res.json(pet);
}

const findPetByExternalId = async (req, res) => {
    const externalId = req.params.externalId;
    const pet = await petsDao.findPetByExternalId(externalId);
    res.json(pet);
}

const findAllPets = async (req, res) => {
  const type = req.query.type; 
  const zipcode = req.query.zipcode;
  // console.log("controller zipcode");
  // console.log(zipcode);
  const allPets = await petsDao.findPetByRequie(type, zipcode);
  res.json(allPets);
};

const createPet = async (req, res) => {
    const pet = req.body;
    const newPet = await petsDao.createPet(pet);
    res.json(newPet);
}

export default (app) => {
    app.get('/api/pets', findAllPets);
    app.post('/api/pets', createPet);
    app.get('/api/pets/externalId/:externalId', findPetByExternalId);
    app.get('/api/pets/:id', findPetById);
}

