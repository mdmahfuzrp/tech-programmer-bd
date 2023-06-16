const CardClass = ({cls}) => {
    const {className, classPhoto, classPrice, seats, instructorName} = cls;
    return (
        <div className="card bg-base-100 shadow-xl">
            <figure><img src={classPhoto} alt="Class" /></figure>
            <div className="card-body">
                <h2 className="card-title">
                    {className}
                    <div className="badge badge-secondary">Popular</div>
                </h2>
                <p>Instructor: {instructorName}</p>
                <div className="card-actions justify-end">
                    <div className="badge badge-outline">Seats: {seats}</div>
                    <div className="badge badge-outline">Price: ${classPrice}</div>
                </div>
            </div>
        </div>
    );
};

export default CardClass;