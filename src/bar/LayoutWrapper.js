// LayoutWrapper.js
import React, { useState } from 'react';
import Navbar from './navbar';

const LayoutWrapper = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const contentStyle = {
    transition: 'transform 0.5s ease-in-out',
    transform: `translateX(${isSidebarOpen ? '20px' : '0'})`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const overlayStyle = {
    position: 'fixed',
    top: '0',
    left: '0',
    width: isSidebarOpen ? '80vw' : '0',
    height: '100vh',
    overflowX: 'hidden',
    transition: 'width 0.5s ease-in-out',
    pointerEvents: isSidebarOpen ? 'auto' : 'none',
    zIndex: 0,
  };

  return (
    <div>
      <div style={contentStyle}>
        <Navbar setIsSidebarOpen={setIsSidebarOpen} isSidebarOpen={isSidebarOpen} />
        {children}
      </div>

      <div style={overlayStyle} onClick={() => setIsSidebarOpen(false)}></div>
    </div>
  );
};

export default LayoutWrapper;
