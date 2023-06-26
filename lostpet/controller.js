import multer from "multer";
import { findAll, addLostPet,deleteMany,getByUserId } from "./petlost-dao.js";

const LostPetController = (app) => {

   const storage = multer.diskStorage({
      destination: function (req, file, cb) {
         cb(null, 'uploads/'); // uploads will keep under uploads/
      },
      filename: function (req, file, cb) {
         cb(null, Date.now() + '-' + file.originalname); // save file name: time + original file name
      }
   })
   const upload = multer({ storage: storage });

   app.get("/api/petlost", async (req, res) => {
      const resAll = await findAll()
      res.json({ success:true,animals: resAll.reverse() })
   })

   app.post("/api/petlost/uploadImg", upload.single('uploadedImage'), async (req, res) => {
      try {
         const imageUrl = req.file ? `/uploads/images/${req.file.filename}` : ''; // get uploaded image location
         res.json({ success: true ,url:imageUrl})
      } catch (e) {
         res.json({ success: false })
      }
   })

   app.post("/api/petlost", async (req, res) => {
      try {
         addLostPet({ ...req.body}); // add image location
         res.json({ success: true })
      } catch (e) {
         res.json({ success: false })
      }
   })

   app.get("/api/petlost/deleteAll",(req,res)=>{
      try{
         deleteMany();
         res.json({ success: true })
      }catch(e){
         res.json({ success: false ,error:e})
      }
   })

   app.get("/api/petlost/getAllByUserId",async (req,res)=>{
      try{
         console.log(req.query)
        const all=await getByUserId(req.query.userId);
         res.json({ success: true,data:all })
      }catch(e){
         res.json({ success: false ,error:e})
      }
   })
}

export default LostPetController;