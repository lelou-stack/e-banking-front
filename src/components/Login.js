import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import boaLogo from '../assets/boa.jpeg';
import backgroundImg from '../assets/background.jpeg';
import { loginManager } from '../Utils/LoginManager';


const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
  
    // Hardcoded user credentials
    const user1 = { username: 'hamidi hafssa', password: '123456', id: 1 };
    const user2 = { username: 'ammaha mohamed', password: '56789', id: 2 };
    const user3 = { username: 'Bourass Aissam', password: '56789', id: 3 };

    loginManager.setUsername(username);
    loginManager.setPassword(password);

    // Check if entered credentials match any user
    if (loginManager.state.username === user1.username && loginManager.state.password === user1.password) {
      console.log('Login successful for Hafssa Hamidi. ID: 1');
      loginManager.setIdOrdonnateur(user1.id);
      navigate('/hello');
    } else if (loginManager.state.username === user2.username && loginManager.state.password === user2.password) {
      console.log('Login successful for Ammaha Mohamed. ID: 2');
      loginManager.setIdOrdonnateur(user2.id);
      navigate('/hello');
    } else if (loginManager.state.username === user3.username && loginManager.state.password === user3.password) {
      console.log('Login successful for Bourass Aissam. ID: 3');
      loginManager.setIdOrdonnateur(user3.id);
      navigate('/hello');
    }else {
      console.log('Invalid username or password');
      // You can show an error message here if needed
    }
  };
  

  const logoHeight = 90;

  const containerStyle = {
    minHeight: '80vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: `url(${backgroundImg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: `calc(100vh - ${logoHeight}px)`,
    marginTop: '10px',
    width: '409px', // Set width to 409px
    margin: '0 auto', // Center horizontally
  };

  const cardStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: '20px',
    borderRadius: '10px',
    width: '300px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  };

  const logoStyle = {
    backgroundColor: 'white',
    textAlign: 'center',
    width: '409px', // Set width to 409px
    boxSizing: 'border-box',
    maxHeight: `${logoHeight}px`,
    margin: '0 auto', // Center horizontally
  };

  return (
    <div>
      <div style={logoStyle}>
        <img src={boaLogo} alt="BOA Logo" className="img-fluid" style={{ maxWidth: '200px' }} />
      </div>
      <div style={containerStyle}>
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
          <div className="card" style={cardStyle}>
            <div className="text-center mb-4">
              <h2>Authentication</h2>
            </div>
            <form>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input type="text" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <button type="submit" className="btn btn-primary d-flex justify-content-center align-items-center" onClick={handleLogin} style={{ height: '50px' }} >
                Login
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
