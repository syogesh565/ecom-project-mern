// import React, { useState } from 'react';
// import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// const PaymentForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [clientSecret, setClientSecret] = useState('');
//   const [paymentError, setPaymentError] = useState(null);

//   const handlePayment = async () => {
//     // Make API call to the backend to get the client secret for payment intent
//     const response = await fetch('http://localhost:3000/api/create-payment-intent', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ amount: 100 }), // Adjust the amount as needed
//     });

//     const data = await response.json();
//     setClientSecret(data.clientSecret);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!stripe || !elements) {
//       // Stripe.js has not loaded yet. Make sure to disable
//       // form submission until Stripe.js has loaded.
//       return;
//     }

//     const result = await stripe.confirmCardPayment(clientSecret, {
//       payment_method: {
//         card: elements.getElement(CardElement),
//       },
//     });

//     if (result.error) {
//       setPaymentError(result.error.message);
//     } else {
//       if (result.paymentIntent.status === 'succeeded') {
//         // Payment successful, handle success
//         console.log('Payment successful!');
//       }
//     }
//   };

//   return (
//     <div>
//       <button onClick={handlePayment}>Initialize Payment</button>
//       <form onSubmit={handleSubmit}>
//         <CardElement />
//         <button type="submit" disabled={!stripe}>Pay</button>
//       </form>
//       {paymentError && <div>{paymentError}</div>}
//     </div>
//   );
// };

// export default PaymentForm;
