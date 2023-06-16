import { useQuery } from "react-query";
import CardClass from "./CardClass";

const PopularClass = () => {
    const { data: classes = [] } = useQuery(['classes'], async () => {
        const res = await fetch(`http://localhost:5000/classes`);
        return res.json();
    })
    return (
        <div className="md:w-11/12 mx-auto">
            <h1 className="text-[var(--text-primary-color)] text-3xl font-semibold text-center py-5">Popular Class:</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {
                    classes.map(cls => <CardClass key={cls._id}
                        cls={cls}
                    ></CardClass>)
                }
            </div>
        </div>
    );
};

export default PopularClass;