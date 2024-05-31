import express from "express";
import { BillModel } from "../models/UserBillInfo.js";
import { UserModel } from "../models/User.js";
import { DataModel } from "../models/Data.js";
import multer from "multer";

const router = express.Router();
const upload = multer();


router.post("/bill", upload.single("billimage"), async (req, res) => {
  try {
    const { refno, billData } = req.body;

    if (!refno) {
      return res
        .status(400)
        .json({ error: "Reference number (refno) is required." });
    }

    let existingBill = await BillModel.findOne({ refno });

    if (!existingBill) {
      existingBill = new BillModel({ refno });
    }

    if (billData) {
      const parsedBillData = JSON.parse(billData);
      existingBill.billData.push(
        ...parsedBillData.map((data) => ({
          ...data,
          paystatus: data.paystatus || "unpaid",
        }))
      );
    }

    if (req.file) {
      existingBill.billData[existingBill.billData.length - 1].billimage = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    await existingBill.save();

    return res.json({
      message: "Bill Info Updated Successfully!",
    });
  } catch (error) {
    console.error("Error adding/updating bill:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});








router.get("/billdata/:refno", async (req, res) => {
  try {
    let refno = req.params.refno;
    console.log("Requested refno:", refno);

    const user = await UserModel.findOne({ refno });
    console.log("Retrieved user:", user);

    if (!user) {
      return res.status(404).json({ error: "User not found", refno });
    }

    const billData = await BillModel.findOne({ refno });
    console.log("Retrieved bill data:", billData);

    if (!billData) {
      return res.status(404).json({
        error: "Bill data not found for the user",
        refno,
      });
    }

    const response = {
      _id: billData._id,
      refno: billData.refno,
      name: user.name,
      email: user.email,
      billData: billData.billData.map((entry) => ({
        billunits: entry.billunits,
        currbill: entry.currbill,
        billmonth: entry.billmonth,
        curreading: entry.curreading,
        prevreading: entry.prevreading,
        billimage: entry.billimage,
        paystatus: entry.paystatus,
      })),
    };

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});





export { router as billRouter };
