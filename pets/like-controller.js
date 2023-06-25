import * as likeDao from './like-dao.js';
import * as petDao from './pets-dao.js';
import mongoose from 'mongoose';

export const likePet = async (req, res) => {
    const {userId, pet, role} = req.body;
    let existingPet;

    try {
        // If the pet.id is a valid ObjectId, assume it's an internal pet
        if (mongoose.Types.ObjectId.isValid(pet._id)) {
            existingPet = await petDao.findPetById(pet._id);
        } else {
            // Attempt to get the pet from the database by externalId
            existingPet = await petDao.findPetByExternalId(pet.id);
        }

        // If the pet does not exist, create it
        if (existingPet) {
            existingPet.likes = (existingPet.likes || 0) + 1;
            console.log('existingPet before save:', existingPet);
            try {
                await existingPet.save();
            } catch (error) {
                console.log('Error saving pet:', error);
                throw error;
            }
        } else {
            console.log('no pet found, create a new pet')
            existingPet = await petDao.createPet({...pet, externalId: pet.id, likes: 1});
        }

        // Proceed to create the like
        const result = await likeDao.likePet(userId, existingPet._id, role);

        res.json(result);
    } catch (error) {
        res.status(500).send(error);
    }
}

export const unlikePet = async (req, res) => {
    const {userId, petId} = req.body;
    try {
        const result = await likeDao.unlikePet(userId, petId);
        res.json(result);
    } catch (error) {
        res.status(500).send(error);
    }
}

export const getLikedPetsByUser = async (req, res) => {
    const {userId} = req.params;
    try {
        const result = await likeDao.getLikedPetsByUser(userId);
        res.json(result);
    } catch (error) {
        res.status(500).send(error);
    }
}

export const getAllLikedPets = async (req, res) => {
    try {
        const results = await likeDao.findAllLikedPets();
        res.json(results);
    } catch (error) {
        res.status(500).send(error);
    }
}

export default (app) => {
    app.post('/api/like/likePet', likePet);
    app.delete('/api/like/unlikePet', unlikePet);
    app.get('/api/like/all', getAllLikedPets);
    app.get('/api/like/:userId', getLikedPetsByUser);
}