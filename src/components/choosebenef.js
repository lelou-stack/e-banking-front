import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../bar/navbar';
import axios from 'axios';
import { baseURL} from '../Utils/Userequest';
import { loginManager } from '../Utils/LoginManager';



const Choosebenef = ({}) => {
  const navigate = useNavigate();
  const location = useLocation();
  

  const idOrdonnateur = loginManager.state.idOrdonnateur;


  const handleBack = () => {
    navigate('/transfer');
  };


  const titleStyle = {
    fontSize: '20px',
    color: 'rgb(50,205,200)',
    marginTop: '20px',
    marginBottom: '20px',
    textAlign: 'center',
  };


  const beneficiaryStyle = {
    margin: '10px 0',
    cursor: 'pointer', 
  };

  const container = {
    height: '608px',
    width: '409px',
    margin: 'auto', // Center the container horizontally
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Center the container vertically
  };

  const separatorStyle = {
    borderTop: '2px solid rgb(50,205,200)',
    margin: '20px 0',
  };

  const fullNameStyle = {
    color: 'black',
    fontSize: '16px',
    textAlign: 'center',
  };

  const ribStyle = {
    color: 'blue',
    fontSize: '16px',
    textAlign: 'center',
  };

  // List of beneficiaries
  const [beneficiaries, setBeneficiaries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
       // const response = await axios.get(`${baseURL}/client/get-by-customer-to-customer-id/${idOrdonnateur}`);
       const response = await axios.get(`${baseURL}/client/get-by-customer-to-customer-id/${idOrdonnateur}`);

        setBeneficiaries(response.data); // Assuming the response contains an array of beneficiaries
      } catch (error) {
        console.error('Error fetching beneficiaries:', error);
      }
    };

    fetchData();
  }, [idOrdonnateur]);

  const handleBeneficiaryClick = (beneficiaryId) => {
    // Find the corresponding beneficiary in the list
    const selectedBeneficiary = beneficiaries.find(b => b.id === beneficiaryId);
    console.log(beneficiaryId);

    // Navigate to the Transfer page with the selected beneficiary
    navigate('/transfer', { state: { beneficiary: selectedBeneficiary } });
  };

  return (
    <div style={container}>
      <Navbar onBack={handleBack} />
      <h3 style={titleStyle}>Choose Beneficiary</h3>

      {/* Beneficiary List */}
      <div>
        {beneficiaries.map(beneficiary => (
          <div key={beneficiary.id} style={beneficiaryStyle} onClick={() => handleBeneficiaryClick(beneficiary.id)}>
            <p style={fullNameStyle}>{beneficiary.firstName} {beneficiary.lastName}</p>
            <p style={ribStyle}>{beneficiary.rib}</p>
            <div style={separatorStyle}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Choosebenef;
