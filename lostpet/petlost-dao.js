import model from "./petlost-model.js";

export const findAll=()=>model.find();

export const addLostPet=(data)=>model.create(data);

export const deleteMany=()=>model.deleteMany({});

export const getByUserId=(userId)=>model.find({userId})