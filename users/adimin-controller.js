import * as userDao from "./users-dao.js"
const AdminController = (app) => {
    const findAllUsers = async (req, res) => {
        const users = await userDao.findAllUsers()
        res.json(users)
    }
    app.get("/api/users", findAllUsers)
};
export default AdminController;