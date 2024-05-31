import express from "express";
import { JobAppModel } from "../models/JobApp.js";
import multer from "multer";

const router = express.Router();
const upload = multer();

router.post("/apply", upload.single("cv"), async (req, res) => {
  try {
    const {
      fullname,
      fathername,
      email,
      cnic,
      qualification,
      phone,
      address,
      jobpost,
    } = req.body;
    const cv = req.file;

    if (
      !fullname ||
      !fathername ||
      !email ||
      !cnic ||
      !qualification ||
      !phone ||
      !address ||
      !cv ||
      !jobpost
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newApplication = new JobAppModel({
      fullname,
      fathername,
      email,
      cnic,
      qualification,
      phone,
      address,
      jobpost, 
      cv: {
        data: cv.buffer,
        contentType: cv.mimetype,
      },
    });

    await newApplication.save();

    res
      .status(201)
      .json({ message: "Job application submitted successfully!" });
  } catch (error) {
    console.error("Error submitting job application:", error);
    res.status(500).json({
      message: "Failed to submit job application.",
      error: error.message,
    });
  }
});

router.get("/applications", async (req, res) => {
  try {
    const applications = await JobAppModel.find();

    res.status(200).json(applications);
  } catch (error) {
    console.error("Error fetching job applications:", error);
    res.status(500).json({
      message: "Failed to fetch job applications.",
      error: error.message,
    });
  }
});

export { router as jobappRouter };
