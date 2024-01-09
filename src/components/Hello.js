import React, { useEffect, useState } from 'react';
import { BiTransfer } from 'react-icons/bi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../bar/navbar';
import ATMImage from '../assets/atm.png';
import { FaUniversity } from 'react-icons/fa';  
import axios from 'axios';
import { baseURL } from '../Utils/Userequest';
import { loginManager } from '../Utils/LoginManager';





const TransactionButton = ({ label, to, icon, buttonStyle ,idOrdonnateur}) => {
  

  const iconStyle = {
    marginBottom: '5px',
    fontSize: '32px',
    color: 'black', 
  };
  const labelStyle = {
    fontSize: '18px',
    color: 'black',
    fontFamily: 'Arial, sans-serif',
  };


  return (
    <Link to={{ pathname: to, state: { idOrdonnateur } }} style={{ textDecoration: 'none' }}>
    <div style={buttonStyle}>
      {icon && <div style={iconStyle}>{icon}</div>}
      <div style={labelStyle}>{label}</div>
    </div>
  </Link>
);
};



const Hello = () => {
  const navigate = useNavigate();
  const [firstName,setFirstName]=useState(null);
  const [lastName,setLastName]=useState(null);
  const [rib,setRib]=useState(null);
  const [balance, setBalance] = useState(null);
  const location = useLocation();

  
  const handleBack = () => {
    navigate('/');
  };

  const idOrdonnateur = loginManager.state.idOrdonnateur;

  useEffect(() => {
    const fetchinfo = async () => {
      if (!idOrdonnateur) {
        console.error('idOrdonnateur is undefined');
        return;
      }

      try {
        const response = await axios.get(`${baseURL}/client/getWalletByWalletID/${idOrdonnateur}`);
        setFirstName(response.data.customer.firstName);
        setLastName(response.data.customer.lastName);
        setRib(response.data.rib);
        setBalance(response.data.balance);
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    };

    fetchinfo();
  }, [idOrdonnateur]);


  const helloContainerStyle = {
    backgroundColor: '#f2f2f2', // Grey background color
    display: 'flex',
    marginTop: '18px', // Space below the navbar
    marginLeft: '10px',
    marginRight: '10px',
    height: '490px',
    border: '2px solid #d9d9d9', // Foggy border color
    borderRadius: '6px', // Rounded corners
    padding: '20px', // Padding for content inside
    flexDirection: 'column',
    alignItems: 'center',
  };

  const container = {
    height: '608px',
    width: '409px',
    margin: 'auto', // Center the container horizontally
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Center the container vertically
  };

  const usernameStyle = {
    color: '	rgb(50,205,200)',
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '10px',
  };

  const balanceStyle = {
    fontSize: '18px',
    margin: '10px',
    color: 'rgb(40, 50, 60)', // Green color for the balance
  };

  const transactionButtonsContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '0px', // Push to the bottom of the container
    padding: '20px', // Padding for spacing from the container edges
    marginLeft: '20px', // Margin on the left
    marginRight: '20px', // Margin on the right
  };

  const buttonStyleleft = {
    backgroundColor: 'white',
    borderTop: '4px solid rgba(50,205,200,0.6)', // Foggy border color with alpha channel
    borderBottom: '4px solid rgba(50,205,200, 0.6)', // Foggy border color with alpha channel
    borderRadius: '12px',
    padding: '20px 50px', // Adjusted padding for a smaller height
    display: 'flex',
    flexDirection: 'column', // Display icon above label
    alignItems: 'center', // Center content
    cursor: 'pointer',
    marginRight: '8px', 
    marginLeft:'4px'
  };

  const buttonStyleright = {
    backgroundColor: 'white',
    borderTop: '4px solid rgba(50,205,200,0.6)', // Foggy border color with alpha channel
    borderBottom: '4px solid rgba(50,205,200, 0.6)', // Foggy border color with alpha channel
    borderRadius: '12px',
    padding: '20px 60px', // Adjusted padding for a smaller height
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
    marginLeft: '8px',
    marginRight:'4px'
  };

  const buttonStyleBank = {
    backgroundColor: 'white',
    borderTop: '4px solid rgba(50,205,200,0.6)',
    borderBottom: '4px solid rgba(50,205,200, 0.6)',
    borderRadius: '12px',
    padding: '20px 60px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
    marginLeft: '8px',
    marginRight: '4px',
  };

  return (
    <div style={container}>
      <Navbar onBack={handleBack} />
      <div style={helloContainerStyle}>
        <div style={usernameStyle}>{firstName} {lastName}</div>
        <div style={balanceStyle}>RIB: {rib}</div>
        <div style={balanceStyle}>Balance: {balance} MAD</div>

        <div style={transactionButtonsContainerStyle}>
          <TransactionButton label="Transfer" icon={<BiTransfer />} to="/transfer" buttonStyle={buttonStyleleft}  />
          <TransactionButton label="GAB" icon={<img src={ATMImage} style={{ width: '32px', height: '32px', marginBottom: '5px'}} />} to="/transfergab" buttonStyle={buttonStyleright}  />
        </div>
        <div style={transactionButtonsContainerStyle}>
        <TransactionButton label="Bank" icon={<FaUniversity />} to="/bank" buttonStyle={buttonStyleBank}/>
        </div>
      </div>
    </div>
  );
};

export default Hello;
