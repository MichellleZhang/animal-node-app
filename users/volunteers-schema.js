import mongoose from "mongoose";
const volunteerSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: {type:String, required:true},
    email: { type: String, required: true,unique: true},
    firstName: String,
    lastName: String,
    state: String,
    zipCode: String,
    phoneNumber: Number,
    role: { type: String, default: 'Volunteer' },
}, {collection: "Volunteers"});
export default mongoose.model("Volunteers",volunteerSchema);
 