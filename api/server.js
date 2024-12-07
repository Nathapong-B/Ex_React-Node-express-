const express = require('express');
const app = express();
const cors = require('cors'); // npm i cors
const bodyParser = require("body-parser"); // npm i body-parser
require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const uploadAbortController = require('./controller/upload-abort');
const uploadtocloudinary = require('./controller/cloudinary/uploadtocloudinary');
const stripePayment = require('./controller/stripe_payment/stripePayment');

app.use('/uploads-abort', uploadAbortController);
app.use('/uploadtocloudinary', uploadtocloudinary);
app.use('/stripe-payment', stripePayment);

const port = 3001;
app.listen(port, () => {
    console.log('server start on port : ', port);
})
