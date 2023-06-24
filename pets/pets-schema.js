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
    phone: String
}, {collection: 'pets'});

export default petSchema;
