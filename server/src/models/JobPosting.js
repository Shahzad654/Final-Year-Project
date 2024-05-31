import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
  jobpost:{
    type: String,
    required: true
  }
});

export const JobModel = mongoose.model("jobs", JobSchema);
