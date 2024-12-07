import { Link } from "react-router-dom";

export default function Complete() {
    return <div className='container shadow p-4 w-50'>
        <div>
            <Link to={'/'}><span className='text-secondary'>HOME</span></Link>
        </div>
        <h3 className='text-center mb-4'>Ex. Stripe Payment</h3>
        <h1 className='text-center mb-4 fw-bold'>COMPLETE</h1>

        <hr></hr>
    </div>
};