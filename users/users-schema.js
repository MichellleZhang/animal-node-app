import mongoose from "mongoose";
const userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: {type:String, required:true},
    email: { type: String, required: true,unique: true},
    firstName: String,
    lastName: String,
    state: String,
    ZipCode: BigInt,
    phoneNumber: Number,
    role: {type: String, enum:['Volunteer','PetOwner','Administrator'], required: true}
}, {collection: 'users'});
export default userSchema;
