const express = require('express');
const app = express.Router();
const multer = require('multer');
const cloudinary = require('./config/cloudinaryConfig');

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post('/upload-images', upload.array('images'), async (req, res) => {
    try {
        // multiple upload
        let result = [];

        for (let el of req.files) {
            // แปลงข้อมูลใน buffer ที่ส่งมาจาก multer เป็น base64
            const b64 = Buffer.from(el.buffer).toString("base64");
            // จากนั้นเปลี่ยนเป็นข้อมูล URI
            const dataURI = "data:" + el.mimetype + ";base64," + b64;

            const eachResult = await cloudinary.uploader.upload(dataURI, {
                public_id: `${Date.now()}`,
                resource_type: 'auto',
                folder: 'Ex_React',
            });

            result.push(eachResult);
        };

        res.send({ message: 'Upload to cloudinary success', result });
    } catch (e) {
        console.log(e)
        res.status(500).send({ message: 'error' });
    }
});

module.exports = app;