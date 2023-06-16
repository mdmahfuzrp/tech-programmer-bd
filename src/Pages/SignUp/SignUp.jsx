import { FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";

const SignUp = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';
    
    const { handleSignup, auth } = useContext(AuthContext);
    
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data, event) => {
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
            fetch('http://localhost:5000/users', {
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
                                    <input {...register("userPhoto")} type="text" placeholder="Photo (optional)" className="input input-bordered" />
                                </div>
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input {...register("userPassword", { required: true })} type="password" placeholder="Password" className="input input-bordered" />
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