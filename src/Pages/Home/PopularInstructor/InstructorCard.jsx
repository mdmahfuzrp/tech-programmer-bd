const InstructorCard = ({ins}) => {
    const {userName, userPhoto, userEmail, role} = ins;
    return (
        <div className="card bg-base-100 shadow-xl p-6">
            <figure><img className="w-[340px] h-[250px] object-cover rounded-xl" src={userPhoto} alt="Class" /></figure>
            <div className="card-body">
                <h2 className="card-title">
                    {userName}
                    <div className="badge badge-secondary">Instructor</div>
                </h2>
                <p>{userEmail}</p>
                <div className="card-actions">
                    <div className="badge badge-outline">Role: {role}</div>
                </div>
            </div>
        </div>
    );
};

export default InstructorCard;