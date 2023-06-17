import { useEffect, useState } from "react";
import useTitle from "../../hooks/useTitle";

const Instructor = () => {

    // Set Website Title
    useTitle('Instructors')

    const [allInstructors, setAllInstructors] = useState([]);
    useEffect(() => {
        fetch('https://tech-programmer-bd-server.vercel.app/instructors')
            .then(res => res.json())
            .then(data => {
                setAllInstructors(data);
            })
    }, [allInstructors])
    return (
        <div className="md:w-11/12 mx-auto">
            {
                allInstructors.length > 0 ? <>
                    {
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {
                                allInstructors.map(i => <>
                                    <div key={i._id} className="card bg-base-100 shadow-xl">
                                        <figure className="px-10 pt-10">
                                            <img src={i.userPhoto} alt="Instructor" className="rounded-xl" />
                                        </figure>
                                        <div className="card-body items-center text-center">
                                            <h2 className="card-title">{i.userName}</h2>
                                            <p>{i.userEmail}</p>
                                        </div>
                                    </div>
                                </>)
                            }
                        </div>
                    }
                </> : 'No instructor found'
            }
        </div>
    );
};

export default Instructor;