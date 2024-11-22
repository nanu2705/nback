import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import contactroute from "./routes/contactroute.js"
import Inquiryroute from "./routes/Inquiryroute.js"
import newsletterroute from "./routes/newsletterroute.js"
import datas from "./routes/Api/datas.js"
import registerroute from './routes/registerroute.js'
import loginroute from './routes/loginroute.js'
import detailroute from './routes/detailroute.js'
import reviews from './routes/Api/reviews.js'
import faq from './routes/Api/faq.js'
import razorpayroute from './routes/razorpayroute.js'
import socketroute from './routes/socketroute.js'



import path from "path";  // Ensure this is the path module
import { fileURLToPath } from "url";  // For static file serving
dotenv.config();

const app = express();

// // Static file serving (serves files from the uploads folder)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use(cors());
app.use(express.json());

const DB = process.env.MONGODB_URL



mongoose
  .connect(DB)
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log("mongo error", err));


  

// importing contact routes
app.use('/', contactroute)
app.use('/', Inquiryroute)
app.use('/', newsletterroute)
app.use('/', datas)
app.use('/', reviews)
app.use('/',faq)
app.use('/', registerroute)
app.use('/', loginroute)
app.use('/', detailroute)
app.use('/', razorpayroute)
app.use('/', socketroute)





app.listen(3034, () => {
  console.log('Server connected');
});
