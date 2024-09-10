import React from 'react';

const Home = ({ userDetails }) => {
  return (
    <div className="container">
      <h2>Welcome to the Home Page</h2>
      {userDetails ? (
        <div>
          <p>You are logged in with the following details:</p>
          <ul>
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
