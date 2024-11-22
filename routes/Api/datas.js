import express from "express";
import fs from "fs"
import path from 'path'
import { fileURLToPath } from 'url';
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '../../Assets')));

app.get('/api/service-details', (req, res) => {
    const filePath = path.join(__dirname, '../../data.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        const jsonData = JSON.parse(data);

        const updatedJson = jsonData.map(item => ({
            ...item,
            icon: item.icon ? `${req.protocol}://${req.get('host')}${item.icon}` : item.icon,
            country: item.country?.map(product => ({
                ...product,
                img: product.img ? `${req.protocol}://${req.get('host')}${product.img}` : product.img,
                countryImages: product.countryImages?.map(i => i ? `${req.protocol}://${req.get('host')}${i}` : i)
            }))
        }));

        return res.json(updatedJson);
    })
})

export default app