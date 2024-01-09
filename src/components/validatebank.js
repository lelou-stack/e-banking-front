import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Navbar from '../bar/navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import CodeInput from './codeInput';
import axios from 'axios';
import {  baseURLtransfert, baseURL } from '../Utils/Userequest';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';


function Validatebank() {
  const navigate = useNavigate();
  const [code, setVerificationCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleBack = () => {
    navigate('/bank');
  };


  const location = useLocation();
  const requestBody = location.state && location.state.requestBody;

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

// ...

const handleCodeChange = async (code) => {
    setVerificationCode(code);
  
    if (code.length === 4) {
      const upatedbankdata = {
        ...requestBody,
        otp: code,
      };
  
      console.log('API transfert:', upatedbankdata);
  
      try {
        const response = await axios.post(`${baseURLtransfert}/transfers/initiate`, upatedbankdata);
  
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
        setErrorMessage('Error initiating the transfer.');
      }
    }
  };
  
  // ...
  

  const onSummaryButtonClick = (transferID, ref) => {
    // Ensure that transferID and ref have valid values
    if (transferID && ref) {
      // Navigate to the Congratulations page with the transfer reference
      navigate('/congratsbank', { state: { transferid: transferID, reference: ref } });
    } else {
      console.error('Invalid transferID or ref');
    }
  };

  const handleValidate = async () => {
    try {
      // Send OTP to the phone number
      const response = await axios.put(`${baseURL}/client/sendOTP`, { phone: "+19876543210" });
  
      // Check if the OTP sending was successful
      if (response.data.code) {
        // Optional: You may want to inform the user that the OTP has been resent successfully
        console.log('OTP resent successfully.');

        setVerificationCode('');
        
      } else {
        // Handle the case where OTP sending failed
        console.error('Failed to resend OTP.');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      // Handle the error, e.g., show an error message
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
            Enter the code we just sent to your mobile phone <b className="text-orange">+19876543210</b>
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


export default Validatebank;
