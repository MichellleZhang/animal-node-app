import * as mypetDao from "./mypet-dao.js"
import { currentUserVar } from "../users/auth-controller.js";

const MypetController = (app) => {
    const createMypets = async (req, res) => {
        if (currentUserVar) {
            const userId = currentUserVar._id;
            const newMypets = await mypetDao.createMypets(req.body, userId);
            console.log("newMypetssssssss", newMypets);
            mypetDao.createCreate(newMypets._id, userId);
            res.json(newMypets);
        } else {
            res.status(401).json({ error: "Unauthorized" });
        }
    };

    const findMypetss = async (req, res) => {
        if (currentUserVar) {
            const userId = currentUserVar._id;
            const results = await mypetDao.findCreatesForUser(userId);
            const mypetsRecords = results.map((result) => result.mypets);
            res.json(mypetsRecords);
        } else {
            res.status(401).json({ error: "Unauthorized" });
        }
    };

    const deleteMypets = async (req, res) => {
        const id = req.params.id;
        console.log("idddd here", id)
        await mypetDao.deleteMypets(id);
        res.sendStatus(200);
    };

    const findVisitedpetss = async (req, res) => {
            const userId = req.params.id;
            console.log("user id for current progile", userId)
            const results = await mypetDao.findCreatesForUser(userId);
            const mypetsRecords = results.map((result) => result.mypets);
            res.json(mypetsRecords);
    };

    app.post("/api/pets/create", createMypets);
    app.delete("/api/petss/:id", deleteMypets);
    // app.get("/api/pets/myallMypets", findMypetss);
    app.get("/api/petss/myallMypets", findMypetss);
    app.get("/api/petss/:id", findVisitedpetss);
}

export default MypetController;