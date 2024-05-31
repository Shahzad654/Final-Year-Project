import mongoose from 'mongoose'

const ComplaintSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cellno: {
    type: String,
  },
  city: {
    type: String,
  },
  division: {
    type: String,
  },
  nature: {
    type: String,
  },
  refno: {
    type: String,
    required: true,
  },
  complaintmsg: {
    type: String,
  },
  status: {
    type: String,
    enum: ["pending", "clear"],
    default: "pending",
  },
});

export const ComplaintModel = mongoose.model('complaint', ComplaintSchema)