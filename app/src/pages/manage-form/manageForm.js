import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

// npm install react-hook-form
import { useForm } from "react-hook-form";
// npm i zod @hookform/resolvers zxcvbn
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import zxcvbn from "zxcvbn";

const formSchema = z
    .object({
        email: z.string().email({ message: "Invalid email" }).nonempty({ message: 'Field is required' }),
        password: z.string().min(8, { message: 'invalid, password was least 8 digit' }).nonempty({ message: 'Field is required' }),
        confirmpassword: z.string().nonempty({ message: 'Field is required' })
    })
    .refine(data => data.password === data.confirmpassword,
        { message: 'Password is not match', path: ['confirmpassword'] });


export default function ManageForm() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({ resolver: zodResolver(formSchema) });
    const [pwdScore, setPwdScore] = useState(0);

    const onSubmit = async (data) => {
        console.log(data.password);
        console.log(zxcvbn(data.password));
    };

    const passwordScore = (password) => {
        setPwdScore(zxcvbn(password || '').score);
    };

    const setBarStrongPwd = (csscolor) => {
        return (
            Array(pwdScore).fill(null).map((item, index) => {
                return <div key={index} style={{ height: '5px', width: '5px' }} className={`bg-${csscolor} me-1 w-25`}></div>
            })
        )
    };

    const setCssColor = () => {
        if (pwdScore === 0) setBarStrongPwd('white');
        if (pwdScore === 1) return setBarStrongPwd('danger');
        if (pwdScore === 2) return setBarStrongPwd('warning');
        if (pwdScore === 3) return setBarStrongPwd('info');
        if (pwdScore === 4) return setBarStrongPwd('success');
    };


    useEffect(() => {
        passwordScore(watch().password);
        setCssColor();
    }, [watch().password]);

    const debug = () => {
        console.log(errors)
    }

    // console.log('--> ', pwdScore)

    return (
        <div className='container shadow p-4 w-50'>
            <div>
                {/* <button className='btn btn-info' onClick={debug}>debug</button> */}
                <Link to={'/'}><span className='text-secondary'>HOME</span></Link>
            </div>
            <h3 className='text-center'>Ex. Validate Form</h3>
            <h4 className='text-center mb-4'>with React-Hook-Form & Zod</h4>

            <div className="w-50 m-auto">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input {...register("email")} placeholder="Email" className="form-control mb-2"></input>
                    {errors.email && (<p className="text-danger">{errors.email.message}</p>)}

                    <input {...register('password')} placeholder="Password" type="password" className="form-control mb-2"></input>
                    {errors.password && (<p className="text-danger">{errors.password.message}</p>)}
                    {pwdScore > 0
                        ? <div className="d-flex bg-light mb-2">
                            {setCssColor()}
                        </div>
                        : <></>
                    }

                    <input {...register('confirmpassword')} placeholder="Confirm-Password" type='password' className="form-control"></input>
                    {errors.confirmpassword && (<p className="text-danger">{errors.confirmpassword.message}</p>)}

                    <button className="btn btn-primary w-100 mt-2">Submit</button>
                </form>
            </div>
        </div>
    )
};