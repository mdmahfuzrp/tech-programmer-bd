import { FaEyeSlash, FaGithub, FaGoogle, FaRegEye } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import useTitle from "../../hooks/useTitle";

const Login = () => {
    
    // Set Website Title
    useTitle('Login')


    const [togglePass ,setTogglePass] = useState(false)
    const { handleLogin, handleGoogleSignIn } = useContext(AuthContext);

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data, event) => {
        const form = event.target;

        handleLogin(data.userEmail, data.userPassword)
            .then(() => {
                Swal.fire({
                    title: 'Welcome!',
                    text: 'Your login successful',
                    icon: 'success',
                    confirmButtonText: 'Done'
                })
                form.reset();
                navigate(from, { replace: true });
            })
            .catch(error => {
                console.log(error);
                Swal.fire({
                    title: 'Please try again!',
                    text: 'Something went wrong',
                    icon: 'error',
                    confirmButtonText: 'Try again'
                })
            })
    };

    const handleGoogleLogin = () => {
        handleGoogleSignIn()
            .then(() => {
                Swal.fire({
                    title: 'Welcome!',
                    text: 'Your login successful',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                })
                navigate(from, { replace: true });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <div className="w-11/12 mx-auto">
            <div className="hero bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-md bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input {...register("userEmail", { required: true })} type="email" placeholder="email" className="input input-bordered" />
                                {errors.userEmail && <span className="text-red-600">Empty email not allowed</span>}
                            </div>
                            <div className="form-control relative">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input {...register("userPassword", { required: true })} type={togglePass ? 'text': 'password'} placeholder="password" className="input input-bordered" />
                                {errors.userPassword && <span className="text-red-600">Password field is empty</span>}
                                {
                                    togglePass ? <p onClick={() => setTogglePass(!togglePass)} className="absolute top-[62%] right-3 cursor-pointer text-[#9833f9]"><FaRegEye size={18} /></p>
                                        : <p onClick={() => setTogglePass(!togglePass)} className="absolute top-[62%] right-3 cursor-pointer text-gray-500"><FaEyeSlash FaRegEye size={18} /></p>
                                }
                            </div>
                            <div className="form-control mt-6">
                                <button type="submit" className="custom-btn">Login</button>
                            </div>
                            <p className="text-[15px] flex gap-2 items-center">Not have any account ? <Link to='/signup' className="underline text-blue-600">Signup</Link></p>
                            <div className="divider">OR</div>

                        </form>
                        <div className="flex justify-center gap-2 mb-5">
                            <button onClick={handleGoogleLogin} className="btn custom-btn p-0 btn-circle">
                                <FaGoogle size={25} />
                            </button>
                            <button className="btn custom-btn p-0 btn-circle">
                                <FaGithub size={25} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;