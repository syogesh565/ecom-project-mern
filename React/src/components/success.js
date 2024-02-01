import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import Axios for making HTTP requests




const Successs = () => {
  const [cartItems, setCartItems] = useState([]);
  const [orderProcessed, setOrderProcessed] = useState(false);
  const [userId, setUserId] = useState(); // Define setUserId
  const [username, setUsername] = useState(); // Define setUsername
  const [userEmail, setUserEmail] = useState(); // Add userEmail state

  
  
  useEffect(() => {
    const fetchData = async () => {
      // Retrieve ordered items from local storage on component render
      const orderedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  
      // Retrieve user information from local storage
      const storedUserInfo = JSON.parse(localStorage.getItem('userinfo'));
  
      if (storedUserInfo) {
        const { id, username, email } = storedUserInfo;
        setUserId(id);
        setUsername(username);
        setUserEmail(email); // Set the userEmail state
        console.log('Username:', username);
        console.log('UserId:', id);
        console.log('user Email:', email);
  
        // let orderId, orderItems; // Declare orderId and orderItems here
        // Check if there are items in the cart before making the API request
        if (orderedItems.length > 0) {
          // Send a request to your backend API to save the order
          try {
            const response = await axios.post('http://localhost:3000/api/create-order', {
              userId: id,
              username: username,
              items: orderedItems,
            });
  
            const { message, orders } = response.data;
            console.log('Order saved successfully:', message);
  

              // Access order details from the response
        if (orders && orders.length > 0) {
          const { orderId, orderItems } = orders[0];
          console.log('Order ID:', orderId);
          console.log('Ordered Items:', orderItems);
        

            // Optionally, you can clear the local storage or perform any other actions
            clearCartAfterOrder();
  
             
             

              // Send email after successful order processing
              await sendEmail(orderId, orderItems, email);
        }
          } catch (error) {
            console.error('Error saving order:', error);
            // Handle the error if needed
          }
        }
      }
    };
  
    fetchData(); // Call the fetchData function
  }, []);
  
  const sendEmail = async (orderId, orderItems, email) => {
    const emailData = {
      to: email,
      subject: 'Order Confirmation',
      html: `
        <p>Thank you for your purchase. Your order has been successfully processed.</p>
        <p>Order ID: ${orderId}</p>
        <p>Ordered Items:</p>
        <ul>
          ${Object.keys(orderItems).map(item => `<li>${item}: ${orderItems[item]}</li>`).join('')}
        </ul>
        <p>Your Order Will Be Delivered In 3-4 Days.</p>
        <p>Thank You For Shopping With Us.</p>
      `,
    };
    try {
      const response = await axios.post('http://localhost:3000/api/send-email', emailData);
      console.log('Email sent status:', response.data);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };
  
  

  const clearCartAfterOrder = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems');
  };



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
