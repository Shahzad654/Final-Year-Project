import express from "express";
import { JobModel } from "../models/JobPosting.js";

const router = express.Router();

router.post("/jobpost", async (req, res) => {
  const { jobpost } = req.body;
  try {
    const existingJob = await JobModel.findOne({ jobpost });
    if (existingJob) {
      return res.status(400).send("Job is already posted");
    }
    const newJob = new JobModel({ jobpost });
    await newJob.save();
    res.json(newJob);
  } catch (error) {
    console.error("Error posting job:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/getjobs", async (req, res) => {
  try {
    const jobs = await JobModel.find();

    return res.json(jobs);
  } catch (error) {
    console.error("Error in fetching applications:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedJob = await JobModel.findByIdAndDelete(id);
    if (!deletedJob) {
      return res.status(404).send("Job not found");
    }
    return res.json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("Error deleting job:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export { router as jobRouter };
