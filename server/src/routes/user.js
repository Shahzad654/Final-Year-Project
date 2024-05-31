import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import crypto from 'crypto'
import { UserModel } from "../models/User.js";
import { BillModel } from "../models/UserBillInfo.js";
import { CompRespModel } from "../models/CompResp.js";
import { ComplaintModel } from "../models/Complaint.js";
import { DataModel } from "../models/Data.js";


const router = express.Router();
const jwtkey = 'g_epco'


router.post("/sign", async (req, res) => {
  const { name, refno, email, password } = req.body;
  const existingData = await DataModel.findOne({ refno });

  if (!existingData) {
    return res
      .status(400)
      .json({ error: "Reference number does not exist in DataModel!" });
  }
  if (password.length < 8) {
    return res
      .status(400)
      .json({ error: "Password must be at least 8 characters long!" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      name,
      refno,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    console.log("User Registered Successfully!");

    res.json({
      message: "User Registered Successfully!",
    });
  } catch (err) {
    console.error(err);
    res.json(err);
  }
});


router.post("/log", async (req, res) => {
  const { refno, password } = req.body;

  try {
    const user = await UserModel.findOne({ refno });
    console.log("Retrieved user:", user);
    const userbill = await BillModel.findOne({ refno });
     const complaints = await ComplaintModel.find({ refno: user.refno });
     if (!complaints.length) {
       return res.status(404).json("No complaints found!");
     }

     const complaintResponses = await Promise.all(
       complaints.map(async (complaint) => {
         const compResp = await CompRespModel.find({
           complaint: complaint._id,
         });
         return {
           responses: compResp.map((msg) => ({
             response: msg.response,
             timestamp: msg.timestamp,
             complaintMsg: msg.complaintMsg,
           })),
         };
       })
     );
    const data = await DataModel.findOne({ refno });
    const address = data ? data.address : null;

    // const complaintMessage = complaint ? complaint.message : null;

    if (!user || !userbill) {
      return res
        .status(404)
        .json("User, bill data, complaint, or compResp not found!");
    }

     const lastBillData = userbill
       ? userbill.billData[userbill.billData.length - 1]
       : null;

    if (!user.password) {
      res.status(401).json({ message: "Incorrect Password!" });
    }

    bcrypt.compare(password, user.password, (err, response) => {
      if (err) {
        console.error("Error comparing passwords:", err);
        return res.status(500).json("Error comparing passwords");
      }

      if (response) {
        const token = jwt.sign(
          { refno: user.refno },
          jwtkey,
          {
            expiresIn: "4d",
          }
        );
        res.cookie("token", token);

        res.json({
          message: "Success!",
          token,
          name: user.name,
          refno: user.refno,
          email: user.email,
          area: user.address,
          userId: user._id,
          billData: userbill?.billData,
          curreading: userbill.curreading,
          prevreading: userbill.prevreading,
          filedComplaints: complaints.map((complaint) => ({
            userName: user.name,
            email: user.email,
            cellno: user.cellno,
            city: user.city,
            division: user.division,
            nature: complaint.nature,
            refno: complaint.refno,
            complaintmsg: complaint.complaintmsg,
          })),
          // responsemsg: compResp.responsemsg,
          complaintResponses,
          price: lastBillData ? lastBillData.currbill : null,
          paymentStatus: lastBillData ? lastBillData.paystatus : null,
          // paymentStatus: lastBillData ? lastBillData.paymentStatus : null,
        });
      } else {
        res.json("Incorrect Password!");
      }
    });
  } catch (error) {
    console.error(error);
    res.json("Error finding user, bill data, complaint, or compResp");
  }
});




const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "dev.shahzad413@gmail.com",
    pass: "atyu udvb tthg hjaw",
  },
});

const otps = {};

router.post("/forgot-password", async (req, res) => {
  console.log("Forgot password request received", req.body);
  const { email } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }


    const otp = crypto.randomBytes(3).toString("hex");
    otps[email] = otp;
    console.log(`Generated OTP for ${email}: ${otp}`);


    await transporter.sendMail({
      from: "dev.shahzad413@gmail.com",
      to: email,
      subject: "Your OTP for Password Reset",
      text: `Your OTP is: ${otp}`,
    });

    res.json({ message: "OTP sent to your email" });
  } catch (error) {
    console.error("Error during forgot password request:", error);
    res.status(500).json({ message: "Error during forgot password request" });
  }
});

router.post("/verify-otp", (req, res) => {
  console.log("Verify OTP request received", req.body);
  const { email, otp } = req.body;

  if (otps[email] && otps[email] === otp) {
    console.log(`OTP verified for ${email}`);
    delete otps[email]; 
    res.json({ message: "OTP verified", email });
  } else {
    console.log(`Invalid OTP for ${email}`);
    res.status(400).json({ message: "Invalid OTP" });
  }
});

router.post("/reset-password", async (req, res) => {
  console.log("Reset password request received", req.body);
  const { email, newPassword } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }


    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password has been reset successfully" });
  } catch (error) {
    console.error("Error during password reset request:", error);
    res.status(500).json({ message: "Error during password reset request" });
  }
});




export { router as userRouter };
