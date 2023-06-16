import { FaRegTrashAlt, FaUserShield, FaUserTie } from "react-icons/fa";
import { ProgressBar } from "react-loader-spinner";
import { useQuery } from "react-query";
import Swal from "sweetalert2";

const AllUsers = () => {
    const { data: users = [], refetch, isLoading } = useQuery(['users'], async () => {
        const res = await fetch('http://localhost:5000/users');
        return res.json();
    })

    const handleMakeAdmin = (user) => {
        fetch(`http://localhost:5000/users/admin/${user._id}`, {
            method: 'PATCH',
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        title: 'Successful',
                        text: `${user.userName} is now a Admin`,
                        icon: 'success',
                        confirmButtonText: 'Done'
                    })
                }
            })
    }

    const handleMakeInstructor = (user) => {
        fetch(`http://localhost:5000/users/instructor/${user._id}`, {
            method: 'PATCH',
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        title: 'Successful',
                        text: `${user.userName} is now a Instructor`,
                        icon: 'success',
                        confirmButtonText: 'Done'
                    })
                }
            })
    }

    const handleDeleteUser = (user) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `You want to delete ${user.userName}!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/users/${user._id}`, {
                    method: 'DELETE',
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.deletedCount) {
                            refetch();
                            Swal.fire(
                                'Deleted!',
                                `User has been deleted successfully`,
                                'Done'
                            )
                        }
                    })
            }
        })
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
                                    <th>Information</th>
                                    <th>Action</th>
                                    <th>Role</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map(user => <tr key={user._id}>
                                        <th>
                                        </th>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={user?.userPhoto} alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{user?.userName}</div>
                                                    <div className="text-sm opacity-75">{user?.userEmail}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="">
                                            <button onClick={() => handleMakeAdmin(user)} className="border-0 btn btn-success btn-sm m-1 shadow-md bg-[#9833f9] text-white" disabled={user.role === 'admin' ? true : false}>
                                                <FaUserShield size={20} className="text-white" />
                                                Make Admin
                                            </button>
                                            <button onClick={() => handleMakeInstructor(user)} className="border-0 btn btn-sm btn-success m-1 bg-[#9833f9] text-white shadow-md" disabled={user.role === 'instructor' ? true : false}>
                                                <FaUserTie size={20} className="" />
                                                Make Instructor
                                            </button>
                                        </td>
                                        <td><div className="badge border-[#9833f9] text-[#9833f9] badge-outline">{user?.role}</div></td>
                                        <th>
                                            <button onClick={() => handleDeleteUser(user)} className="border-0 shadow-md p-2 rounded-lg text-white bg-[#f94141b4]">
                                                <FaRegTrashAlt size={19} />
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

export default AllUsers;