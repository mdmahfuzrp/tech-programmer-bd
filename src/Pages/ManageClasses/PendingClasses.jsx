import { FaRegCalendarCheck, FaRegCalendarTimes } from "react-icons/fa";
import { ProgressBar } from "react-loader-spinner";

const PendingClasses = ({ handleDenyClass, pendingClasses, isLoading, handleApproveClass }) => {
    const handleFeedback = (c, event) => {
        console.log(c);
        event.preventDefault(); // Prevent form submission

        const feedback = event.target.elements.feedback.value;
        console.log(feedback);

        handleDenyClass(c._id, feedback);
    }
    return (
        <div>
            {pendingClasses.length > 0 ? <div className="p-5">
                {
                    !isLoading ? <>

                        <div className="overflow-x-auto bg-[#ffb277] p-5 rounded-lg">
                            <h1 className="mb-3 text-2xl font-semibold text-black">Pending Classes:</h1>
                            <table className="table border border-[white]">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>Class Information</th>
                                        <th>Instructor Info.</th>
                                        <th>Price & Seats</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        pendingClasses.map(c => <tr key={c._id}>
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
                                                <div className="flex">
                                                    <button onClick={() => handleApproveClass(c)} className="m-1 border-0 shadow-md p-2 rounded-lg text-white bg-success font-normal flex justify-center items-center gap-1">
                                                        <FaRegCalendarCheck size={16} />
                                                        Approve
                                                    </button>
                                                    {/* Open the modal using ID.showModal() method */}
                                                    <button className="m-1 border-0 shadow-md p-2 rounded-lg text-white bg-error font-normal flex justify-center items-center gap-1" onClick={() => window.my_modal_2.showModal()}><FaRegCalendarTimes size={16} />
                                                        Deny</button>
                                                    <dialog id="my_modal_2" className="modal">
                                                        <form onSubmit={(event) => handleFeedback(c, event)} method="dialog" className="modal-box">
                                                            <textarea name="feedback" className="w-full min-h-[200px] outline-none border font-normal text-lg rounded-lg py-3 px-5" placeholder="Feedback"></textarea>
                                                            <button type="submit" className="btn btn-neutral">Feedback</button>
                                                        </form>
                                                        <form method="dialog" className="modal-backdrop">
                                                            <button>close</button>
                                                        </form>
                                                    </dialog>
                                                </div>
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
                                        <th>Action</th>
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
            </div > : ''}
        </div>
    );
};

export default PendingClasses;