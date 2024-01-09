import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../bar/navbar';
import axios from 'axios';
import { baseURL} from '../Utils/Userequest';
import { loginManager } from '../Utils/LoginManager';


const Transfer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    navigate('/hello');
  };

  const [amount, setAmount] = useState('');
  const [purpose, setPurpose] = useState('');
  const [phone, setPhone] = useState('');

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


  const titleStyle = {
    backgroundColor: 'rgb(50,205,200)',
    color: 'white',
    fontSize: '20px',
    fontWeight: 'bold',
    margin: '0px 4px',
    padding: '6px 150px',
    textAlign: 'center',
  };

  const containerStyle = {
    backgroundColor: '#f2f2f2',
    border: '2px solid #d9d9d9',
    borderRadius: '6px',
    padding: '20px',
    margin: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const transferStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  };

  const labelStyle = {
    color: 'black',
    fontSize: '16px',
    margin: '5px 0',
    width: '100%',
    textAlign: 'left',
  };

  const inputStyle = {
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    width: '100%',
    boxSizing: 'border-box',
    marginBottom: '10px',
  };

  const buttonStyle = {
    backgroundColor: 'rgb(0, 47, 108)',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '100%',
  };

  const buttonStyle2 = {
    backgroundColor: 'white',
    color: 'rgb(50,205,200)',
    border: '1px solid rgb(50,205,200)',
    padding: '9px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '100%',
    textDecoration: 'none',
    display: 'block',
    textAlign: 'center',
  };

  const textStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginBottom: '10px',
  };




  const beneficiary = location.state && location.state.beneficiary;

  

 

  const initiateTransfer = async () => {
    try {
      const transferData = {
        reference: "",
        amounts: [parseFloat(amount)],
        customerID: `${idOrdonnateur}`,
        motif: purpose,
        state: "SERVED",
        type: "WALLET_TO_WALLET",
        otp: "",
        isInitiatedFromMobile: true,
        feeType: "FEE_CLIENT_ORDERING",
        beneficiaries_ids: [beneficiary.id],
      };

      console.log('Transfer Data:', transferData);

      
      const response = await axios.put(`${baseURL}/client/sendOTP`, {phone: {phone}, })

      navigate('/validate', { state: { transferData } });
      console.log(response);
    } catch (error) {
      console.error('Error initiating transfer:', error);
    }
  };

  const addbeneficiary = () => {
    navigate('/addbenef', { state: { idOrdonnateur: `${idOrdonnateur}`} });
  };

  const choosebeneficiary = () => {
    navigate('/choosebenef', { state: { idOrdonnateur: `${idOrdonnateur}`} });
  };


  const container = {
    height: '608px',
    width: '409px',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const beneficiaryInfoStyle = {
    border: '4px solid rgb(0, 47, 108)',
    color: 'rgb(0, 47, 108)',
    padding: '10px',
    borderRadius: '6px',
    marginTop: '15px',
    textAlign: 'center',
    width:'250px',
    fontWeight: 'bold', 
  };

  return (
    <div style={container}>
      <Navbar onBack={handleBack} />
      <div style={titleStyle}>Transfer</div>
      <div style={containerStyle}>
        <div style={transferStyle}>
          <h4> Debit account</h4>
          <div style={textStyle}>
            <div>
              <button style={buttonStyle2} onClick={choosebeneficiary}>
                Choose your Beneficiary
              </button>
              <label style={labelStyle}>Amount</label>
              <input style={inputStyle} value={amount} onChange={(e) => setAmount(e.target.value)} />
              <label style={labelStyle}>Purpose</label>
              <input style={inputStyle} value={purpose} onChange={(e) => setPurpose(e.target.value)} />
              <button style={buttonStyle} onClick={initiateTransfer}>
                Next
              </button>
            </div>
            <div></div>
          </div>
        </div>
      </div>
      <button style={{ ...buttonStyle2, marginRight: '10px' }} onClick={addbeneficiary}>
        Add Beneficiary
      </button>
      {beneficiary && (
            <div style={beneficiaryInfoStyle}>
              <div>{beneficiary.firstName} {beneficiary.lastName}</div>
              <div>{beneficiary.rib}</div>
            </div>
            )}
    </div>
  );
};

export default Transfer;
