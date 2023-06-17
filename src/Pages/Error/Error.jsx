import { Link } from "react-router-dom";
import { Fade } from "react-awesome-reveal";


const Error = () => {
    return (
        <div>
            <main className="grid min-h-full place-items-center bg-white px-5 py-5 lg:px-8">
                <div className="text-center">
                    <img className="w-full md:max-w-[500px]" src="https://miro.medium.com/v2/resize:fit:1400/1*zE2qnVTJehut7B8P2aMn3A.gif" alt="" />
                    <Fade>
                        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page not found</h1>
                        <p className="mt-6 text-base leading-7 text-gray-600">Sorry, we couldn’t find the page you’re looking for.</p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Link
                                to="/"
                                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Go back home
                            </Link>
                            <Link to="/dashboard" className="text-sm font-semibold text-gray-900">
                                Go back profile <span aria-hidden="true">&rarr;</span>
                            </Link>
                        </div>
                    </Fade>
                </div>

            </main>
        </div>
    );
};

export default Error;