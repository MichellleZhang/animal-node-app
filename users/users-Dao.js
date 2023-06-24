import adminModel from "./admin-schema.js";
import petOwnerModel from "./petOwner-schema.js";
import volunteerModel from "./volunteers-schema.js";

export const findAllUsers = async () => {
  const admins = await adminModel.find();
  const petOwners = await petOwnerModel.find();
  const volunteers = await volunteerModel.find();
  const allUsers = [...admins, ...petOwners, ...volunteers];
  return allUsers;
};

export const findUserById = async (id) => {
  let user = await adminModel.findById(id);
  if (!user) {
    user = await petOwnerModel.findById(id);
  }
  if (!user) {
    user = await volunteerModel.findById(id);
  }
  return user;
};

export const findUserByUsername = async (username) => {
  let user = await adminModel.findOne({ username });
  if (!user) {
    user = await petOwnerModel.findOne({ username });
  }
  if (!user) {
    user = await volunteerModel.findOne({ username });
  }
  return user;
};

export const findUserByEmail = async (email) => {
  let user = await adminModel.findOne({ email });
  if (!user) {
    user = await petOwnerModel.findOne({ email });
  }
  if (!user) {
    user = await volunteerModel.findOne({ email });
  }
  return user;
};

export const findUserByUsernamePassword = async (username, password) => {
  let user = await adminModel.findOne({ username, password });
  if (!user) {
    user = await petOwnerModel.findOne({ username, password });
  }
  if (!user) {
    user = await volunteerModel.findOne({ username, password });
  }
  return user;
};

export const findUserByEmailPassword = async (email, password) => {
  let user = await adminModel.findOne({ email, password });
  if (!user) {
    user = await petOwnerModel.findOne({ email, password });
  }
  if (!user) {
    user = await volunteerModel.findOne({ email, password });
  }
  return user;
};

export const createUser = async (user) => {
  let createdUser;
  if (user.role === "Administrator") {
    createdUser = await adminModel.create(user);
  } else if (user.role === "PetOwner") {
    createdUser = await petOwnerModel.create(user);
  } else if (user.role === "Volunteer") {
    createdUser = await volunteerModel.create(user);
  }
  return createdUser;
};

export const updateUser = async (id, user) => {
  let updatedUser;
  if (user.role === "Administrator") {
    updatedUser = await adminModel.updateOne({ _id: id }, { $set: user });
  } else if (user.role === "PetOwner") {
    updatedUser = await petOwnerModel.updateOne({ _id: id }, { $set: user });
  } else if (user.role === "Volunteer") {
    updatedUser = await volunteerModel.updateOne({ _id: id }, { $set: user });
  }
  return updatedUser;
};

export const deleteUser = async (id) => {
  let deletedUser;
  const admin = await adminModel.findOne({ _id: id });
  if (admin) {
    deletedUser = await adminModel.deleteOne({ _id: id });
  } else {
    const petOwner = await petOwnerModel.findOne({ _id: id });
    if (petOwner) {
      deletedUser = await petOwnerModel.deleteOne({ _id: id });
    } else {
      const volunteer = await volunteerModel.findOne({ _id: id });
      if (volunteer) {
        deletedUser = await volunteerModel.deleteOne({ _id: id });
      }
    }
  }
  return deletedUser;
};

export const findUserFilter = async (condition, value) => {
  const admins = await adminModel.find({ [condition]: value });
  const petOwners = await petOwnerModel.find({ [condition]: value });
  const volunteers = await volunteerModel.find({ [condition]: value });
  const allUsers = [...admins, ...petOwners, ...volunteers];
  return allUsers;
};
