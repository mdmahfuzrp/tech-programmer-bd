import { Link } from "react-router-dom";

const NewOffers = () => {
    return (
        <div className="my-16">
            <div className="relative isolate overflow-hidden bg-[var(--common-secondary-color)] py-16">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 lg:max-w-none lg:grid-cols-2">
                        <div className="max-w-xl lg:max-w-lg">
                            <h2 className="text-3xl font-bold tracking-tight text-[var(--common-primary-color)] sm:text-4xl">Todays Special Hot Offers!</h2>
                            <p className="mt-4 text-lg leading-8 text-gray-200">
                                Another opertunity for growing your skill with tech programmer bd, with multiple courses and skilled amazing instructors lesson and guidelines.
                            </p>
                            <div className="mt-6 flex max-w-md gap-x-4 items-center">
                                <p className="text-white">Create Your Account Now</p>
                                <Link to='/signup'
                                    className="bg-[var(--common-primary-color)] py-1 px-3 rounded-md shadow-md"
                                >
                                    Signup Now
                                </Link>
                            </div>
                        </div>
                        <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
                            <div className="flex flex-col items-start">
                                <div className="rounded-md font-[500] text-[var(--common-primary-color)] bg-white/5 p-2 ring-1 ring-white/10">
                                    30 DAYS LEFT
                                </div>
                                <dd className="mt-2 leading-7 text-gray-200">
                                    This offer will close on that time, so hurry up and enroll a course and build your technical skill
                                </dd>
                            </div>
                            <div className="flex flex-col items-start">
                            <div className="rounded-md font-[500]  text-[var(--common-primary-color)]  bg-white/5 p-2 ring-1 ring-white/10">
                                    OUR STUDENTS
                                </div>
                                <dd className="mt-2 leading-7 text-gray-200">
                                    Our thousands of student got hired from our course, now its time to your turn!
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
                <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
                    <div
                        className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default NewOffers;