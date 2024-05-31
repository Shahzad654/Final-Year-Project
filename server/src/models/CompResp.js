import mongoose from "mongoose";

const CompRespSchema = new mongoose.Schema({
  response: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date, 
    default: Date.now, 
  },
  complaintMsg: {
    type: String,
    required: true,
  },
  complaint: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Complaint",
    required: true,
  },
});

export const CompRespModel = mongoose.model("compresponse", CompRespSchema);