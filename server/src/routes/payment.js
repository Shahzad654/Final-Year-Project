import express from "express";
import Stripe from "stripe";
import { PaystatusModel } from "../models/Paystatus.js";
import { BillModel } from "../models/UserBillInfo.js";

const router = express.Router();
const stripe = new Stripe(
  "sk_test_51OhUvYSJB3nVoBOoyW6Li0klLl9wTTuaJYxgzS8w862XqXKX8WUlXpw4cZYKDRjQeeKd9dwdKqPSwR2klr5Qirie00XMt4xIBO"
);

router.post("/checkout", async (req, res) => {
  try {
    if (!req.body.items || req.body.items.length === 0) {
      throw new Error("No items provided for checkout.");
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map((item) => ({
        price_data: {
          currency: "pkr",
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100,
        },
        quantity: 1,
      })),
      // success_url: `http://localhost:5173/payment/success?transactionId={CHECKOUT_SESSION_ID}`,
      success_url: "http://localhost:5173/dashboard",
      cancel_url: "http://localhost:5173/cancel",
    });

    const transaction = new PaystatusModel({
      items: req.body.items.map((item) => ({
        name: item.name,
        price: item.price,
        refno: item.refno,
      })),
      paymentStatus: "paid",
    });

    const savedTransaction = await transaction.save();
    console.log(
      "Redirecting to success route with transaction ID:",
      savedTransaction._id
    );

    console.log("Refno from req.body:", req.body.items[0].refno);

   const refno = req.body.items[0].refno;
   const bill = await BillModel.findOne({ refno });

   if (!bill) {
     return res.status(404).json({ error: "Bill not found." });
   }

   const lastBillData = bill.billData[bill.billData.length - 1];
   lastBillData.paystatus = "paid";
   await bill.save();




    res.json({ url: session.url });
  } catch (error) {
    console.error("Error creating Stripe Checkout session:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request." });
  }
});



router.post("/update-status", async (req, res) => {
  try {
    const { refno } = req.body;
    console.log("Received refno:", refno); 

    const bill = await BillModel.findOneAndUpdate(
      { refno },
      { paystatus: "unpaid" }
    );
    if (!bill) {
      return res.status(404).json({ error: "Bill not found." });
    }

    const payStatus = await PaystatusModel.findOneAndUpdate(
      { refno },
      { paymentStatus: "unpaid" }
    );
    if (!payStatus) {
      return res.status(404).json({ error: "Pay status not found." });
    }

    res.status(200).json({ message: "Payment status updated to unpaid." });
  } catch (error) {
    console.error("Error updating payment status:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while updating payment status." });
  }
});







export { router as payRouter };
