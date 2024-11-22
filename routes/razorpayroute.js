
import express from "express";
import dotenv from "dotenv";
import Razorpay from "razorpay"
dotenv.config();

const app = express();
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

app.post("/razorpay", async (req, res) => {
    const { amount } = req.body;
  
    const options = {
      amount: amount * 100, // Convert amount to smallest currency unit (e.g., paise for INR)
      currency: 'INR',
      receipt: "receipt#1",
      payment_capture: '1'
    };
  
    try {
      const response = await razorpay.orders.create(options);
      console.log(response)
      res.json({
        success: true,
        id: response.id,
        currency: response.currency
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Please try again' });
    }
  });
  
  export default app