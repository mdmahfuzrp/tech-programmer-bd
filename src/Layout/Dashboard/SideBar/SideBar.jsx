import { Link } from "react-router-dom";
import { FaRegCalendarPlus, FaFolderPlus, FaHome, FaUsers, FaUserTie, FaCheckDouble, FaCheckSquare, FaArrowCircleRight, FaChalkboardTeacher, FaRegClone } from 'react-icons/fa';
import './SideBar.css'
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider/AuthProvider";
import Swal from "sweetalert2";

const SideBar = ({ activeUser }) => {
    const { handleLogout } = useContext(AuthContext)
    const { userName, userPhoto, role } = activeUser;
    console.log(userName);

    const handleUserLogout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to logout your account!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Logout'
        }).then((result) => {
            if (result.isConfirmed) {
                handleLogout()
                    .then(() => {
                        Swal.fire(
                            'Logout',
                            'Logout successful',
                            'success'
                        )
                    })
                    .catch(error => {
                        console.log(error);
                    })

            }
        })
    }

    let dashboardOption = '';
    if (role === 'admin') {
        dashboardOption = <>
            <div>
                <Link to='/dashboard/manageClasses'><FaFolderPlus />Manage Classes</Link>
            </div>
            <div>
                <Link to='/dashboard/allusers'><FaUsers />Manage Users</Link>
            </div>
        </>
    }
    else if (role === 'student') {
        dashboardOption = <>
            <div>
                <Link to='/dashboard/myselectedclass'><FaCheckSquare />My selected classes</Link>
            </div>
            <div>
                <Link to='/dashboard/myenrolledclass'><FaCheckDouble />My Enrolled Classes</Link>
            </div>
        </>
    }
    else if (role === 'instructor') {
        dashboardOption = <>
            <div>
                <Link to='/dashboard/addClass'><FaRegCalendarPlus />Add Class</Link>
            </div>
            <div>
                <Link to='/dashboard/myClasses'><FaRegClone />My Classes</Link>
            </div>
        </>
    }
    else {
        dashboardOption = '';
    }

    return (
        <div className="bg-[#9833f9] p-5 min-h-screen max-h-screen">
            <h1 className="border-b border-gray-400 mb-5 pb-3 text-xl text-white font-semibold capitalize">{role} Dashboard</h1>
            {/* For User Dashboard */}
            <div className="list-items text-gray-200 text-[16px] flex flex-col gap-2 border-b border-gray-400 mb-5 pb-4">
                <div>
                    <Link to='/dashboard/mydashboard'><FaHome />Dashboard</Link>
                </div>
                {dashboardOption}
            </div>

            {/* Common Option */}
            <div className="text-gray-200 text-[16px] flex flex-col gap-2 border-b border-gray-400 mb-5 pb-4 list-items">
                <div>
                    <Link to='/'><FaHome />Home</Link>
                </div>
                <div>
                    <Link to='/instructors'><FaUserTie />Instructors</Link>
                </div>
                <div>
                    <Link to='/classes'><FaChalkboardTeacher />Classes</Link>
                </div>
            </div>

            {/* profile and logout */}
            <div className="text-gray-200 text-[16px] flex flex-col gap-2 border-b border-gray-400 mb-5 pb-4">
                <div className="flex items-center gap-1">
                    <img className="w-[50px] h-[50px] rounded-full" src={userPhoto} alt="" />
                    <div className="flex flex-col gap-1">
                        <p className="text-gray-200 capitalize">{userName}</p>
                        <Link onClick={handleUserLogout} id="logout-btn" className=" text-black"><FaArrowCircleRight className="text-white" />Logout</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SideBar;