import * as usersDao from "./users-dao.js"

const AdminController = (app) => {
    const findAllUsers = async (req, res) => {
        const users = await usersDao.findAllUsers()
        res.json(users)
    }

    const findFilterUsers = async (req, res) => {
        const { condition, value } = req.query;
        if (value === "") {
            const users = await usersDao.findAllUsers()
            res.json(users)
        } else {
            const users = await usersDao.findUserFilter(condition, value);
            res.json(users);
        }
    };

    const deleteUser = async (req, res) => {
        const id = req.params.id;
        // users = users.filter((user) => user._id !== id);
        await usersDao.deleteUser(id);
        res.sendStatus(200);
    };

    app.get("/api/users", findAllUsers);
    app.get("/api/users/searchUsers", findFilterUsers);
    app.delete("/api/users/:id", deleteUser);
};
export default AdminController;