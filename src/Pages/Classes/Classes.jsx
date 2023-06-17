import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";

const Classes = () => {
    const { user } = useContext(AuthContext);

    const [mySelected, setMySelected] = useState([]);
    const [student, setStudent] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/login';

    useEffect(() => {
        fetch('https://tech-programmer-bd-server.vercel.app/student')
            .then(res => res.json())
            .then(data => {
                const isStudentActive = data.filter(std => std?.userEmail === user?.email);
                console.log(isStudentActive);
                if (isStudentActive.length > 0) {
                    setStudent(false);
                }
                else {
                    setStudent(true);
                }
            })
    }, [student])


    const { data: classes = [] } = useQuery(['classes'], async () => {
        const res = await fetch(`https://tech-programmer-bd-server.vercel.app/classes`);
        return res.json();
    })

    const approvedClasses = classes.filter(cls => cls.status === 'Approve');


    const handleWarning = () => {
        Swal.fire({
            title: 'Not a user',
            text: "Sorry, You need to login first!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Login now'
        }).then((result) => {
            if (result.isConfirmed) {
                navigate(from, { replace: true });

            }
        })
    }

    useEffect(() => {
        fetch('https://tech-programmer-bd-server.vercel.app/selectedClass')
            .then(res => res.json())
            .then(data => {
                setMySelected(data);
                console.log(data);
            })
    }, [])

    const handleSelectClass = (cls) => {
        const exist = mySelected.find(pastSelect => pastSelect._id === cls._id);
        if (exist) {
            Swal.fire({
                title: 'Error!',
                text: 'This class already selected!',
                icon: 'error',
                confirmButtonText: 'Done'
            })
        }else {
            fetch('https://tech-programmer-bd-server.vercel.app/selectedClass', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(cls)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        Swal.fire({
                            title: 'Success!',
                            text: 'Select Item Successful',
                            icon: 'success',
                            confirmButtonText: 'Ok'
                        })
                    }
                })
        }

    }

    return (
        <div className="md:w-11/12 mx-auto">
            {
                approvedClasses.length > 0 ? <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {
                            approvedClasses.map(cls => <div key={cls._id}>

                                <div className="card bg-base-100 shadow-xl">
                                    <figure><img src={cls.classPhoto} alt="class" /></figure>
                                    <div className="card-body">
                                        <h2 className="card-title">
                                            {cls.className}
                                        </h2>
                                        <p>{cls.instructorName}</p>
                                        <div className="card-actions justify-end">
                                            <div className="badge badge-outline">Price: ${cls.classPrice}</div>
                                            <div className="badge badge-outline">Available Seats: {cls.seats}</div>
                                        </div>
                                    </div>
                                    {
                                        user ? <button onClick={() => handleSelectClass(cls)} disabled={student ? true : false || parseInt(cls.seats) == 0 ? true : false} className="btn btn-neutral w-fit mx-auto m-3">Select Class</button>
                                            : <>
                                                <button onClick={handleWarning} className="btn btn-neutral w-fit mx-auto m-3">Select Class</button>
                                            </>
                                    }
                                </div>
                            </div>)
                        }
                    </div>
                </>


                    : 'bolo'
            }
        </div>
    );
};

export default Classes;