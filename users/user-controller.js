import * as usersDao from "./users-dao.js"
const UserController = (app) => {
    const findUser = async (req, res) => {
        const id = req.params.id;
        const user = await usersDao.findUserById(id);
        res.json(user);
    };
    app.get("/api/users/:id", findUser);
}
export default UserController;