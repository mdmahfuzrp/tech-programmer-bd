import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";
import { useQuery } from "react-query";
import { ProgressBar } from "react-loader-spinner";

const MyClasses = () => {
    const { user } = useContext(AuthContext);

    const { data: myClasses = [], refetch, isLoading } = useQuery(['classes'], async () => {
        const res = await fetch(`https://tech-programmer-bd-server.vercel.app/classes/${user?.email}`);
        return res.json();
    })

    return (

        <div>
            {myClasses.length > 0 ? <div>
                <div className="p-5">
                    {
                        !isLoading ? <>

                            <div className="overflow-x-auto bg-[#ffb277] p-5 rounded-lg">
                                <h1 className="mb-3 text-2xl font-semibold text-black">My Classes:</h1>
                                <table className="table border border-[white]">
                                    {/* head */}
                                    <thead>
                                        <tr>
                                            <th>Class Information</th>
                                            <th>Instructor Info.</th>
                                            <th>Price & Seats</th>
                                            <th>Status</th>
                                            <th>Enrolled</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            myClasses.map(c => <tr key={c._id}>
                                                <td>
                                                    <div className="flex items-center space-x-3">
                                                        <div className="avatar">
                                                            <div className="mask mask-squircle w-12 h-12">
                                                                <img src={c?.classPhoto} alt="Avatar Tailwind CSS Component" />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="font-bold">{c?.className}</div>
                                                            <div className="text-sm opacity-75 max-w-[180px]">
                                                                {c?.classDescription.length > 40
                                                                    ? `${c?.classDescription.slice(0, 40)}...`
                                                                    : c?.classDescription}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="">
                                                    <div>
                                                        <div className="font-bold">Instructor: {c?.instructorName}</div>
                                                        <div className="text-sm opacity-75">Email: {c?.instructorName}</div>
                                                    </div>
                                                </td>
                                                <td className="">
                                                    <div>
                                                        <div className="font-bold">Price: {c?.classPrice}</div>
                                                        <div className="text-sm opacity-75">Available Seats: {c?.seats}</div>
                                                    </div>
                                                </td>
                                                <td><div className="badge text-[white] font-[300] py-3 capitalize badge-neutral">{c?.status}</div></td>
                                                <th>
                                                <div className="badge text-[white] font-[300] py-3 capitalize badge-neutral">{Math.floor(Math.random() * 4) + 1}</div>
                                                </th>
                                            </tr>)
                                        }
                                    </tbody>
                                    {/* foot */}
                                    <tfoot>
                                        <tr>
                                            <th>Class Information</th>
                                            <th>Instructor Info.</th>
                                            <th>Price & Seats</th>
                                            <th>Status</th>
                                            <th>Enrolled</th>
                                        </tr>
                                    </tfoot>

                                </table>
                            </div>

                        </> : <ProgressBar
                            height="80"
                            width="80"
                            ariaLabel="progress-bar-loading"
                            wrapperStyle={{}}
                            wrapperClass="progress-bar-wrapper"
                            borderColor='#696c70'
                            barColor='#9833f9'
                        />
                    }
                </div >
            </div> : ''}
        </div>
    );
};

export default MyClasses;