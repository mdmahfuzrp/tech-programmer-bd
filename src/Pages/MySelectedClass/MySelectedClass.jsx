import { FaCcAmazonPay, FaTrashAlt } from "react-icons/fa";
import { ProgressBar } from "react-loader-spinner";
import { useQuery } from "react-query";

const MySelectedClass = () => {
    const { data: selectedClass = [], refetch, isLoading } = useQuery(['selectedClass'], async () => {
        const res = await fetch('http://localhost:5000/selectedClass');
        return res.json();
    })

    const handleDeleteClass = (id) =>{
        // fetch()
    }
    return (

        <div className="p-5">
            {
                !isLoading ? <>

                    <div className="overflow-x-auto bg-[#FFDB77] p-5 rounded-lg">
                        <table className="table border border-[white]">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>
                                    </th>
                                    <th>About Class</th>
                                    <th>Pay</th>
                                    <th>Action</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    selectedClass.map(singleClass => <tr key={singleClass._id}>
                                        <th>
                                        </th>
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
                                            <button className="border-0 btn btn-success btn-sm shadow-md bg-[#9833f9] text-white">
                                                <FaCcAmazonPay size={20} className="text-white" />
                                                Pay now
                                            </button>
                                        </td>
                                        <th>
                                            
                                        <button onClick={()=>handleDeleteClass(singleClass._id)} className="border-0 btn btn-sm btn-success bg-[#9833f9] text-white shadow-md">
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
                                    <th></th>
                                    <th>Information</th>
                                    <th>Action</th>
                                    <th>Role</th>
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
    );
};

export default MySelectedClass;