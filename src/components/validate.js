import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Navbar from '../bar/navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import CodeInput from './codeInput';
import axios from 'axios';
import {  baseURLtransfert,baseURL } from '../Utils/Userequest';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { loginManager } from '../Utils/LoginManager';



function Validate() {
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [phone, setPhone] = useState('');


  const handleBack = () => {
    navigate('/transfer');
  };


  const location = useLocation();
  const transferData = location.state && location.state.transferData;

  const containerStylevalidate = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    border: '2px solid #d9d9d9',
    borderRadius: '6px',
    padding: '20px',
    margin: '80px 10px',
    height: '300px',
  };

  const container = {
    height: '608px',
    width: '409px',
    margin: 'auto', // Center the container horizontally
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Center the container vertically
  };

  const handleCodeChange = async (code) => {
    
    setVerificationCode(code);

    if (code.length === 4) {
      const updatedTransferData = {
        ...transferData,
        otp: code,
      };

      console.log('API transfert:', updatedTransferData);

      try {
        const response = await axios.post(`${baseURLtransfert}/transfers/initiate`, updatedTransferData);


        console.log('API Response:', response.data);

        if (response.data.isInitaited) {
          // Call the parent function with the modified object
          onSummaryButtonClick(response.data.transferID, response.data.ref);
        } else {
          // Display custom alert message based on conditions
          setErrorMessage(response.data.message);
        }
      } catch (error) {
        console.error('Error initiating transfer:', error);

        // Show custom alert for network errors
        setErrorMessage('error initiating the transfer.');
      }
    }
  };

  const onSummaryButtonClick = (transferID, ref) => {
    // Ensure that transferID and ref have valid values
    if (transferID && ref) {
      // Navigate to the Congratulations page with the transfer reference
      navigate('/congrats', { state: { transferid: transferID, reference: ref } });
    } else {
      console.error('Invalid transferID or ref');
    }
  };

  
  const idOrdonnateur = loginManager.state.idOrdonnateur;

  useEffect(() => {
    const fetchphone = async () => {
      if (!idOrdonnateur) {
        console.error('idOrdonnateur is undefined');
        return;
      }

      try {
        const response = await axios.get(`${baseURL}/client/getWalletByWalletID/${idOrdonnateur}`);
        setPhone(response.data.customer.phone);
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    };
    fetchphone();
  }, [idOrdonnateur]);


  const handleValidate = async () => {
    try {
      const response = await axios.put(`${baseURL}/client/sendOTP`, { phone: {phone} });
      console.log('Server Response:', response);
    
      if (response.data.code) {
        console.log('OTP resent successfully.');
      } else {
        console.error('Failed to resend OTP. Server response:', response.data);
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      setErrorMessage('Error sending OTP. Please try again.');
    }
    
  };
  

  return (
    <div style={container}>
      <Navbar onBack={handleBack} />
      <div style={containerStylevalidate}>
        <div className="px-3">
          <h5 className="m-0 text-center">Enter your code verification</h5>
          <span className="mobile-text text-center">
            Enter the code we just sent to your mobile phone <b className="text-orange">0652145620</b>
          </span>
          <CodeInput length={4} onChange={handleCodeChange} />
          <div className="text-center mt-5">
            <span className="d-block mobile-text">Didn't receive the code?</span>
            <Link className="font-weight-bold text-danger cursor" onClick={handleValidate}>
              Resend
            </Link>
          </div>
        </div>
      </div>
      {errorMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            borderRadius: '6px',
            paddingBottom: '20px',  // Added padding to the bottom
            margin: '10px',
            backgroundColor: 'rgb(200,25,25)',
            color: 'white',
            width:'400px'
            
          }}
        >  
        <div style={{ cursor: 'pointer', marginBottom:'0px',alignSelf: 'flex-end' }} onClick={() => setErrorMessage('')}>
            <FontAwesomeIcon icon={faTimes} style={{ color: 'white' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <FontAwesomeIcon icon={faExclamationTriangle} style={{ color: 'white', fontSize: '40px'}} />
            <span style={{ color: 'white', marginLeft: '30px' }}>{errorMessage}</span>
        </div>
        </div>
      )}
    </div>
  );
}


export default Validate;
