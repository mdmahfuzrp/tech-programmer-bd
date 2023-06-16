import { ProgressBar } from "react-loader-spinner";
import { useQuery } from "react-query";

const MyEnrolledClass = () => {
    const { data: enrolledClass = [], isLoading } = useQuery(['payments'], async () => {
        const res = await fetch('http://localhost:5000/payments');
        return res.json();
    })

    return (
        <div>

            <div className="p-5">
                {
                    !isLoading ? <>

                        <div className="overflow-x-auto bg-[#FFDB77] p-5 rounded-lg">
                            <table className="table border border-[white]">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>Class Name</th>
                                        <th>Class Id</th>
                                        <th>Transaction</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        enrolledClass.map((singleClass) => <tr key={singleClass._id}>
                                            <td>
                                                <div className="flex items-center space-x-3">
                                                    <div className="flex flex-col gap-1">
                                                        {
                                                            singleClass.enrolledCourseName.map(clsName => <>
                                                                <div className="badge badge-neutral">{clsName}</div>
                                                            </>)
                                                        }
                                                    </div>
                                                </div>
                                            </td>

                                            <td>
                                                <div className="flex items-center space-x-3">
                                                    <div>
                                                        {
                                                            singleClass.enrolledCourseId.map(clsId => <>
                                                                <div className="text-sm opacity-75">{clsId}</div>
                                                            </>)
                                                        }
                                                    </div>
                                                </div>
                                            </td>


                                            <td className="">
                                                <div className="badge badge-neutral">{singleClass.transactioonId}</div>
                                            </td>
                                        </tr>)
                                    }
                                </tbody>
                                {/* foot */}
                                <tfoot>
                                    <tr>
                                        <th>Class Info.</th>
                                        <th>Transaction</th>
                                        <th>Class ID</th>
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
        </div>
    );
};

export default MyEnrolledClass;