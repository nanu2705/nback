import express from 'express';
import NewsLetter from '../models/Newsletter.js';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();
const app = express.Router();

app.post('/newsletter', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');  // Allow all origins
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    try {
        const { email } = req.body;

        const exist = await NewsLetter.findOne({ email });
        if (exist) {
            return res.send({ success: false, error: 'You have already subscribed.' });
        }

        const result = await NewsLetter.create({ email });

        // nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Veer Consultancy',
            html: `
                <h2>Welcome to Veer Consultancy</h2>
                <p>Hello,</p>
                <p>Thank you for subscribing to our consultancy. We are thrilled to welcome you to our community!</p>
                <p>Stay tuned for exciting news and events!</p>
                <p>Best regards,</p>
                <p>Veer Consultancy</p>
            `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);

        res.json({ success: true, message: 'Thanks for subscribing.' });
        console.log(result);

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error occurred');
    }
});

app.get('/allnewsletters', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');  // Allow all origins
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    try {
        const newsletters = await NewsLetter.find();
        if (!newsletters) {
            return res.status(404).send('Not found');
        }
        res.json({ newsletters });

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal server error' });
    }
});

app.delete('/newsletter/:id', async (req, res) => {
    try {
        const deletedData = await NewsLetter.findByIdAndDelete(req.params.id);
        console.log(deletedData);
        if (!deletedData) {
            return res.status(404).json({ success: false, error: "Data not found" });
        }
        res.json({ success: true, message: "Data Deleted successfully" })
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
});

export default app;
