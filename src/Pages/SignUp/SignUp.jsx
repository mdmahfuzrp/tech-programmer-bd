import { FaEyeSlash, FaGithub, FaGoogle, FaRegEye } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import useTitle from "../../hooks/useTitle";

const SignUp = () => {
    
    // Set Website Title
    useTitle('Signup')

    const [passError, setPassError] = useState('');
    const [togglePass, setTogglePass] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';
    const { handleSignup, auth, handleGoogleSignIn } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();

    // Password Validation Regular Exp:
    const capitalLetterRegex = /[A-Z]/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

    const onSubmit = (data, event) => {
        const password = data.userPassword;
        const confirmPass = data.confirmUserPassword;
        console.log('password: ', password);
        if(password.length < 6){
            setPassError('Please provide at least 6 digit password!');
            return;
        }
        if(!capitalLetterRegex.test(password)){
            setPassError('Please provide at least 1 capital letter!');
            return;
        }
        if(!specialCharRegex.test(password)){
            setPassError('Please provide at least 1 special character!');
            return;
        }
        if(password !== confirmPass){
            setPassError("Password doesn't match!");
            return;
        }
        // setUserInfo(data);
        const form = event.target;
        handleSignup(data.userEmail, data.userPassword)
            .then((result) => {
                const newUser = result.user;
                updateUserInfo(data?.userName, data?.userPhoto, newUser.email, data.userPassword);

                Swal.fire({
                    title: 'Congratulations!',
                    text: 'Your account created successful',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                })
                navigate(from, { replace: true });
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

    const updateUserInfo = (name, photo, email) => {
        updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        }).then(() => {
            const newUserInfo = {
                userName: name ? name : email,
                photoURL: photo,
                userEmail: email,
                role: 'student'
            }
            console.log('updated profile', newUserInfo);
            fetch('https://tech-programmer-bd-server.vercel.app/users', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(newUserInfo)
            })
                .then(res => res.json())
                .then(data => console.log(data))
        }).catch((error) => {
            console.log(error);
        });
    }
    // console.log(userInfo);

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
            <div className="hero bg-[var(--bg-color)]">
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
                                    <input {...register("userPhoto")} type="text" placeholder="Photo (optional)" className="input input-bordered" />
                                </div>
                            </div>
                            <div className="flex flex-col lg:flex-row justify-between lg:gap-5">
                                <div className="form-control w-full relative">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input {...register("userPassword", { required: true })} type={togglePass ? 'text': 'password'} placeholder="Password" className="input input-bordered" />
                                    {errors.userPassword && <span className="text-red-600 text-[15px] mt-1">Password field is required</span>}
                                    {
                                        passError && <span className="text-red-600 text-[15px] mt-1">{passError}</span>
                                    }
                                    {
                                        togglePass ? <p onClick={()=> setTogglePass(!togglePass)} className="absolute top-[62%] right-3 cursor-pointer text-[#9833f9]"><FaRegEye size={18} /></p>
                                        : <p onClick={()=> setTogglePass(!togglePass)} className="absolute top-[62%] right-3 cursor-pointer text-gray-500"><FaEyeSlash FaRegEye size={18} /></p>
                                    }
                                </div>
                                
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text">Confirm </span>
                                    </label>
                                    <input {...register("confirmUserPassword")} type="password" placeholder="Confirm password" className="input input-bordered" />
                                </div>
                            </div>
                            <div className="form-control mt-6">
                                <button type="submit" className="custom-btn">Signup</button>
                            </div>
                            <p className="text-[15px] flex gap-2 items-center text-black">Already have an account ? <Link to='/login' className="underline text-blue-600">Login</Link></p>

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

export default SignUp;