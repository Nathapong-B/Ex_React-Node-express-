import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./checkoutform"

// Make sure to call loadStripe outside of a component’s render to avoid recreating the Stripe object on every render.
// This is your test publishable API key. 
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK_TEST);
// const stripePromise = loadStripe("pk_test_51QR8tzK9yWLzWzwqfgwM6q35y3uI4SWTV4jvaitp3xt6Sy4UhmVZqxOoTtPNK6MMNGaQyCakjwX7jOM4xLtUXHvm00LZOMOhRH");

export default function StripePayment() {
    const [amount, setAmount] = useState(0);
    const [clientSecret, setClientSecret] = useState('');

    const config = {
        apiPath: 'http://localhost:3001',
    }

    // useEffect(()=>{
        // mail : test01 รอทดสอบว่า หาก qr พร้อมเพย์หมดอายุ รหัส client_secret จะยังคงใช้ได้จนกว่าจะชำระสำเร็จ
        // setClientSecret('xxxxxxxxx')
    // },[])

    const handlePayment = async () => {
        const res = await axios.post(config.apiPath + '/stripe-payment', { amount });

        console.log(res.data.clientSecret)
        setClientSecret(res.data.clientSecret);
    }

    const appearance = {
        theme: 'stripe',
    };
    // Enable the skeleton loader UI for optimal loading.
    const loader = 'auto';

    return <div className='container shadow p-4 w-50'>
        {/* <button className="btn btn-info" onClick={debug}>debug</button> */}
        <div>
            <Link to={'/'}><span className='text-secondary'>HOME</span></Link>
        </div>
        <h3 className='text-center mb-4'>Ex. Stripe Payment</h3>

        {clientSecret
            ? <Elements options={{ clientSecret, appearance, loader }} stripe={stripePromise}>
                <CheckoutForm />
            </Elements>
            : <div className="d-flex justify-content-center">
                <div className="w-50 me-2">
                    <input className="form-control" placeholder="ป้อนจำนวนเงิน" onChange={e => setAmount(e.target.value)}></input>
                </div>
                <button className="btn btn-success" onClick={() => handlePayment()}>PAYMENT</button>
            </div>
        }

        <hr></hr>

    </div>
};