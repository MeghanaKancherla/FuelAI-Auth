import React from 'react';
import '../style/style.css';

const Home = ({ userDetails }) => {
  return (
    <div className="home-container">
      <h2 className='home-heading'> Welcome to the Home Page</h2>
      {userDetails ? (
        <div>
          <p>You are logged in with the following details:</p>
          <ul className='user-details'>
            <li><strong>Email:</strong> {userDetails.email}</li>
            <li><strong>First Name:</strong> {userDetails.firstName}</li>
            <li><strong>Last Name:</strong> {userDetails.lastName}</li>
            <li><strong>Mobile:</strong> {userDetails.mobile}</li>
            <li>
              <strong>Created At:</strong>{' '}
              {userDetails.createdAt ? (
                userDetails.createdAt.toDate().toLocaleString()
              ) : (
                'No timestamp available'
              )}
            </li>
          </ul>
        </div>
      ) : (
        <p>No user details available.</p>
      )}
    </div>
  );
};

export default Home;
