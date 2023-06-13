import { FaGithub, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";
import Swal from "sweetalert2";

const Login = () => {
    const { handleLogin } = useContext(AuthContext);
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
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input {...register("userPassword", { required: true })} type="password" placeholder="password" className="input input-bordered" />
                                {errors.userPassword && <span className="text-red-600">Password field is empty</span>}
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button type="submit" className="custom-btn">Login</button>
                            </div>
                            <p className="text-[15px] flex gap-2 items-center">Not have any account ? <Link to='/signup' className="underline text-blue-600">Signup</Link></p>
                            <div className="divider">OR</div>
                            <div className="flex justify-center gap-2">
                                <button className="btn custom-btn p-0 btn-circle">
                                    <FaGoogle size={25} />
                                </button>
                                <button className="btn custom-btn p-0 btn-circle">
                                    <FaGithub size={25} />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;