import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";

const CheckOutForm = ({ price, selectedClass }) => {
    const {user} = useContext(AuthContext);
    const [cardError, setCardError] = useState('');
    const [transactioonId, setTransactionId] = useState('')
    const stripe = useStripe();
    const elements = useElements();

    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => { 
        fetch('http://localhost:5000/create-payment-intent', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ price }), // Wrap price in an object
        })
        .then(res => res.json())
        .then(data => setClientSecret(data.clientSecret));
    }, [price])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            console.log('error', error);
            setCardError(error);
        }
        else {
            setCardError('');
            console.log('payment method', paymentMethod);
        }
        const {paymentIntent, error:confirmError} = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'unknown',
                        name: user?.displayName || 'anonymous'
                    }
                }
            }
        );
        if(confirmError){
            console.log(confirmError);
        }

        console.log('paymentIntent', paymentIntent);
        if(paymentIntent.status === 'succeeded'){
            setTransactionId(paymentIntent.id);
            const paymentInfo = {
                userName: user.userName,
                userEmail: user.userEmail,
                transactioonId: paymentIntent.id,
                enrolledCourseName: selectedClass.map(cls => cls.className),
                enrolledCourseId: selectedClass.map(cls => cls._id)
            }

            fetch('http://localhost:5000/payments',{
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(paymentInfo)
            })
            .then(res => res.json())
            .then(data => {
                if(data.insertedId){
                    fetch('http://localhost:5000/selectedClass',{
                        method: 'DELETE'
                    })
                    .then(res => res.json())
                    .then(data => console.log(data))
                }
            })
        }
    }

    return (
        <>
            <form className="p-5 w-7/12 text-center mx-auto" onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className="btn mt-2 text-center btn-primary btn-sm" type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
            </form>
            {cardError && <p className="text-red-600">{cardError.message}</p>}
            {transactioonId && <p className="text-success">Payment successful with transactioon id: {transactioonId}</p>}
        </>
    );
};

export default CheckOutForm;