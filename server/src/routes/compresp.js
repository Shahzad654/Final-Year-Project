import express from "express";
import { CompRespModel } from "../models/CompResp.js";

const router = express.Router();

router.post("/resp", async (req, res) => {
  const { response, complaintId, complaintMsg } = req.body;

  try {

    const newResponse = new CompRespModel({
      response,
      complaint: complaintId,
      complaintMsg,
      timestamp: Date.now(),
    });
    await newResponse.save();
    res.json("Response has been successfully sent to the user!");
  } catch (error) {
    console.error("Error saving response:", error);
    res.status(500).json("Error saving response");
  }
});


export { router as respRouter };
