import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import boaLogo from '../assets/boa.jpeg';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="bg-light col-auto col-md-3 min-vh-100 d-flex flex-column justify-content-start align-items-center">
          {/* Logo */}
          <div className="mt-2 mb-3">
            <img src={boaLogo} alt="BOA Logo" className="img-fluid" style={{ maxWidth: '200px', marginTop: '10px' }} />
          </div>
          {/* Line separator */}
          <hr className="mb-3" style={{ borderTop: '2px solid #ddd', width: '100%' }} />
          {/* Container on top */}
          <div className="container">
            {/* Navigation links */}
            <ul className="nav nav-pills flex-column">
              <li className="nav-item text-white fs-4">
                <Link to="/dashboard" className="nav-link text-black fs-5" aria-current="page">
                  <span className="ms-2">Dashboard</span>
                </Link>
              </li>
              <li className="nav-item text-white fs-4">
                <Link to="/rib" className="nav-link text-black fs-5" aria-current="page">
                  <span className="ms-2">Rib</span>
                </Link>
              </li>
              <li className="nav-item text-white fs-4">
                <Link to="/transfertgab" className="nav-link text-black fs-5" aria-current="page">
                  <span className="ms-2">Transfert GAB</span>
                </Link>
              </li>
              <li className="nav-item text-white fs-4">
                <Link to="/disconnect" className="nav-link text-black fs-5" aria-current="page">
                  <span className="ms-2">Disconnect</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
