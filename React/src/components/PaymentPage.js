// // PaymentPage.js

// import React, { useEffect, useState } from 'react';
// import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
// import stripePromise from './stripeConfig';

// import { loadStripe } from '@stripe/stripe-js';

// const PaymentPage = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [clientSecret, setClientSecret] = useState('');
//   const [paymentError, setPaymentError] = useState(null);

//   // Fetch the client secret when the component mounts
//   useEffect(() => {
//     const fetchClientSecret = async () => {
//       // Make a request to your server to get the client secret
//       const response = await fetch('http://localhost:3000/api/create-payment-intent', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ amount: calculateTotalCartValueInCents() }),
//       });

//       const data = await response.json();
//       setClientSecret(data.clientSecret);
//     };

//     fetchClientSecret();
//   }, []);

//   const calculateTotalCartValueInCents = () => {
//     // Replace this with your actual logic to calculate total cart value
//     const totalCartValue = 500; // Replace 500 with your actual total cart value
//     // Assuming your total cart value is in INR, convert it to cents
//     return totalCartValue * 100;
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!stripe || !elements) {
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
//       <h2>Checkout</h2>
//       <form onSubmit={handleSubmit}>
//         <CardElement />
//         <button type="submit" disabled={!stripe}>
//           Pay
//         </button>
//       </form>
//       {paymentError && <div>{paymentError}</div>}
//     </div>
//   );
// };

// export default PaymentPage;
