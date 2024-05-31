import mongoose from 'mongoose'

const DataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cnic: {
    type: String,
    required: true,
  },
  refno: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  condate: {
    type: String,
    required: true,
  }
  
});

export const DataModel = mongoose.model("data", DataSchema);