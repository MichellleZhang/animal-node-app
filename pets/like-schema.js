import mongoose from "mongoose";

const LikeSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    role: {
        type: String,
        enum: ['Administrator', 'PetOwner', 'Volunteer'],
        required: true
    },
    petId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'pets',
        required: true
    }
}, {collection: "likePets"});
const LikeModel = mongoose.model("Like", LikeSchema);
export default LikeModel;
