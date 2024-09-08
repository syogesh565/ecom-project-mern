import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './auth.css';
import { Link, useNavigate } from 'react-router-dom';
import EnterKeyHandler from './EnterKey';
import BASE_URL from '../config';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [mobileNumber, setMobileNumber] = useState('');
  const [code, setCode] = useState('');

  
  useEffect(() => {
    // Check for token in local storage on component mount
    const token = localStorage.getItem('token');

    // If no token exists, prevent accessing Welcome page
    if (token) {
      navigate('/welcome');
    }
  }, [navigate]);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/api/login`, {
        email,
        password,
      });

      var message = response.data.message;
      var username = response.data.data.userInfo.username;
      var userInfo = response.data.data.userInfo;
      var userId = response.data.data.userInfo.userId;
      var token = response.data.data.token;
      localStorage.setItem('token', token);
      localStorage.setItem('userinfo', JSON.stringify(response.data.data.userInfo));

      console.log(message);
      // console.log(userId);
      // console.log(userInfo);
      // console.log(token);
      // console.log(username);
      toast.success(message);

      if (userId === 1) {
        navigate('/Admin', { state: { username } });
      } else {
        navigate('/welcome', { state: { username } });
      }
    } catch (error) {
      console.error(error.response.data);
      const errorMessage = error.response.data.message;
      console.log(errorMessage);
      toast.error(errorMessage);
    }
  };


  return (
    <>
      <EnterKeyHandler targetId="loginBtn" />
      <div className="auth-container">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />

        <button id='loginBtn' onClick={handleLogin} className="button">
          Login
        </button>
        <p>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: 'blue' }}>
            Register here
          </Link>
        </p>
      </div>
    </>
  );
};

export default Login;
