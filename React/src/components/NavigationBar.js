// NavigationBar.js or any other component where you want to include links
import React from 'react';
import { Link } from 'react-router-dom';
import './auth/auth.css';

const NavigationBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
