import express from 'express';
import mongoose from "mongoose";
import session from "express-session";
import AuthController from "./users/auth-controller.js";
import AdminController from "./users/adimin-controller.js"
import UserController from "./users/user-controller.js"
import PetsController from "./pets/pets-controller.js"
import MypetController from "./myPets/mypet-controller.js"
import LostPetController from './lostpet/controller.js';
import multer from 'multer';

mongoose.connect("mongodb+srv://michelle:tNATCJEli8lIiVM0@cluster0.qf0h9th.mongodb.net/PetSOS?retryWrites=true&w=majority");
// import PetsController from "./pets/pets-controller.js";

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }))
app.use('/uploads/images/',express.static('uploads'))
app.use(session({
    secret:"any string",
    resave:false,
    saveUninitialized: false,
    store: new session.MemoryStore(),
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



// app.post('/api/lostpet', upload.single('uploadedImage'), (req, res) => {
//     const { zipcode, gender, breed, petName, addressLastSeen, type } = req.body;
//     const uploadedImage = req.file;
//     res.json({ success: req.body });
//   });

//import controllers here
AuthController(app)
AdminController(app)
UserController(app)
PetsController(app)
MypetController(app)
LostPetController(app)
app.listen(4000);