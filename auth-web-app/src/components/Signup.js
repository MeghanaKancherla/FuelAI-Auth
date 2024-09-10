import React, { useState } from 'react';
import { Button, Card, Form, FormControl } from 'react-bootstrap';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../Firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [userDetails, setUserDetails] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    mobile: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userDetails.password !== userDetails.confirmPassword) {
      setErrorMessage("Passwords don't match!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, userDetails.email, userDetails.password);
      const user = userCredential.user;
      await setDoc(doc(db, 'users', user.uid), {
        email: userDetails.email,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        mobile: '+1' + userDetails.mobile,
        userId: user.uid,
        createdAt: new Date(),
      });

      alert('User registered successfully!');
      navigate('/login');
    } catch (error) {
      console.error('Error signing up:', error);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="container mt-5">
      <Card className="p-4">
        <h3>Sign Up</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <FormControl
              type="email"
              name="email"
              placeholder="Enter email"
              value={userDetails.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <FormControl
              type="text"
              name="firstName"
              placeholder="Enter first name"
              value={userDetails.firstName}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <FormControl
              type="text"
              name="lastName"
              placeholder="Enter last name"
              value={userDetails.lastName}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Mobile Number</Form.Label>
            <FormControl
              type="tel"
              name="mobile"
              placeholder="Enter mobile number"
              value={userDetails.mobile}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <FormControl
              type="password"
              name="password"
              placeholder="Enter password"
              value={userDetails.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <FormControl
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={userDetails.confirmPassword}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {errorMessage && <p className="text-danger">{errorMessage}</p>}

          <Button variant="primary" type="submit">Sign Up</Button>
        </Form>
      </Card>
    </div>
  );
};

export default Signup;
