import User from "../models/Register.js";
import express from "express";
import dotenv from "dotenv";
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt'
dotenv.config();
const app = express();

app.post('/register', async (req, res) => {
  const { name, email, mobile, password } = req.body;
  try {

    // Check if the user with the given email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({ success: false, error: 'Email already registered, please login!' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // add data
    const result = await User.create({
      name,
      email,
      mobile,
      password: hashedPassword,

    });
    console.log(result);

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Define email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Welcome to Veer Consultancy',
      html: `
          <p>Hello ${name}</p>
          <p>Thank you for registering with Veer Consultancy. We are excited to have you on board!</p>
          <p>Best regards,</p>
         
        `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    res.json({ success: true, message: ' Thanks Registration successful' });
  }



  catch (error) {
    console.error('Error during registration:', error);

    res.status(500).json({ success: false, error: 'Internal Server Error' });

  }

});

export default app