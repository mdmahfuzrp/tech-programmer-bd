import { FaCcAmazonPay, FaTrashAlt } from "react-icons/fa";
import { ProgressBar } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useDashboardTitle from "../../hooks/useDashboardTitle";

const MySelectedClass = () => {
    // Website Title
    useDashboardTitle('Selected Classes')

    const { data: selectedClass = [], refetch, isLoading } = useQuery(['selectedClass'], async () => {
        const res = await fetch('https://tech-programmer-bd-server.vercel.app/selectedClass');
        return res.json();
    })

    const total = selectedClass.reduce((sum, item) => sum + Number(item.classPrice), 0);
    const classPrice = parseFloat(total.toFixed(2))

    const handleDeleteClass = (singleClass) => {
        fetch(`https://tech-programmer-bd-server.vercel.app/selectedClass/${singleClass._id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount) {
                    refetch();
                    Swal.fire(
                        'Deleted!',
                        `User has been deleted successfully`,
                        'Done'
                    )
                }
            })
    }
    return (
        <div>
            {selectedClass.length > 0 ? <>

                <div className="p-5">
                    {
                        !isLoading ? <>

                            <div className="overflow-x-auto bg-[#FFDB77] p-5 rounded-lg">
                                <table className="table border border-[white]">
                                    {/* head */}
                                    <thead>
                                        <tr>
                                            <th>About Class</th>
                                            <th>Amount</th>
                                            <th>Pay</th>
                                            <th>Action</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            selectedClass.map(singleClass => <tr key={singleClass._id}>
                                                <td>
                                                    <div className="flex items-center space-x-3">
                                                        <div className="avatar">
                                                            <div className="mask mask-squircle w-12 h-12">
                                                                <img src={singleClass?.classPhoto} alt="Avatar Tailwind CSS Component" />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="font-bold">{singleClass?.className}</div>
                                                            <div className="text-sm opacity-75">{singleClass?.instructorEmail}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="">
                                                    <div className="badge badge-neutral">${singleClass.classPrice}</div>
                                                </td>
                                                <td className="">
                                                    <Link classPrice={classPrice} to="/dashboard/payment">
                                                        <button className="border-0 btn btn-success btn-sm shadow-md bg-[#9833f9] text-white">
                                                            <FaCcAmazonPay size={20} className="text-white" />
                                                            Pay now
                                                        </button>
                                                    </Link>
                                                </td>
                                                <th>

                                                    <button onClick={() => handleDeleteClass(singleClass)} className="border-0 btn btn-sm btn-success bg-[#9833f9] text-white shadow-md">
                                                        <FaTrashAlt size={20} className="" />
                                                        Delete
                                                    </button>
                                                </th>
                                            </tr>)
                                        }
                                    </tbody>
                                    {/* foot */}
                                    <tfoot>
                                        <tr>
                                            <th>About Class</th>
                                            <th>Amount</th>
                                            <th>Pay</th>
                                            <th>Action</th>
                                            <th></th>
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
            </> : <div className="flex items-center justify-center h-screen text-xl">
                <p>No Selected Classes Found</p>
            </div> 
            }
        </div>

    );
};

export default MySelectedClass;