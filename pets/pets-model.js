import mongoose from 'mongoose';
import petsSchema from './pets-schema.js'
const petsModel = mongoose.model('pets', petsSchema);
export default petsModel;