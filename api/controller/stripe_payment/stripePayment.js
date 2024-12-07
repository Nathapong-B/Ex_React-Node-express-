const express = require('express');
const app = express.Router();

// This is your test secret API key.
const stripe = require("stripe")(process.env.STRIPE_SECRET_API_KEY);


app.post('/', async (req, res) => {
    try {
        const { amount = 5000 } = req.body;
        console.log(amount)
        console.log(typeof (amount))
        // return res.send('hellow')

        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "thb",
            // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
            automatic_payment_methods: {
                enabled: true,
            },
        });

        console.log(paymentIntent)

        res.send({
            clientSecret: paymentIntent.client_secret,
            // [DEV]: For demo purposes only, you should avoid exposing the PaymentIntent ID in the client-side code.
            // dpmCheckerLink: `https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${paymentIntent.id}`,
        });
    } catch (err) {
        console.log(err);
        res.status(500).sendDate({ message: 'Server Error' });
    };
});

module.exports = app;