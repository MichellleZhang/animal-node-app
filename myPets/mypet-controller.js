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

    const findMypetsICreated = async (req, res) => {
        // debugger
        console.log("11111111111")
        // console.log("start findMypetsICreate")
        const userId = currentUserVar._id;
        console.log("userIdddddd",userId)
        const results = await mypetDao.findCreatesForUser(userId);
        console.log("resultsssssss",results)
        const  mypetsRecords= results.map((result) => result.mypets);
        // res.json(mypesRecords);
        res.json("abbbbbbb");
        // res.json({ success: "200" });
    }
    
    app.post("/api/pets/create", createMypets);
    // app.get("/api/pets/myallMypets", findMypetsICreate);
    app.get("/api/pets/myallMypets1", findMypetsICreated);

}

export default MypetController;