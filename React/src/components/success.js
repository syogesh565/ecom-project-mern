import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import Axios for making HTTP requests
import BASE_URL from './config';




const Successs = () => {
  const [cartItems, setCartItems] = useState([]);
  const [orderProcessed, setOrderProcessed] = useState(false);
  const [userId, setUserId] = useState(); // Define setUserId
  const [username, setUsername] = useState(); // Define setUsername
  const [userEmail, setUserEmail] = useState(); // Add userEmail state



  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data...");
  
      const orderedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      const storedUserInfo = JSON.parse(localStorage.getItem('userinfo'));
  
      if (storedUserInfo) {
        const { userId, username, email } = storedUserInfo;
        setUserId(userId);
        setUsername(username);
        setUserEmail(email);
  
        console.log('Fetched user info:', { userId, username, email });
  
        if (orderedItems.length > 0) {
          try {
            const response = await axios.post(`${BASE_URL}/api/create-order`, {
              userId: userId,
              username: username,
              items: orderedItems,
            });
  
            const { message, orders } = response.data;
            console.log('Order saved successfully:', message);
            console.log('Orders data:', orders);  // Add this to see the full orders structure

            
            if (orders && orders.length > 0) {
              const { orderId, orderItems } = orders[0];
              console.log('Order ID:', orderId, 'Ordered Items:', orderItems);
            
              // Clear the cart
              clearCartAfterOrder();
            
              console.log('Preparing to send email with orderId:', orderId, 'and items:', orderItems);
            
              // Send the email
              await sendEmail(orderId, orderItems, email); // Ensure this line is called
            }
            
          } catch (error) {
            console.error('Error saving order:', error);
          }
        } else {
          console.log("No items in cart, email not sent.");
        }
      } else {
        console.log("User info not found.");
      }
    };
  
    fetchData();
  }, []);
  
  const sendEmail = async (orderId, orderItems, email) => {
    console.log("sendEmail called with:", { orderId, orderItems, email });  // Log to confirm the function is called
    
    // Proceed with the existing email logic
    const formattedItems = orderItems.map(item => `<li>${item.name}: ${item.quantity}</li>`).join('');
  
    const emailData = {
      to: email,
      subject: 'Order Confirmation',
      html: `
        <p>Thank you for your purchase. Your order has been successfully processed.</p>
        <p>Order ID: ${orderId}</p>
        <p>Ordered Items:</p>
        <ul>
          ${formattedItems}
        </ul>
        <p>Your Order Will Be Delivered In 3-4 Days.</p>
        <p>Thank You For Shopping With Us.</p>
      `,
    };
  
    try {
      const response = await axios.post(`${BASE_URL}/api/send-email`, emailData);
      console.log('Email sent status:', response.data);  // Log response from API
    } catch (error) {
      console.error('Error sending email:', error.response ? error.response.data : error.message);
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
