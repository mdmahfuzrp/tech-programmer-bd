import { Link } from 'react-router-dom';
import logo from '../../assets/logo/techprogrammerbd.png';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProvider/AuthProvider';
import { RotatingLines } from 'react-loader-spinner';
import { BsBoxArrowRight } from 'react-icons/bs'
import Swal from 'sweetalert2';
const NavBar = () => {
    const { handleLogout, user, loading } = useContext(AuthContext);
    console.log(user);
    const [toggle, setToggle] = useState(false);
    const [theme, setTheme] = useState('light-theme');

    const listItems = <>
        <li><Link to='/' id='items-1' className='text-[var(--text-primary-color)]'>Home</Link></li>
        <li><Link to='/instructors' id='items-2' className='text-[var(--text-primary-color)]'>Instructors</Link></li>
        <li><Link to='/classes' id='items-3' className='text-[var(--text-primary-color)]'>Classes</Link></li>
        <li><Link id='items-4' className='text-[var(--text-primary-color)]' to="/dashboard">Dashboard</Link></li>
    </>

    const handleToggleBtn = () => {
        setToggle(!toggle);
        if (theme === 'light-theme') {
            setTheme('dark-theme');
        }
        else {
            setTheme('light-theme');
        }
    }

    useEffect(() => {
        document.body.className = theme;
    }, [theme])

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
    return (
        <div className='bg-[var(--bg-color)] sticky top-0 z-50 shadow-md mb-10'>
            <div className="navbar w-11/12 mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="navbar-items-wrapper relative z-50 menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {listItems}
                        </ul>
                    </div>
                    <Link><img src={logo} className='w-[150px]' alt="" /></Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="navbar-items-wrapper menu menu-horizontal px-1">
                        {listItems}
                    </ul>
                </div>
                <div className="navbar-end">
                    <div className='mr-2 flex items-center bg-[#9833f9] p-2 px-3 rounded-full'>
                        <label htmlFor="toggleBtn" className='mr-1 text-white'>Theme </label>
                        <input type="checkbox" id='toggleBtn' className={`toggle ${toggle ? "bg-[#9833f9] border-[#9833f9]" : 'border-[#9833f9] bg-gray-400'}`} onClick={handleToggleBtn} checked={toggle} />
                    </div>
                    {
                        !loading ? <>
                            {
                                user ? <div className='flex items-center gap-2'>
                                    <Link to='/profile'>
                                        <img className='w-[48px] h-[48px] rounded-full object-cover border-2 border-[var(--common-secondary-color)]' src={user.photoURL ? user.photoURL : "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"} alt="User" />
                                    </Link>
                                    <Link className='bg-[var(--common-secondary-color)] flex items-center justify-center ps-2 rounded-md py-[10px]' onClick={handleUserLogout}><BsBoxArrowRight className='text-white' size={22} /></Link>
                                </div>
                                    : <Link to='/login' className='custom-btn'>Login Here</Link>
                            }
                        </> : <RotatingLines
                            strokeColor="#9833f9"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="45"
                            visible={true}
                        />
                    }
                </div>
            </div>
        </div>
    );
};

export default NavBar;