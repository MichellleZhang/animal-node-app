import * as usersDao from "./users-Dao.js";

var currentUserVar;

const AuthController = (app) => {
    const register = async (req, res) => {
        const username = req.body.username;
        const email = req.body.email;
        let user = await usersDao.findUserByUsername(username);
        if (user) {
            res.send("The user already exists")
            return
        }
        user = await usersDao.findUserByEmail(email);
        if (user) {
            res.send("The user already exists")
            return
        }
        const newUser = await usersDao.createUser(req.body)
        currentUserVar = newUser
        res.json(newUser)
    };

    const login = async (req, res) => {
        const account = req.body.account;
        const password = req.body.password;
    
        if (!account || !password) {
            return res.status(400).send("<h4>Please enter your login information</h4>");
        }
    
        let user = await usersDao.findUserByUsernamePassword(account, password);
        if (user) {
            currentUserVar = user;
            res.json(user);
        } else {
            user = await usersDao.findUserByEmailPassword(account, password);
            if (user) {
                currentUserVar = user;
                req.session.flag = 1;
                req.app.locals.userInfo = user;
                res.json(user);
            } else {
                return res.status(404).json({ message: "Verification failed, please try again" });
            }
        }
    };

    const logout = (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    };

    const update = async (req, res) => {
        const currentUser = currentUserVar
        if (!currentUser) {
            res.sendStatus(404);
            return;
        }
        const uid = currentUser._id;
        const updatedUser = req.body;
        const result = await usersDao.updateUser(uid, updatedUser);
        if (result.status === 'ok') {
            currentUserVar = { ...currentUser, ...updatedUser };
            res.sendStatus(200);
        } else {
            res.sendStatus(500);
        }
    };

    const profile = (req, res) => {
        const currentUser = currentUserVar
        if (!currentUser) {
            res.sendStatus(404)
            return
        }
        res.json(currentUser)
    };

    app.post("/api/users/register", register);
    app.post("/api/users/login", login);
    app.post("/api/users/profile", profile);
    app.post("/api/users/logout", logout);
    app.put("/api/users/:_id", update)
};
export default AuthController;