import mongoose from "mongoose";
const createMypetsSchema = mongoose.Schema(
  {
    mypets: { type: mongoose.Schema.Types.ObjectId, ref: "MyPets" },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "PetOwners" },
  },
  { collection: "createMypets" }
);

export default mongoose.model("Creates", createMypetsSchema);