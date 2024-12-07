const express = require('express');
const app = express.Router();

const bodyParser = require("body-parser"); // npm i body-parser
const multer = require('multer');
const fs = require('fs')
const path = require('path')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        // console.log('17')
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName);

        // request aborted = ลบไฟล์
        req.on('aborted', () => {
            // const fullPath = './uploads/' + fileName;
            const fullPath = path.join('uploads', fileName);
            console.log('abort fullPath', fullPath);

            fs.unlinkSync(fullPath);
            file.stream.emit('end');
        });
    }
});

const memorystorage = multer.memoryStorage();

const upload = multer({ storage: memorystorage });

app.post('/', upload.array('myFile'), async (req, res) => {
    // app.post('/', async (req, res) => {
    try {
        console.log('body : ', req.body)
        console.log('files : ', req.files)
        res.send('success');

    } catch (e) {
        console.log('53', e);
        res.status(500).send('error');
    }
})

module.exports = app;