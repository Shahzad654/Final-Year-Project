import express from "express";
import multer from "multer";
import { AppModel } from "../models/Application.js";
import { DataModel } from "../models/Data.js";
import {StatusModel} from '../models/AppStatus.js'

const router = express.Router();
const upload = multer();

router.post(
  "/subapli",
  upload.fields([
    { name: "propertycop", maxCount: 1 },
    { name: "cniccop", maxCount: 1 },
    { name: "witcnic", maxCount: 1 },
    { name: "negbill", maxCount: 1 },
    { name: "testreport", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const{
        category,
        subdivision,
        connectiontype,
        negrefno,
        applicantstatus,
        applicantname,
        citizenship,
        cnic,
        address,
        mob1,
        mob2,
        installedmet,
        load,
        premaddress,
      } = req.body;

       const newApplication = new AppModel({
         category,
         subdivision,
         connectiontype,
         negrefno,
         applicantstatus,
         applicantname,
         citizenship,
         cnic,
         address,
         mob1,
         mob2,
         installedmet,
         load,
         premaddress,
         status: "pending",
       });

      if (req.files) {
        newApplication.propertycop = req.files["propertycop"][0].buffer;
        newApplication.cniccop = req.files["cniccop"][0].buffer;
        newApplication.witcnic = req.files["witcnic"][0].buffer;
        newApplication.negbill = req.files["negbill"][0].buffer;
        newApplication.testreport = req.files["testreport"][0].buffer;
      }

      await newApplication.save();

      return res.json({
        message: "Application submitted successfully!",
      });
    } catch (error) {
      console.error("Error in submitting application:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
);



router.get("/getsubapli", async (req, res) => {
  try {
    const applications = await AppModel.find();

    return res.json(applications);
  } catch (error) {
    console.error("Error in fetching applications:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});


router.put("/updatestatus/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedApplication = await AppModel.findByIdAndUpdate(
      id,
      { status: "clear" },
      { new: true }
    );

    if (!updatedApplication) {
      return res.status(404).json({ error: "Application not found" });
    }

    return res.json({
      message: "Application status updated successfully",
      updatedApplication,
    });
  } catch (error) {
    console.error("Error updating application status:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});


router.post("/assignref", async (req, res) => {
  try {
    const { assignrefno, conndate, appId } = req.body; 

    const application = await AppModel.findById(appId);

    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }

    const newData = new DataModel({
      name: application.applicantname,
      cnic: application.cnic,
      refno: assignrefno,
      address: application.address,
      condate: conndate,
    });

    await newData.save();

    const newStatus = new StatusModel({
      cnic: application.cnic,
      application: application._id,
      refno: assignrefno, 
    });


     await newStatus.save();

    return res.json({
      message: "Reference assigned and application details saved successfully!",
      data: newData,
    });
  } catch (error) {
    console.error(
      "Error in assigning reference and saving application details:",
      error
    );
    return res.status(500).json({ error: "Internal Server Error" });
  }
});



export { router as appliRouter };
