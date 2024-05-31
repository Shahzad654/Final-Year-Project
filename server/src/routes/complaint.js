import express from "express";
import { ComplaintModel } from "../models/Complaint.js";

const router = express.Router();

router.post('/comp', async (req, res) => {
  try {
    const { userName, email, cellno, city, division, nature, refno, complaintmsg } = req.body;
    console.log(req.body);
    const newComplaint = new ComplaintModel({
      userName,
      email,
      cellno,
      city,
      division,
      nature,
      refno,
      complaintmsg,
      status: "pending",
    });
    await newComplaint.save();

    res.json({
      message: "Complaint Successfully Submitted!",
    });
  } catch (err) {
    res.json(err);
    console.error(err); 
    res.status(500).json({
      error: "Internal Server Error",
      details: err.message
    })
  }
});

router.put("/comp/:id", async (req, res) => {
  try {
    const { id } = req.params;


    const updatedComplaint = await ComplaintModel.findByIdAndUpdate(
      id,
      { status: "clear" },
      { new: true }
    );

    if (!updatedComplaint) {
      return res.status(404).json({ error: "Complaint not found." });
    }

    res.json({
      message: "Complaint status updated to 'clear' successfully.",
      complaint: updatedComplaint,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Internal Server Error",
      details: err.message,
    });
  }
});


router.get('/getcomp', async(req,res)=>{
  const findComplaint = await ComplaintModel.find();
    res.json(findComplaint)
})


export { router as complaintRouter };
