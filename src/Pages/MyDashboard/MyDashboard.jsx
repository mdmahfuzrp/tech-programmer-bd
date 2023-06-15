import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";

const MyDashboard = () => {
    const {user} = useContext(AuthContext);
    return (
        <div className="bg-[var(--bg-color)] flex flex-col min-h-screen items-center justify-center">
            <img className="w-[150px] h-[150px] object-cover rounded-full" src={user?.photoURL} alt="" />
            <p className="capitalize mt-1 mb-0">{user?.displayName}</p>
            <div>
                <p>{user?.email}</p>
            </div>
        </div>
    );
};

export default MyDashboard;