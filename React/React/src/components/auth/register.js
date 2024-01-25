import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './auth.css';
import EnterKeyHandler from './EnterKey';

const Register = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    if (!username || !email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/users', {
        username,
        email,
        password,
      });
      var message = response.data.message;
      console.log(message);
      toast.success(message);

      // Redirect to the login page after successful registration
      navigate('/login'); // Use navigate instead of history.push
    } catch (error) {
      console.error(error.response.data);
      const errorMessage = error.response.data.message;
      console.log(errorMessage);
      toast.error(errorMessage);
    }
  };


  return (
    <>
    <EnterKeyHandler targetId="registerBtn" />
    <div className="auth-container">
      <h2>Register</h2>
      {error && <p className="error-message">{error}</p>}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input-field"
      />
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
      <button id='registerBtn' onClick={handleRegister} className="button">
        Register
      </button>
      <p>Already have an Account!   <Link to="/Login" style={{ color: 'blue' }}>Login here</Link></p>
    </div>
    </>
  );
};

export default Register;

