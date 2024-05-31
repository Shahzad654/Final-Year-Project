import mongoose from "mongoose";

const BillinfoSchema = new mongoose.Schema({
  refno: {
    type: String,
  },
  billData: [
    {
      billunits: {
        type: String,
      },
      currbill: {
        type: String,
      },
      billmonth: {
        type: String,
      },
      curreading: {
        type: String,
      },
      prevreading: {
        type: String,
      },
      duedate: {
        type: String,
      },
      billimage: {
        data: Buffer,
        contentType: String,
      },
      paystatus: {
        type: String,
        enum: ["paid", "unpaid"],
        default: "unpaid",
      },
    },
  ],
});

export const BillModel = mongoose.model("billinfos", BillinfoSchema);
