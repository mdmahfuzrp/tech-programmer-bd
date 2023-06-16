import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";

const AllClasses = () => {
    const {user} = useContext(AuthContext);
    const [allClasses, setAllClasses] = useState([]);


    useEffect(() => {
        fetch('http://localhost:5000/classes/approve')
            .then(res => res.json())
            .then(data => {
                setAllClasses(data);
            })
    }, [allClasses])

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
                                        <button disabled={user?.email === 'mahfuzrpsmorg@gmail.com' || user?.email === 'admin@gmail.com' ? true : false} className="btn btn-neutral w-fit mx-auto m-3">Select Class</button>
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