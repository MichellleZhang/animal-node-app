import petsModel from './pets-model.js';

export const findPetById = (uid) =>  petsModel.findById(uid);
//export const findPetByRequie = (type, location) => petsModel.find( { 'Type': type, 'Zipcode': location } );
export const findPetByRequie = async (type, zipcode) => {
    console.log("getting zipcode")
    console.log(zipcode);
  return petsModel.find({ type: type, zipcode: zipcode})
    .then((result) => {
      console.log(result);
      return result;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};
// export const findPetByRequie = async (type) => {
//   try {
//     console.log("I am in the pets dao");
//     console.log(type);

//     const result = await petsModel.find({ Type: 'Cat' });
//     console.log(result);
//     return result;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

