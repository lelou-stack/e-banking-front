import React, { useEffect, useState } from 'react';
import Navbar from '../bar/navbar';
import axios from 'axios';
import { baseURL } from '../Utils/Userequest';
import { useNavigate } from 'react-router-dom';
import { loginManager } from '../Utils/LoginManager';


const Transferbank = () => {
  const navigate = useNavigate();


  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [cin, setCin] = useState('');
  const [amount, setAmount] = useState('');
  const [phonecustomer, setPhonecustomer] = useState('');
  const [purpose, setPurpose] = useState('');
  const [selectedFee, setSelectedFee] = useState('FEE_CLIENT_ORDERING');

  const handleBack = () => {
    navigate('/hello');
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
        setPhonecustomer(response.data.customer.phone);
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    };
    fetchphone();
  }, [idOrdonnateur]);




  const handleCheckboxChange = (value) => {
    setSelectedFee(value);
  };


  const initiateTransfer = async (event) => {
    try {

      event.preventDefault(); // Prevent the default form submission behavior

      const transferData = {
        customerID: `${idOrdonnateur}`,
        beneficiaryRequest: {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          phone: phone.trim(),
          cin: cin.trim(),
        },
        motif: purpose,
        feeType: selectedFee,
        pin: "0000",
        isNotificationsSendingChosen: true,
        amounts: [parseFloat(amount.trim())],
        otp: '',
        state: 'TO_BE_SERVED',
        type: 'WALLET_TO_BANK',
        isInitiatedFromMobile: true,
      };
  
      console.log('Transfer Data:', transferData);
  
      const response = await axios.put(`${baseURL}/client/sendOTP`, { phone: {phonecustomer} });
  
      navigate('/validatebank', { state: { transferData } });
      console.log(response);
    } catch (error) {
      console.error('Error initiating transfer:', error);
    }
  };
  


  const formStyle = {
    maxWidth: '400px',
    marginTop: '20px',
  };
  
  const titleStyle = {
    fontSize: '20px',
    color: 'rgb(50,205,200)',
    marginBottom: '3px',
    textAlign: 'center',
  };
  
  const formGroupStyle = {
    marginBottom: '15px',
  };
  
  const labelStyle = {
    display: 'block',
    marginBottom: '5px',
    color: 'black',
  };
  
  const inputStyle = {
    width: '300px',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
  };
  
  const submitButtonStyle = {
    backgroundColor: 'rgb(50,205,200)',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '300px',
  };
  
  
  
  const container = {
    height: '608px',
    width: '409px',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  return (
    <div style = {container}>
      <Navbar onBack={handleBack} />
      <h3 style={titleStyle}>Transfer GAB</h3>

      <form style={formStyle}>
      <div style={formGroupStyle}>
          <label style={labelStyle} htmlFor="firstName">
            First Name
          </label>
        <input type="text" style={inputStyle} placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      </div>
      <div style={formGroupStyle}>
        <label style={labelStyle} htmlFor="lastName">
              Last Name
          </label>
        <input type="text"  style={inputStyle} placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </div>
      <div style={formGroupStyle}>
        <label style={labelStyle} htmlFor="phone">
        phone
          </label>
        <input type="text" style={inputStyle} placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>
      <div style={formGroupStyle}>
        <label style={labelStyle} htmlFor="cin">
        CIN
          </label>
        <input type="text" style={inputStyle} placeholder="cin" value={cin} onChange={(e) => setCin(e.target.value)} />
      </div>
      <div style={formGroupStyle}>
        <label style={labelStyle} htmlFor="Amount">
        Amount (MAD)
          </label>
        <input type="text" style={inputStyle} placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </div>
      <div style={formGroupStyle}>
        <label style={labelStyle} htmlFor="purpose">
        Purpose
          </label>
        <input type="text" style={inputStyle} placeholder="purpose" value={purpose} onChange={(e) => setPurpose(e.target.value)} />
      </div>
      <div style={formGroupStyle}>
          <label style={labelStyle} htmlFor="feeType">
            Fee Type
          </label>
          <select
            id="feeType"
            style={inputStyle}
            value={selectedFee}
            onChange={(e) => handleCheckboxChange(e.target.value)}
          >
            {['FEE_CLIENT_ORDERING', 'FEE_BENEFICIARY', 'FEE_SHARED'].map((feeType) => (
              <option key={feeType} value={feeType}>
                {feeType}
              </option>
            ))}
          </select>
        </div>
 
        <div>
        <button onClick={(event) => initiateTransfer(event)} style={submitButtonStyle}>
          Next
        </button>

        </div>
        </form>

    </div>
  );
};


export default Transferbank;