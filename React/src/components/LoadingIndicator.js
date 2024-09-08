// LoadingIndicator.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css'; 


const LoadingIndicator = () => (
  <div
    style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 9999,
      color: '#17a2b8', // Change the color as needed
    }}
  >
    <FontAwesomeIcon icon={faSpinner} spin size="3x"  style={{ animation: 'fa-spin 2s infinite linear' }} />
    <p>Loading...</p>
  </div>
);

export default LoadingIndicator;
