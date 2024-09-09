// OrdersByUser.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const OrdersByUser = () => {
  const { userId } = useParams();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/users/${userId}/orders`);
        if (response.status === 200) {
          setOrders(response.data);
        } else {
          console.error('Error fetching orders:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching orders:', error.message);
      }
    };

    fetchOrders();
  }, [userId]);

 
  return (
    <>
      <div>
        <h1>User Orders</h1>
        {orders.length > 0 ? (
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">Order ID</th>
                <th scope="col">Name</th>
                <th scope="col">Quantity</th>
                <th scope="col">Username</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.name}</td>
                  <td>{order.quantity}</td>
                  <td>{order.username}</td>
                </tr>
                
              ))}
            </tbody>
          </table>
        ) : (
          <p>No orders found for this user.</p>
        )}
      </div>
    </>
  );
};

export default OrdersByUser;