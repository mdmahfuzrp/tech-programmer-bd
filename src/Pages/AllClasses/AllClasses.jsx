import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";

const AllClasses = () => {
    const { user } = useContext(AuthContext);
    const [allClasses, setAllClasses] = useState([]);
    const [mySelected, setMySelected] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/login';


    useEffect(() => {
        fetch('http://localhost:5000/classes/approve')
            .then(res => res.json())
            .then(data => {
                setAllClasses(data);
            })
    }, [allClasses])

    useEffect(() => {
        fetch('http://localhost:5000/selectedClass')
            .then(res => res.json())
            .then(data => {
                setMySelected(data);
            })
    }, [mySelected])

    const handleSelectClass = (selectedClass) => {
        const existing = mySelected.find(select => select.instructorEmail === selectedClass.instructorEmail);
        if (!existing) {
            fetch('http://localhost:5000/selectedClass', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(selectedClass)
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
        else {
            Swal.fire({
                title: 'Already Selected',
                text: 'This class already you selected, try another one',
                imageUrl: `${selectedClass.classPhoto}`,
                imageWidth: 400,
                imageHeight: 200,
            })
        }

    }

    const handleWarning = () =>{
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

    return (
        <div className="md:w-11/12 mx-auto">
            {
                allClasses.length > 0 ? <>
                    {
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {
                                allClasses.map(cls => <div key={cls._id}>

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
                                            user ? <button onClick={() => handleSelectClass(cls)} disabled={user?.email === 'mahfuzrpsmorg@gmail.com' || user?.email === 'admin@gmail.com' ? true : false} className="btn btn-neutral w-fit mx-auto m-3">Select Class</button>
                                                : <>
                                                    <button onClick={handleWarning} className="btn btn-neutral w-fit mx-auto m-3">Select Class</button>
                                                </>
                                        }
                                    </div>
                                </div>)
                            }
                        </div>
                    }
                </> : "No Class Found"
            }
        </div>
    );
};

export default AllClasses;