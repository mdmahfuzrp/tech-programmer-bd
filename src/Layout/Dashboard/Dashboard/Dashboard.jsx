import { useState } from "react";
import SideBar from "../SideBar/SideBar";
import Hamburger from 'hamburger-react'
import logo from '../../../assets/logo/techprogrammerbd.png';
import { Outlet, useLocation } from "react-router-dom";
import MyDashboard from "../../../Pages/MyDashboard/MyDashboard";

const Dashboard = () => {
    const [isOpen, setOpen] = useState(false);
    const location = useLocation();
    return (
        <div>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    <div className="flex items-center justify-between">
                        <img className="w-[100px] lg:hidden" src={logo} alt="" />
                        {/* Page content here */}
                        <label htmlFor="my-drawer-2" className="ms-auto w-fit drawer-button lg:hidden">
                            <Hamburger toggled={isOpen} toggle={setOpen} />
                        </label>
                    </div>
                    <div>
                        {
                            location.pathname === '/dashboard' ? <MyDashboard></MyDashboard> : <Outlet />
                        }
                    </div>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-0 w-64 h-full bg-base-200 text-base-content">
                        {/* Sidebar content here */}
                        <SideBar></SideBar>
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;