import { useParams } from "react-router-dom";

const Feedback = () => {
    const {id} = useParams();
    console.log(id);
    const handleFeedbackMessage = (event) => {
        event.preventDefault();

        const form = event.target;
        const feedback = form.feedback.value;

        fetch(`http://localhost:5000/classes/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(feedback)
        })
            .then(res => res.json())
            .then(data => console.log(data))
    }
    return (
        <div>
            <div className="md:w-9/12 mx-auto bg-[#ffb277] p-5 my-5 rounded-lg">
                <h1 className="mb-3 text-2xl font-semibold text-black">Give Feedback:</h1>
                <form onSubmit={handleFeedbackMessage}>
                    <textarea name="feedback" className="w-full min-h-[200px] outline-none border-none rounded-lg py-3 px-5" placeholder="Feedback"></textarea>
                    <button type="submit" className="btn btn-neutral">Feedback</button>
                </form>
            </div>
        </div>
    );
};

export default Feedback;