import { useContext } from "react";
import { FaPhotoVideo } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";
import { useForm } from "react-hook-form";

const AddClass = () => {
    const img_hosting_token = import.meta.env.VITE_Upload_Img_Token;
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

    const onSubmitClass = (data, event) => {
        const form = event.target;
        // console.log(data);

        const formData = new FormData();
        formData.append('image', data.classPhoto[0])

        fetch(img_hosting_url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgResponse => {
                if (imgResponse.success) {
                    const img = imgResponse.data.display_url;
                    data.classPhoto = img;
                    form.reset();
                }
            })

        fetch('http://localhost:5000/classes', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => console.log(data))
    };
    return (
        <div>
            <div className='sm:w-11/12 md:w-9/12 my-7 mx-auto'>
                <form onSubmit={handleSubmit(onSubmitClass)}>
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className=" text-2xl font-medium leading-7 text-gray-900">Add a <span className='text-[#9833f9]'>Class</span></h2>
                            <p className="mt-1 text-md leading-6 text-gray-600">
                                Fill up the all information and a class!
                            </p>

                            <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="col-span-full">
                                    <label htmlFor='className' className="block text-md font-medium leading-6 text-gray-900">
                                        Class name
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-[#9833f9]">
                                            <span className="flex select-none items-center pl-3 pr-2 text-gray-500 sm:text-md">Class name/</span>
                                            <input
                                                {...register("className", { required: true })}
                                                type="text"
                                                id="className"
                                                autoComplete="className"
                                                className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 rounded-r-md ring-inset focus:ring-2 focus:ring-inset focus:ring-[#9833f9] sm:text-md sm:leading-6 outline-none"
                                                placeholder="Javascript For Beginner"
                                            />

                                        </div>
                                        {errors.className && <span className="text-red-400 text-[15px]">Class name is required</span>}
                                    </div>
                                </div>

                                <div className="col-span-full">
                                    <label htmlFor="description" className="block text-md font-medium leading-6 text-gray-900">
                                        Description
                                    </label>
                                    <div className="mt-2">
                                        <textarea
                                            {...register("classDescription", { required: true })}
                                            id="description"
                                            rows={3}
                                            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[#9833f9] placeholder:text-gray-400 outline-0 sm:text-md sm:leading-6"
                                            defaultValue={''}
                                            placeholder='Description'
                                        />
                                        {errors.classDescription && <span className="text-red-400 text-[15px]">Class description is required</span>}
                                    </div>
                                    <p className="mt-3 text-md leading-6 text-gray-600">Write a few sentences about class.</p>
                                </div>

                                <div className="col-span-full">
                                    <label htmlFor="class-photo" className="block text-md font-medium leading-6 text-gray-900">
                                        Class photo
                                    </label>
                                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                        <div className="text-center w-full md:w-10/12">
                                            <FaPhotoVideo className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                            <div className="mt-4 flex flex-col w-full text-md leading-6 text-gray-600">
                                                <input {...register("classPhoto", { required: true })} id="classPhoto" type="file" className="file-input file-input-ghost w-fit text-end mx-auto" />
                                            </div>
                                            <p className="text-xs leading-5 text-gray-600">Choose only http or https class thumbnail link</p>
                                            {errors.classPhoto && <span className="text-red-400 text-[15px]">Class Photo is required</span>}
                                        </div>
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label htmlFor="price" className="block text-md font-medium leading-6 text-gray-900">
                                        Price
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            {...register("classPrice", { required: true })}
                                            type="text"
                                            id="price"
                                            autoComplete="price"
                                            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[#9833f9] placeholder:text-gray-400 sm:text-md sm:leading-6 outline-none"
                                            placeholder='Price'
                                        />
                                        {errors.classPrice && <span className="text-red-400 text-[15px]">Price is required</span>}
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label htmlFor="seats" className="block text-md font-medium leading-6 text-gray-900">
                                        Available seats
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            {...register("seats", { required: true })}
                                            type="number"
                                            id="seats"
                                            autoComplete="seats"
                                            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[#9833f9] placeholder:text-gray-400  sm:text-md sm:leading-6 outline-none"
                                            placeholder='Available seats'
                                        />
                                        {errors.seats && <span className="text-red-400 text-[15px]">Please provide how many seats available</span>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                            <p className="mt-1 text-md leading-6 text-gray-600">Please provide valid information for submit a class</p>

                            <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <label htmlFor="instructorName" className="block text-md font-medium leading-6 text-gray-900">
                                        Instructor name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            {...register("instructorName")}
                                            type="text"
                                            id="instructorName"
                                            autoComplete="instructorName"
                                            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[#9833f9] placeholder:text-gray-400  sm:text-md sm:leading-6 outline-none"
                                            placeholder='Instructor name'
                                            defaultValue={user?.displayName}
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="instructorEmail" className="block text-md font-medium leading-6 text-gray-900">
                                        Instructor email
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            {...register("instructorEmail")}
                                            type="email"
                                            id="instructorEmail"
                                            autoComplete="instructorEmail"
                                            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[#9833f9] placeholder:text-gray-400  sm:text-md sm:leading-6 outline-none"
                                            placeholder='Instructor email'
                                            defaultValue={user?.email}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <Link to='/dashboard' type="button" className="text-md font-semibold leading-6 text-gray-900">
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            className="rounded-md bg-[#9833f9] px-3 py-2 text-md font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Add Class
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddClass;