import MyPetsModel from "./mypet-schema.js"
import CreateModel from "./createMypets-schema.js"

export const findAllMypets = () => MyPetsModel.find();
export const findMypetsById = (id) => MyPetsModel.findById(id);
export const findMypetsByMypetsId = (myPetsId) => MyPetsModel.findOne({ myPetsId });

export const findCreatesForUser = (userId) =>CreateModel.find({ creator: userId }).populate("mypets").exec();

export const deleteMypets = async (id) => {
    CreateModel.deleteOne({ mypets: id });
    MyPetsModel.deleteOne({ _id: id })}
export const createMypets = async (mypet, ownerID) => {
    mypet.owners = ownerID;
    try {
        const createdMypet = await MyPetsModel.create(mypet);
        return createdMypet;
    } catch (error) {
        throw error;
    }
};
export const createCreate = (id, userId) =>CreateModel.create({ mypets: id, creator: userId });
