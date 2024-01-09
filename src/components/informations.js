import React from 'react';
import Navbar from '../bar/navbar';
import info from '../assets/info2.jpg';
import { useNavigate } from 'react-router-dom';

const Informations = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/hello');
  };

  const containerStyle = {
    width:'409px',
    maxheight: '600px',
    margin: 'auto',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  };

  const infoItemStyle = {
    color: 'white',
    marginBottom: '20px',
    textAlign: 'center',
    borderBottom: '1px solid #eee',
    paddingBottom: '10px',
  };

  const titleStyle = {
    fontSize: '24px',
    color: 'rgb(50, 205, 200)',
    marginBottom: '20px',
    textAlign: 'center',
  };

  const infoTextStyle = {
    color:'white',
    fontSize: '18px',
    lineHeight: '1.6',
  };

  const backgroundStyle ={
    backgroundImage: `url(${info})`,
    padding: '40px',
    borderRadius: '6px'
  }

  return (
    <div>
      <Navbar onBack={handleBack} />
      <div style={containerStyle}>
        <h3 style={titleStyle}>Informations</h3>
        <div style={backgroundStyle}>
        <div style={infoItemStyle}>
          <strong style={infoTextStyle}>Phone Number:</strong> 0523140252
        </div>

        <div style={infoItemStyle}>
          <strong style={infoTextStyle}>Address:</strong> Seashore, Casablanca
        </div>

        <div style={infoItemStyle}>
          <strong style={infoTextStyle}>Nearest Agency:</strong> City Center seashore
        </div>

        <div style={infoItemStyle}>
          <strong style={infoTextStyle}>Email:</strong> BOA@bank.com
        </div>

      </div>
      </div>
    </div>
  );
};

export default Informations;
