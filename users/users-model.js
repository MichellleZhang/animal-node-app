import mongoose from "mongoose";

import userSchema from "./users-schema.js";
const userModel = mongoose.model("UsersModel",userSchema)
export default userModel;