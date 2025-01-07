import { Link } from 'react-router-dom';
import { intervalTest, killInterval } from './interval-Test';
import { useEffect } from 'react';

export default function Index() {

    useEffect(() => {
        // intervalTest()
    }, []);

    const clearInt = () => {
        killInterval()
    }

    const debug=()=>{
        console.log(process.env.REACT_APP_STRIPE_PK_TEST)
    }


    return (
        <div className='container shadow p-4 w-50'>
            <div className='row'>
                {/* <button className='btn btn-info' onClick={debug}>debug</button> */}
                {/* <button className='btn btn-info' onClick={clearInt}>kill interval</button> */}
                <div className='bg-info text-center py-2 my-2 fw-bold'>Ex_React</div>
                <div className='col-6'>
                    <div>&#8728; <Link to={'/upload-abort'}><span>Ex. Upload and Abort</span></Link></div>
                    <div>&#8728; <Link to={'/click-focus'}><span>Ex. Click and Focus</span></Link></div>
                    <div>&#8728; <Link to={'/uploadtocloudinary'}><span>Ex. Upload To Cloudinary</span></Link></div>
                    <div>&#8728; <Link to={'/manage-form'}><span>Ex. Validate form</span></Link></div>
                </div>
                <div className='col-6'>
                    <div>&#8728; <Link to={'/drag-drop'}><span>Ex. Drag and Drop</span></Link></div>
                    <div>&#8728; <Link to={'/drag-drop-2'}><span>Ex. Drag and Drop 2</span></Link></div>
                    <div>&#8728; <Link to={'/stripe-payment'}><span>Ex. Stripe Payment</span></Link></div>
                    <div>&#8728; <Link to={'/pdfmake'}><span>Ex. Create Pdf</span></Link></div>
                </div>
            </div>
        </div>
    )
}