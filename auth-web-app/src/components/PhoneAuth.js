import React, { useState } from 'react';
import { Button, Card, Form, FormControl } from 'react-bootstrap';
import { auth, db } from '../Firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const PhoneAuth = ({ setIsAuthenticated, setUserDetails }) => {
  const [phone, setPhone] = useState('+1');
  const [hasFilled, setHasFilled] = useState(false);
  const [otp, setOtp] = useState('');
  const [phoneExists, setPhoneExists] = useState(true);
  const navigate = useNavigate();

  const checkPhoneExists = async (phoneNumber) => {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('mobile', '==', phoneNumber));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty; 
  };

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        'recaptcha-container',
        { size: 'invisible' },
        auth
      );
    }
  };

  const handleSendOtp = async (event) => {
    event.preventDefault();

    const phoneExistsInDb = await checkPhoneExists(phone);
    setPhoneExists(phoneExistsInDb);

    if (!phoneExistsInDb) {
      alert('This phone number is not registered. Please sign up.');
      return;
    }

    setHasFilled(true);
    setupRecaptcha();
    try {
      const appVerifier = window.recaptchaVerifier;
      const confirmationResult = await signInWithPhoneNumber(auth, phone, appVerifier);
      window.confirmationResult = confirmationResult;
    } catch (error) {
      console.error('Error sending OTP:', error);
      alert('Error sending OTP. Please try again.');
    }
  };

  const verifyOtp = async () => {
    if (otp.length === 6) {
      try {
        const confirmationResult = window.confirmationResult;
        await confirmationResult.confirm(otp);
        alert('User signed in successfully');
        setIsAuthenticated(true);
        
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('mobile', '==', phone));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          setUserDetails(userData);
        }
        navigate('/');
      } catch (error) {
        console.error('Invalid OTP:', error);
        alert('Invalid OTP. Please try again.');
      }
    } else {
      alert('Please enter a valid 6-digit OTP.');
    }
  };

  return (
    <div className="container mt-5">
      <Card className="p-4">
        {!hasFilled ? (
          <Form onSubmit={handleSendOtp}>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <FormControl
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">Send OTP</Button>
            <hr />
           <Button className="mt-3" variant="secondary" onClick={() => navigate('/login')}>
           Use EmailID and Password
         </Button>
          </Form>
          
        ) : (
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Enter OTP</Form.Label>
              <FormControl
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" onClick={verifyOtp}>Verify OTP</Button>
          </Form>
          
        )}

        {!phoneExists && (
          <div className="mt-3">
            <Button variant="secondary" onClick={() => navigate('/signup')}>
              Sign Up
            </Button>
          </div>
        )}
      </Card>
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default PhoneAuth;
