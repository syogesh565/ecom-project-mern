import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import Axios for making HTTP requests



const Success = () => {
  const [cartItems, setCartItems] = useState([]);
  const [orderProcessed, setOrderProcessed] = useState(false);

  
  useEffect(() => {
    // Retrieve ordered items from local storage on component render
    const orderedItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Send a request to your backend API to save the order
    axios.post('http://localhost:3000/api/create-order', { items: orderedItems })
      .then(response => {
        console.log('Order saved successfully:', response.data);

        // Optionally, you can clear the local storage or perform any other actions
        clearCartAfterOrder();
        // Access order details from the response
        const { orderId, orderItems } = response.data;
        console.log('Order ID:', orderId);
        console.log('Ordered Items:', orderItems);
      })
      .catch(error => {
        console.error('Error saving order:', error);
        // Handle the error if needed
      });
  }, []); // The empty dependency array [] ensures that this effect runs only once
  

  const clearCartAfterOrder = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems');
  };


  
// Define a function for your API call
// const saveOrderToApi = async (orderedItems) => {
//   try {
//     // Send a request to your backend API to save the order
//     const response = await axios.post('http://localhost:3000/api/create-order', { items: orderedItems });
//     console.log('Order saved successfully:', response.data);
//     // Optionally, you can clear the local storage or perform any other actions
//     // clearCartAfterOrder([]);
//   } catch (error) {
//     console.error('Error saving order:', error);
//     // Handle the error if needed
//   }
// };
  

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          <div className="alert alert-success" role="alert">
            <h4 className="alert-heading">Payment Successful!</h4>
            <p>Thank you for your purchase. Your payment has been successfully processed.</p>
            <p>Your Order Will Be Delivered In 3-4 Days.</p>
            <p>Thank You For Shopping With us.</p>
            <Link to="/welcome">
              <button className="btn btn-primary mt-3">
                Back to Home
              </button>
            </Link>
          </div>
          {/* <img src="success-image.png" alt="Success" className="img-fluid mt-4" /> */}
        </div>
      </div>
    </div>
  );
}

export default Success;
