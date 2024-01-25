import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import Axios for making HTTP requests



const Successs = () => {
  const [cartItems, setCartItems] = useState([]);
  const [orderProcessed, setOrderProcessed] = useState(false);
  const [userId, setUserId] = useState(); // Define setUserId
  const [username, setUsername] = useState(); // Define setUsername

  
  useEffect(() => {
    const fetchData = async () => {
      // Retrieve ordered items from local storage on component render
      const orderedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  
      // Retrieve user information from local storage
      const storedUserInfo = JSON.parse(localStorage.getItem('userinfo'));
  
      if (storedUserInfo) {
        const { id, username } = storedUserInfo;
        setUserId(id);
        setUsername(username);
        console.log('Username:', username);
        console.log('UserId:', id);
  
        // Check if there are items in the cart before making the API request
        if (orderedItems.length > 0) {
          // Send a request to your backend API to save the order
          try {
            const response = await axios.post('http://localhost:3000/api/create-order', {
              userId: id,
              username: username,
              items: orderedItems,
            });
  
            console.log('Order saved successfully:', response.data);
  
            // Optionally, you can clear the local storage or perform any other actions
            clearCartAfterOrder();
  
            // Access order details from the response
            const { orderId, orderItems } = response.data;
            console.log('Order ID:', orderId);
            console.log('Ordered Items:', orderItems);
          } catch (error) {
            console.error('Error saving order:', error);
            // Handle the error if needed
          }
        }
      }
    };
  
    fetchData(); // Call the fetchData function
  }, []);
  
  
  

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
  
console.log('Success component rendered!'); // Add this line
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

export default Successs;
