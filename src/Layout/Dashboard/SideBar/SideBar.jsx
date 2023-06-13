import { Link } from "react-router-dom";
import { FaHome, FaUserTie, FaCheckDouble, FaCheckSquare, FaArrowCircleRight, FaChalkboardTeacher } from 'react-icons/fa';
import './SideBar.css'

const SideBar = () => {
    return (
        <div className="bg-[#9833f9] p-5 min-h-screen max-h-screen">
            <h1 className="border-b border-gray-400 mb-5 pb-3 text-xl text-white font-semibold">User Dashboard</h1>
            {/* Dynamic Option */}
            <div className="list-items text-gray-200 text-[16px] flex flex-col gap-2 border-b border-gray-400 mb-5 pb-4">
                <div>
                    <Link to='/dashboard/mydashboard'><FaHome />Dashboard</Link>
                </div>
                <div>
                    <Link to='/dashboard/myselectedclass'><FaCheckSquare />My selected classes</Link>
                </div>
                <div>
                    <Link to='/dashboard/myenrolledclass'><FaCheckDouble />My Enrolled Classes</Link>
                </div>
            </div>

            {/* Common Option */}
            <div className="text-gray-200 text-[16px] flex flex-col gap-2 border-b border-gray-400 mb-5 pb-4 list-items">
                <div>
                    <Link><FaHome />Home</Link>
                </div>
                <div>
                    <Link><FaUserTie />Instructors</Link>
                </div>
                <div>
                    <Link><FaChalkboardTeacher />Classes</Link>
                </div>
            </div>

            {/* profile and logout */}
            <div className="text-gray-200 text-[16px] flex flex-col gap-2 border-b border-gray-400 mb-5 pb-4">
                <div className="flex items-center gap-1">
                    <img className="w-[50px] h-[50px] rounded-full" src="https://i.ibb.co/4Np73vB/3.jpg" alt="" />
                    <div className="flex flex-col">
                        <p className="text-gray-200">Demo Name</p>
                        <Link id="logout-btn" className=" text-black"><FaArrowCircleRight />Logout</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SideBar;