import * as usersDao from "./users-Dao.js";

export let currentUserVar;

const AuthController = (app) => {
  const register = async (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    let user = await usersDao.findUserByUsername(username);
    if (user) {
      return res.status(409).json({ message: "The user already exists" });
    }
    user = await usersDao.findUserByEmail(email);
    if (user) {
      return res.status(409).json({ message: "The user already exists" });
    }
    const newUser = await usersDao.createUser(req.body);
    req.session["currentUser"] = newUser;
    currentUserVar = newUser;
    res.json(newUser);
  };


  const login = async (req, res) => {
    const account = req.body.account;
    const password = req.body.password;

    if (!account || !password) {
      return res.status(400).json({ message: "Missing account or password" });
    }

    let user = await usersDao.findUserByUsernamePassword(account, password);
    if (user) {
      req.session["currentUser"] = user;
      currentUserVar = user;
      req.session.flag = 1;
      req.app.locals.userInfo = user;
      return res.json(user);
    }

    user = await usersDao.findUserByEmailPassword(account, password);
    if (user) {
      req.session["currentUser"] = user;
      currentUserVar = user;
      req.session.flag = 1;
      req.app.locals.userInfo = user;
      return res.json(user);
    }
    return res.status(401).send({message:"Incorrect username or password"});
    // return res.status(401).send({ error: 'Something failed!' });
  };

  const logout = (req, res) => {
    req.session.destroy();
    currentUserVar = null;
    res.sendStatus(200);
  };

  const update = async (req, res) => {
    const currentUser = currentUserVar;
    if (!currentUser) {
      return res.sendStatus(401);
    }
    const uid = currentUser._id;
    const updatedUser = req.body;
    const result = await usersDao.updateUser(uid, updatedUser);
    if (result.status === "ok") {
      const currentUserVar = { ...currentUser, ...updatedUser };
      res.json(currentUserVar);
    } else {
      res.sendStatus(500);
    }
  };

  const modify = async (req, res) => {
    const id = req.params._id;
    const status = await usersDao.updateUser(id, req.body);
    res.json(status);
  };


  const profile = (req, res) => {
    const currentUser = currentUserVar;
    if (!currentUser) {
      return res.sendStatus(404);
    }
    res.json(currentUser);
  };

  app.post("/api/users/register", register);
  app.post("/api/users/login", login);
  app.post("/api/users/profile", profile);
  app.post("/api/users/logout", logout);
  app.put("/api/users/:_id", update);
  app.put("/api/users/modify/:_id", modify);
};

export default AuthController;
