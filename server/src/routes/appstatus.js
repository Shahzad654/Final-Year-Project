import express from "express";
import { StatusModel } from "../models/AppStatus.js";
import { AppModel } from "../models/Application.js";
import { DataModel } from '../models/Data.js'

const router = express.Router();

router.post("/status", async (req, res) => {
  const { status, applicationId } = req.body;

  try {
    const application = await AppModel.findById(applicationId);
    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }

    const cnic = application.cnic;

    const newStatus = new StatusModel({
      status,
      application: applicationId,
      cnic: cnic, 
    });

    await newStatus.save();
    return res.json("Status has been successfully sent to the user!");
  } catch (error) {
    console.error("Error saving Status:", error);
    return res.status(500).json("Error saving Status");
  }
});


router.get("/getStatus", async (req, res) => {
  try {
     const { cnic } = req.query;
    console.log("Received CNIC:", cnic); 

    const status = await StatusModel.find({ cnic });
    console.log("Queried Status:", status); 

    if (status) {
      res.json(status);
    } else {
      res.status(404).json({ error: "Status not found for the provided CNIC" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});


router.post("/addrefno", async (req, res) => {
  try {
    const { refno, conndate, applicationId } = req.body;

    const application = await AppModel.findById(applicationId);
    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }

    const { applicantname, address } = application;

    const newData = new DataModel({
      refno,
      conndate,
      applicantname,
      address,
    });

    await newData.save();
    return res.json("Data has been successfully added!");
  } catch (error) {
    console.error("Error adding Data:", error);
    return res.status(500).json("Error adding Data");
  }
});





export { router as statusRouter };
