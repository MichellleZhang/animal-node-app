import mongoose from 'mongoose';
import petlostModel from './schema.js'
const petsLostModel = mongoose.model('petlost', petlostModel);
export default petsLostModel;