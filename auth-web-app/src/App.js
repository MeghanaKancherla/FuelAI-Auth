import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/Signup';
import Home from './components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import PhoneAuth from './components/PhoneAuth';
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserDetails(null);
    alert('You have logged out');
  };

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">Firebase Auth</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {!isAuthenticated ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signup">Sign Up</Link>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <div className="content-container">
        <Routes>
          <Route path="/" element={<Home userDetails={userDetails} />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} setUserDetails={setUserDetails}/>} />
          <Route path="/phone-auth" element={<PhoneAuth setIsAuthenticated={setIsAuthenticated} setUserDetails={setUserDetails} />} />
          
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
