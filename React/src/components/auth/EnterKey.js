import React, { useEffect } from 'react';

const EnterKeyHandler = ({ targetId }) => {
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.click(); // Check if the element exists before invoking click
    }
      }
    };

    document.addEventListener('keypress', handleKeyPress);

    return () => {
      document.removeEventListener('keypress', handleKeyPress);
    };
  }, [targetId]);

  return null; // EnterKeyHandler doesn't render anything
};

export default EnterKeyHandler;
