import { FaGithub, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";

const SignUp = () => {
    const [userInfo, setUserInfo] = useState(null);
    const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data, event) => {
    setUserInfo(data);
    const form = event.target;
    form.reset();
  };
  console.log(userInfo);


    return (
        <div className="w-11/12 mx-auto">
            <div className="hero bg-base-200">
                <div className="w-full lg:w-2/3">
                    <div className="card flex-shrink-0 shadow-md bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body w-full">
                            <div className="flex flex-col lg:flex-row justify-between lg:gap-5">
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input {...register("userName", { required: true })} type="text" placeholder="Name" className="input input-bordered" />
                                    {errors.userName && <span className="text-red-600">Name is required</span>}
                                </div>
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input {...register("userEmail", { required: true })} type="email" placeholder="Email" className="input input-bordered" />
                                    {errors.userEmail && <span className="text-red-600">Email is required</span>}
                                </div>
                            </div>
                            <div className="flex flex-col lg:flex-row justify-between lg:gap-5">
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text">Photo URL</span>
                                    </label>
                                    <input {...register("userPhoto", { required: true })} type="text" placeholder="Photo" className="input input-bordered" />
                                    {errors.userPhoto && <span className="text-red-600">Photo URL is required</span>}
                                </div>
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input {...register("userPassword", { required: true })}  type="password" placeholder="Password" className="input input-bordered" />
                                    {errors.userPassword && <span className="text-red-600">Password field is required</span>}
                                </div>
                            </div>
                            <div className="form-control mt-6">
                                <button type="submit" className="custom-btn">Signup</button>
                            </div>
                            <p className="text-[15px] flex gap-2 items-center">Already have an account ? <Link to='/login' className="underline text-blue-600">Login</Link></p>

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

export default SignUp;