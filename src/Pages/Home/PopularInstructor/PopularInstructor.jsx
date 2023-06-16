import { useQuery } from "react-query";
import InstructorCard from "./InstructorCard";
const PopularInstructor = () => {
    const { data: instructors = [] } = useQuery(['instructors'], async () => {
        const res = await fetch(`http://localhost:5000/instructors`);
        return res.json();
    })
    return (
        <div className="md:w-11/12 mx-auto">
            <h1 className="text-[var(--text-primary-color)] text-3xl font-semibold text-center py-5">Popular Instructor:</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {
                    instructors.map(ins => <InstructorCard key={ins._id}
                        ins={ins}
                    ></InstructorCard>)
                }
            </div>
        </div>
    );
};

export default PopularInstructor;