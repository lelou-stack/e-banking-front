import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../bar/navbar';
import { baseURL } from '../Utils/Userequest';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';


function AddBenef() {
    const navigate = useNavigate();
    const [rib, setrib] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    const handleBack = () => {
      navigate('/transfer');
    };
  

    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const response = await axios.post(`${baseURL}/client/check-customer-sirone-status-by-rib`, { "rib": rib });
        console.log(response.data);
    
        if (response.data.isBlockedOrExist) {
          if (response.data.id || response.data.customer) {
            // Pass only necessary data to the state
            navigate('/transfer', { state: { beneficiary: response.data.customer } });
          } else {
            setErrorMessage(response.data.message);
          }
        } else {
          setErrorMessage(response.data.message);
        }
      } catch (error) {
        console.error('Error adding beneficiary:', error);
        setErrorMessage('Une erreur s\'est produite lors de l\'ajout du bénéficiaire.');
      }
    };
    
    

  return (
    <div style={container}>
    <Navbar onBack={handleBack}/>
    <div >
      <form style={formStyle} onSubmit={handleSubmit}>
        <h3 style={titleStyle}>Add Beneficiary</h3>
        <div style={formGroupStyle}>
          <label style={labelStyle} htmlFor="rib">
            RIB
          </label>
          <input style={inputStyle} type="text" id="rib" required value={rib} onChange={(e) => setrib(e.target.value)}/>
        </div>
        <button style={submitButtonStyle} type="submit">
          Add
        </button>
      </form>
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

const container = {
  height: '608px',
  width: '409px',
  margin: 'auto', // Center the container horizontally
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center', // Center the container vertically
};


const formStyle = {
  maxWidth: '400px',
  marginTop: '20px',
};

const titleStyle = {
  fontSize: '20px',
  color: 'rgb(50,205,200)',
  marginBottom: '20px',
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



export default AddBenef;
