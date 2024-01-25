import React from 'react';

const Menu = ({ children }) => {
  return (
    <nav>
      <ul>{children}</ul>
    </nav>
  );
};

const Submenu = ({ children }) => {
  return <li>{children}</li>;
};

export { Menu, Submenu };
