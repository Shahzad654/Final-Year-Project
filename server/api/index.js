import express from "express";
import mongoose from "mongoose";
// import { json } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { userRouter } from "../src/routes/user.js";
import { billRouter } from "../src/routes/billinfo.js";
import { chatRouter } from "../src/routes/chat.js";
import { complaintRouter } from "../src/routes/complaint.js";
import { respRouter } from "../src/routes/compresp.js";
import { appliRouter } from "../src/routes/application.js";
import { statusRouter } from "../src/routes/appstatus.js";
import { dataRouter } from "../src/routes/data.js";
import { payRouter } from "../src/routes/payment.js";
import dotenv from "dotenv";
// import pkg from "jsonwebtoken";
// const { decoded } = pkg;
import { userVerify } from "../src/routes/userVerify.js";
import { jobRouter } from "../src/routes/jobposting.js";
import { jobappRouter } from "../src/routes/jobapp.js";
import { adminsRouter } from "../src/routes/admins.js";
import { superadminRouter } from "../src/routes/superadmin.js";

dotenv.config();
const app = express();
const PORT = `${process.env.PORT || 3001}`;
const mongoURI = "mongodb+srv://shahzadj2001:WSGYbkyODEUCcRJ9@cluster0.0ryo7tr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174","http://192.168.0.101:5173". "https://6659f024e7f8115a6aef4e54--profound-croquembouche-eff66a.netlify.app" ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.get("/dashboard", userVerify, (req, res) => {
  return res.json("Success!");
});


app.use("/signup", userRouter);
app.use("/login", userRouter);
app.use('/password', userRouter);
app.use("/billinfo", billRouter);
app.use("/getusers", billRouter);
app.use("/chat", chatRouter);
app.use("/complain", complaintRouter);
app.use("/admcomplain", complaintRouter);
app.use("/compresp", respRouter);
app.use("/application", appliRouter);
app.use("/getapplication", appliRouter);
app.use("/appstatus", statusRouter);
app.use("/getappstatus", statusRouter);
app.use("/data", dataRouter);
app.use("/pay", payRouter);
app.use('/job', jobRouter)
app.use('/jobapp', jobappRouter)
app.use("/admin", adminsRouter);
app.use("/superadmin", superadminRouter);

app.listen(PORT, () => {
  console.log("Server Started Successfully!");
});
