import mongoose from 'mongoose';

const petSchema = new mongoose.Schema({

    type: String,
    name: String,
    image: String,
    status: String,
    sex: String,
    species: String,
    description: String,
    area: String,
    address: String,
    zipcode: Number,
    date: String,
    phone: String,
    age: String,
    externalId: String,
    likes: {type:Number, default:0},
}, {collection: 'pets'});

const petsModel = mongoose.model('pets', petSchema);
export default petsModel;
