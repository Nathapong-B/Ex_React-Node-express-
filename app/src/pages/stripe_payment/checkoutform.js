import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    PaymentElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";

export default function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const nav = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsLoading(true);

        const result = await stripe.confirmPayment({
            elements,
            //   confirmParams: {
            //     // Make sure to change this to your payment completion page
            //     return_url: "http://localhost:3000/complete",
            //   },
            redirect: "if_required" // เพิ่มบรรทัดนี้เพื่อไม่ให้ redirect
        });
        console.log(result)

        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        if (result.error) {
            console.log('error')
            setMessage(result.error.message);
        } else if (result.paymentIntent.status === 'succeeded') {
            console.log('succeeded')
            nav('/complete');
        } else {
            console.log('error in else')
        }

        setIsLoading(false);
    };

    const paymentElementOptions = {
        layout: "accordion"
    }

    return (
        <>
            <form id="payment-form" onSubmit={handleSubmit}>

                <PaymentElement id="payment-element" options={paymentElementOptions} />
                <button disabled={isLoading || !stripe || !elements} id="submit" className="btn btn-primary w-100 mt-3">
                    <span id="button-text">
                        {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
                    </span>
                </button>
                {/* Show any error or success messages */}
                {message && <div id="payment-message">{message}</div>}
            </form>
        </>
    );
}