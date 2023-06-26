import mongoose from 'mongoose';
// 创建 Pet 模型
const petLostSchema = new mongoose.Schema({
    zipcode: String,
    gender: String,
    breed: String,
    petName: String,
    addressLastSeen: String,
    uploadedImage: String,
    type: String,
    userId:String,
    postType:String,
  },{collection: 'petlost'});


  export default petLostSchema;