import mongoose from "mongoose";

const JobAppSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  fathername: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cnic: {
    type: String,
    required: true,
  },
  qualification: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  jobpost: {
    type: String, 
    required: true,
  },
  cv: {
    data: Buffer,
    contentType: String,
  },
});

export const JobAppModel = mongoose.model("applyjobs", JobAppSchema);
