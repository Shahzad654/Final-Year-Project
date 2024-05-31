import express from 'express'
import { DataModel } from '../models/Data.js'
import { UserModel } from "../models/User.js";

const router = express.Router()


router.post('/postdata', async(req,res)=>{
    const {name, sno, refno, address, condate} = req.body
    const preRefno = await DataModel.findOne({refno})
    if(preRefno){
        res.json("User already exists!")
    }

    const newRefno = new DataModel({ name, sno, refno, address, condate })
    await newRefno.save()

    res.json("User added successfully!")

})

router.get("/getdata", async (req, res) => {
  try {
    const users = await DataModel.find();

    if (users.length === 0) {
      return res.status(404).json({ error: "No users found" });
    }

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/deletedata/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const deletedUser = await DataModel.findByIdAndDelete(userId);
   
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});





export {router as dataRouter}