import express from "express";
import { AdminsModel } from '../models/Admins.js' 

const router = express.Router();

router.post('/add', async(req,res)=>{
    const {email, password} = req.body
    const exEmail = await AdminsModel.findOne({email})
    if (exEmail) {
      res.json("Admin already exists!");
    }

    const newAdmin = new AdminsModel({ email, password });
    await newAdmin.save()
    res.json("Admin Created Successfully!")
})


router.get('/get', async(req,res)=>{
  try {
    const getAdmins = await AdminsModel.find();
    return res.json(getAdmins);
    
  } catch (error) {
      console.error("Error in fetching applications:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
  
})

router.delete("/delete/:id", async (req, res) => {
  try {
    const adminId = req.params.id;
    const admin = await AdminsModel.findById(adminId);

    if (!admin) {
      return res.status(404).json("Admin not found!");
    }

    await AdminsModel.deleteOne({ _id: adminId }); 
    res.json("Admin deleted successfully!");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json("Internal server error");
  }
});




router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const admin = await AdminsModel.findOne({ email });

  if (!admin) {
    return res.status(404).json("Admin not found!");
  }

  if (admin.password !== password) {
    return res.status(401).json("Invalid password!");
  }

  res.json("Login successful!");
});

export { router as adminsRouter };
