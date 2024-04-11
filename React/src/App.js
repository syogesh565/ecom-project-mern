
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Register from './components/auth/register'; // Update the path based on your folder structure
import Login from './components/auth/login'; // Update the path based on your folder structure
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Welcome from './components/auth/welcome';
import AdminItemForm from './components/auth/Admin';
import OrderList from './components/auth/OrderList';
import { ApiDataProvider } from './components/auth/ApiDataContext';
import SearchBar from './components/auth/searchBar';
import Cart from './components/auth/Cart';
import Successs from './components/success';
import Cancel from './components/cancel';
import Chat from './components/Chat';
import XmlToJsonConverter from './components/xmlconverter';
import UserList from './components/auth/userList';
import OrdersByUser from './components/auth/orderByUsers';





const App = () => {
  

  return (
   
   
    <Router>
      <ApiDataProvider>
      <div>
      
        <Routes>
          
          <Route path="/*" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminItemForm />} />
          <Route path="/welcome" element={<Welcome  />} />
          <Route path="/Cart" element={<Cart  />} />
          <Route path="/Successs" element={<Successs  />} />
          <Route path="/Cancel" element={<Cancel  />} />
          <Route path="/search/:term" component={Welcome} />
          <Route path="/admin/order-list" element={<OrderList />} />
          <Route path="/admin/user-list" element={<UserList />} />
          <Route path="/users/:userId/orders" element={<OrdersByUser />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/xml" element={<XmlToJsonConverter />} />
        </Routes>
        
      </div>
      <ToastContainer/>
      </ApiDataProvider>
   
    </Router>
  
   
  );
};

export default App;

