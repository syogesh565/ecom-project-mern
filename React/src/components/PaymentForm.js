// import React, { useState } from 'react';
// import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// const PaymentForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [clientSecret, setClientSecret] = useState('');
//   const [paymentError, setPaymentError] = useState(null);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//       payment_method: {
//         card: elements.getElement(CardElement),
//         billing_details: {
//           // Add billing details if needed
//         },
//       },
//     });

//     if (error) {
//       setPaymentError(error.message);
//     } else if (paymentIntent.status === 'succeeded') {
//       // Payment successful, handle success
//     }
//   };

//   const handlePayment = async () => {
//     // Make API call to the backend to get the client secret for payment intent
//     const response = await fetch('http://localhost:3001/create-payment-intent', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ amount: 100 }), // Amount to charge in dollars
//     });

//     const data = await response.json();
//     setClientSecret(data.clientSecret);
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
