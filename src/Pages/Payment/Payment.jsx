import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "./CheckOutForm";
import { Elements } from "@stripe/react-stripe-js";
import { useQuery } from "react-query";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_PK)
const Payment = () => {

    const { data: selectedClass = [], } = useQuery(['selectedClass'], async () => {
        const res = await fetch('http://localhost:5000/selectedClass');
        return res.json();
    })
    
    const total = selectedClass.reduce((sum, item) => sum + Number(item.classPrice), 0);
    const price = parseFloat(total.toFixed(2));
    console.log(price);

    return (
        <div>
            <h1>Payment page here</h1>
            <Elements stripe={stripePromise}>
                <CheckOutForm selectedClass={selectedClass} price={price}></CheckOutForm>
            </Elements>
        </div>
    );
};

export default Payment;