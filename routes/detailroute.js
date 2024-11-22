import express from "express";
// import multer from "multer";
// import path from "path";
import cors from "cors";
import bodyParser  from "body-parser";
import Detail from "../models/Detail.js";
// import File from "../models/File.js";

const app = express.Router();


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         // store the files in this 
//         cb(null, 'uploads/');
//     },
//     filename: function (req, file, cb) {
//         // unique saved file name
//         cb(null, Date.now() + '-' + file.originalname);
//     }
// });

// const upload = multer({ storage : storage });

app.use(cors());
app.use(bodyParser.json());

app.post('/details',async (req, res) => {
    const { sname,cname,date,email,mobileNo,quantity } = req.body;
    console.log(sname,cname,date,email,mobileNo,quantity)
    try {
    
        
      

      

        // Save detail in the Detail collection
        const detail = await Detail.create({
           sname,
           cname,
            date,
            quantity,
            email, 
            mobileNo,
          
     // photo: result1.filepath,
            // passportfront: result2.filepath,
            // passportback: result3.filepath,
        })
        console.log(detail)
        res.json({ success: true, message: 'Thanks Data saved successfully' });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal server error occurred');
    }
});

app.get('/details', async (req, res) => {
    try {
        const data = await Detail.find();
        res.json({ data });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send(`Error fetching data: ${error.message}`);
    }
});


app.delete('/details/:id', async (req, res) => {
    try {
        const deletedData = await Detail.findByIdAndDelete(req.params.id);

        if (!deletedData) {
            return res.status(404).json({ success: false, error: "details not found" });
        }
        res.json({ success: true, message: "Data Deleted successfully" })
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }   
});

export default app