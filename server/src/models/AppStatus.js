import mongoose from "mongoose";

const StatusSchema = new mongoose.Schema({
  cnic: {
    type: String,
    required: true
  },
  status: {
    type: String,
  },
  application: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Application",
    required: true,
  },
  refno:{
    type: String
  }
});

export const StatusModel = mongoose.model("appstatus", StatusSchema);
