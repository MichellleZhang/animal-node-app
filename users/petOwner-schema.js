import mongoose from "mongoose";
const petOwnerSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: {type:String, required:true},
    email: { type: String, required: true,unique: true},
    firstName: String,
    lastName: String,
    state: String,
    zipCode: String,
    phoneNumber: Number,
    role: { type: String, default: 'PetOwner' },
}, {collection: "PetOwners"});
export default mongoose.model("PetOwners",petOwnerSchema);