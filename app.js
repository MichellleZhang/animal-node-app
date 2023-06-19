import express from 'express';
import mongoose from "mongoose";
import session from "express-session";
import AuthController from "./users/auth-controller.js";
import AdminController from "./users/adimin-controller.js"
mongoose.connect("mongodb://127.0.0.1:27017/PetSOS");
const app = express();
app.use(session({
    secret:"any string",
    resave:false,
    saveUninitialized: true
}))
//remote client server needs to be added later
app.use((req, res, next) => {
    const allowedOrigins = ["http://localhost:3000"];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header("Access-Control-Allow-Origin", origin);
    }
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});
app.use(express.json())

//import controllers here
AuthController(app)
AdminController(app)
app.listen(4000);