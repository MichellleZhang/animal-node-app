import userModel from "./users-model.js";

export const findAllUsers = () => userModel.find();
export const findUserByRole = (role) => userModel.find({ role });
export const findUserById = (id) => userModel.findById(id);
export const findUserByEmail = (email) => userModel.findOne({ email });
export const findUserByUsernamePassword = (username, password) =>
  userModel.findOne({ username, password });
export const findUserByEmailPassword = (email, password) =>
  userModel.findOne({ email, password });
export const findUserByUsername = (username) =>
  userModel.findOne({ username });
export const createUser = (user) => userModel.create(user);
export const updateUser = (id, user) =>
  userModel.updateOne({ _id: id }, { $set: user });
export const deleteUser = (id) => userModel.deleteOne({ _id: id });
