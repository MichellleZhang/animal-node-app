import mongoose from 'mongoose';
const myPetSchema = new mongoose.Schema({
    type: String,
    name: String,
    image: String,
    sex: String,
    description: String,
}, {collection: 'myPets'});
export default mongoose.model("MyPets",myPetSchema);
