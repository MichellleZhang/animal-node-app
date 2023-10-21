import LikeModel from './like-schema.js';

export const likePet = async (userId, petId, role) => {
    // Check if a "like" already exists with the given userId and petId
    const existingLike = await LikeModel.findOne({userId, petId});

    if (existingLike) {
        // If a "like" already exists, don't create a new one
        return existingLike;
    }

    // If a "like" doesn't exist, create a new one
    return LikeModel.create({
        userId,
        petId,
        role
    });
}

export const unlikePet = (userId, petId) => {
    return LikeModel.deleteOne({ userId, petId });
}

export const getLikedPetsByUser = (userId) => {
    return LikeModel.find({ userId }).populate('petId');
}

export const getUserLikesByPets = (petID) => {
    return LikeModel.find({ petID }).populate('userId');
}

export const findAllLikedPets = async () => {
    return LikeModel.find({});
}

export const findLikeByUserAndPet = (userId, role, petId) => {
    return LikeModel.findOne({ userId, role, petId }).exec();
}


