import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";
import useTitle from "../../hooks/useTitle";

const MyDashboard = () => {
    // Website Title
    useTitle('Dashboard')

    const {user} = useContext(AuthContext);
    return (
        <div className="bg-[var(--bg-color)] flex flex-col min-h-screen items-center justify-center">
            <img className="w-[150px] h-[150px] object-cover rounded-full" src={user?.photoURL ? user?.photoURL : 'https://static.thenounproject.com/png/2532839-200.png'} alt="" />
            <p className="capitalize mt-1 mb-0">{user?.displayName}</p>
            <div>
                <p>{user?.email}</p>
            </div>
        </div>
    );
};

export default MyDashboard;