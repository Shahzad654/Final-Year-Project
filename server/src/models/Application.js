import mongoose from 'mongoose'

const AppSchema = new mongoose.Schema({
  category: {
    type: String,
  },
  subdivision: {
    type: String,
  },
  connectiontype: {
    type: String,
  },
  negrefno: {
    type: String,
  },
  applicantstatus: {
    type: String,
  },
  applicantname: {
    type: String,
  },
  citizenship: {
    type: String,
  },
  cnic: {
    type: String,
  },
  address: {
    type: String,
  },
  mob1: {
    type: String,
  },
  mob2: {
    type: String,
  },
  installedmet: {
    type: String,
  },
  load: {
    type: String,
  },
  premaddress: {
    type: String,
  },
  propertycop: {
    type: Buffer,
  },
  cniccop: {
    type: Buffer,
  },
  witcnic: {
    type: Buffer,
  },
  negbill: {
    type: Buffer,
  },
  testreport: {
    type: Buffer,
  },
  status: {
    type: String,
    enum: ["pending", "clear"],
    default: "pending",
  },
});

export const AppModel = mongoose.model('application', AppSchema)