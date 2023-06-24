import * as petsDao from './pets-dao.js'

const findPetById = async (req, res) => {
    const petId = req.params.id;
    const pet = await petsDao.findPetById(petId)
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

export default (app) => {
    app.get('/api/pets/:id', findPetById);
    app.get('/api/pets', findAllPets);
}

