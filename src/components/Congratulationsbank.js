import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../bar/navbar';
import { baseURL, baseURLtransfert } from '../Utils/Userequest';
import axios from 'axios';


const Congratsbank = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    navigate('/transfergab');
  };


  const { transferid, reference } = location.state;


  const containerStyle = {
    textAlign: 'center',
    color: 'black',
    backgroundColor: 'rgba(50, 205, 200,0.7)',
    padding: '20px',
    borderRadius: '10px',
    margin: '20px',
    marginTop: '125px'
  };

  const textStyle = {
    color: 'black',
  };

  const buttonStyle = {
    backgroundColor: 'white',
    color: 'rgb(0, 47, 108)',
    border: '2px solid rgb(50, 205, 200)',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold', // Add this line to make the text bolder
  };
  

  const handleDownloadPDF = async() => {
      try {
        // Make a request to the API to get the PDF
        const response = await axios.get(`${baseURLtransfert}/transfers/downloadPDF/${transferid}`, {
          responseType: 'arraybuffer', // Set the responseType to 'arraybuffer' for binary data
        });
  
        // Convert the binary data to a blob
        const blob = new Blob([response.data], { type: 'application/pdf' });
  
        // Create a URL for the blob
        const url = URL.createObjectURL(blob);
  
        // Create a link element and simulate a click on it to trigger the download
        const link = document.createElement('a');
        link.href = url;
        link.download = `recu_${reference}.pdf`;
        link.click();
  
        // Clean up by revoking the object URL
        URL.revokeObjectURL(url);
  
      } catch (error) {
        console.error('Error downloading PDF:', error);
        // Handle the error, e.g., show an error message
      }
  };

  return (
    <div>
      <Navbar onBack={handleBack} />
      <div style={containerStyle}>
        <h2 style={textStyle}>Congratulations!</h2>
        <p style={textStyle}>Your transfer with reference {reference} was successful.</p>
        <button style={buttonStyle} onClick={handleDownloadPDF}>
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default Congratsbank;
