// Navbar.js
import React from 'react';
import boaLogo from '../assets/boa.jpeg';
import { BsBoxArrowRight } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import  { BiHistory } from 'react-icons/bi';

const Navbar = ({onBack}) => {
  const navigate = useNavigate();


  const dashboardStyle = {
    backgroundColor: 'white',
    width: '409px',
    minHeight: '60px',
    padding: '20px',
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0 auto', // Center horizontally
  };

  const logoContainerStyle = {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)', // Center the logo horizontally
    zIndex: 2, // Ensure the logo is above other elements
  };

  const logoStyle = {
    maxWidth: '200px',
  };

  const backButtonStyle = {
    cursor: 'pointer',
    fontSize: '32px',
    color: 'black',
    marginLeft: '3px', // Adjust the margin as needed
    zIndex: 2, // Ensure the back button is above other elements
  };

  const historyIconStyle = {
    color: 'rgb(200,25,25)', 
    cursor: 'pointer',
    fontSize: '32px',
    marginRight: '3px', // Adjust the margin as needed
    zIndex: 2, // Ensure the history icon is above other elements
  };

  

  const phoneIconStyle = {
    cursor: 'pointer',
    fontSize: '24px',
    marginLeft: '250px', // Adjust the margin as needed
    zIndex: 2, // Ensure the phone icon is above other elements
  };

  const logoutButtonStyle = {
    cursor: 'pointer',
    fontSize: '24px',
    color: 'black',
    marginRight: '2px', // Adjust the margin as needed
    zIndex: 2, // Ensure the logout button is above other elements
  };

  const handleLogout = () => {
    // Your login logic here

    // If login is successful, navigate to the Hello page
    navigate('/');
  };

  return (
    <div>
      <div style={dashboardStyle}>
        <div style={historyIconStyle} onClick={() => navigate('/Historic')}>
          <BiHistory />
        </div>

        <div style={backButtonStyle} onClick={onBack}>
          {'<'}
        </div>

        <div style={logoContainerStyle}>
          <img src={boaLogo} alt="BOA Logo" className="img-fluid" style={logoStyle} />
        </div>

        <div style={phoneIconStyle} onClick={() => navigate('/call')}>📞</div>

        <BsBoxArrowRight style={logoutButtonStyle} onClick={(handleLogout)} />
      </div>
    </div>
  );
};

export default Navbar;
