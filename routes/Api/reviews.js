import express from "express";
import fs from "fs"
import path from 'path'
import { fileURLToPath } from 'url';
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get('/api/reviews', (req, res) => {
    const filePath = path.join(__dirname, '../../reviews.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        const jsonData = JSON.parse(data);
        return res.json(jsonData)
    })

})

export default app