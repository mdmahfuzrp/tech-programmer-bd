import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "./CheckOutForm";
import { Elements } from "@stripe/react-stripe-js";
import { useQuery } from "react-query";
import useTitle from "../../hooks/useTitle";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_PK)
const Payment = () => {

    
    // Set Website Title
    useTitle('Payment')

    const { data: selectedClass = [], } = useQuery(['selectedClass'], async () => {
        const res = await fetch('https://tech-programmer-bd-server.vercel.app/selectedClass');
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