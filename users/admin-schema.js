import mongoose from "mongoose";
const adminSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: {type:String, required:true},
    email: { type: String, required: true,unique: true},
    firstName: String,
    lastName: String,
    state: String,
    zipCode: String,
    phoneNumber: Number,
    role: { type: String, default: 'Administrator' },
    availability:{type: String, enum:['Monday','Tuesday','Wednesday','Thursday','Friday']}
}, {collection: "Admins"});
export default mongoose.model("Admins",adminSchema);