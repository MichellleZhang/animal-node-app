import mongoose from "mongoose";
const userPetsSchema = mongoose.Schema({
    //要确定create出来的pets model 的名字
    userPets:{type: mongoose.Schema.Types.ObjectId, ref:"UserPet"},
    user:{type: mongoose.Schema.Types.ObjectId, ref:"PetOwners"},
}, {collection: "userPets"});
export default userPetsSchema;

