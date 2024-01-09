import React, { useEffect, useState } from 'react';
import Navbar from '../bar/navbar';
import { baseURL } from '../Utils/Userequest';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { loginManager } from '../Utils/LoginManager';


const Historic = () => {
  const navigate = useNavigate();

  const [transferHistory, setTransferHistory] = useState([]);
  const [cin, setCin] = useState('');


  const idOrdonnateur = loginManager.state.idOrdonnateur;

  useEffect(() => {
    const fetchcin = async () => {
      if (!idOrdonnateur) {
        console.error('idOrdonnateur is undefined');
        return;
      }

      try {
        const response = await axios.get(`${baseURL}/client/getWalletByWalletID/${idOrdonnateur}`);
        console.log(response.data.customer);
        setCin(response.data.customer.cin);
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    };
    fetchcin();
  }, [idOrdonnateur]);



  const handleBack = () => {
    navigate('/hello');
  };


  useEffect(() => {
    // Replace 'getAllTransfers' with the actual function that fetches transfer history
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/transfers/getTransferHistory/${cin}`);
        setTransferHistory(response.data); // Assuming the API response contains an array of transfer history
      } catch (error) {
        console.error('Error fetching transfer history:', error);
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures that this effect runs only once after the initial render

  const containerStyle = {
    width: '409px',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
  };

  const entryStyle = {
    border: '2px solid #d9d9d9',
    borderRadius: '6px',
    padding: '20px',
    marginBottom: '20px',
    width: '90%',
    display: 'flex',
    justifyContent: 'space-between',
  };

  const textContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  };

  const titleStyle = {
    fontSize: '20px',
    color: 'rgb(50,205,200)',
    marginBottom: '20px',
    textAlign: 'center',
  };

  return (
    <div style={containerStyle}>
      <Navbar onBack={handleBack} />
      <h3 style={titleStyle}>Transfer History</h3>
      {transferHistory.map((transfer, index) => (
        <div key={index} style={entryStyle}>
          <div style={textContainerStyle}>
          <div>date: {transfer.initatedDate}</div>
            <div>Amount: {transfer.transferedAmount}</div>
            <div>Beneficiaries: </div>
            <ul>
              {transfer.recipient.map(r=>(<li>{r.fullName}</li>))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Historic;
