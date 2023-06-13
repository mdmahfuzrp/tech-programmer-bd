import { Link } from 'react-router-dom';
import logo from '../../assets/logo/techprogrammerbd.png';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProvider/AuthProvider';
import { RotatingLines } from 'react-loader-spinner';
const NavBar = () => {
    const { handleLogout, user, loading } = useContext(AuthContext);
    const [toggle, setToggle] = useState(false);
    const [theme, setTheme] = useState('light-theme');

  const toggleTheme = () => {
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

    const listItems = <>
        <li><Link>Home</Link></li>
        <li><Link>Instructors</Link></li>
        <li><Link>Classes</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
    </>

    const handleToggleBtn = () => {
        setToggle(!toggle);
    }

    const handleUserLogout = () => {
        handleLogout()
            .then(() => { })
            .catch(error => {
                console.log(error);
            })
    }
    return (
        <div className='bg-[var(--bg-color)] shadow-md mb-10'>
            <div className="navbar w-11/12 mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="relative z-50 menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {listItems}
                        </ul>
                    </div>
                    <Link><img src={logo} className='w-[150px]' alt="" /></Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {listItems}
                    </ul>
                </div>
                <div className="navbar-end">
                    <div className='mr-2 flex items-center border bg-[#9833f9] p-2 px-3 rounded-full'>
                        <label htmlFor="toggleBtn" className='mr-1 text-white'>Theme </label>
                        <input type="checkbox" id='toggleBtn' className={`toggle ${toggle ? "bg-[#9833f9] border-[#9833f9]" : 'border-[#9833f9] bg-gray-400'}`} onClick={handleToggleBtn} checked={toggle} />
                    </div>
                    {
                        !loading ? <>
                            {
                                user ? <Link onClick={handleUserLogout} className='custom-btn'>Logout</Link>
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