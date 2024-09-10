import React, { useState } from 'react';
import { Button, Card, Form, FormControl } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../Firebase';
import { doc, getDoc } from 'firebase/firestore';

const Login = ({ setIsAuthenticated, setUserDetails }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDocRef = doc(db, 'users', user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();

        setUserDetails(userData);
        setIsAuthenticated(true);
        navigate('/');
      } else {
        setErrorMessage('User data not found.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="container mt-5">
      <Card className="p-4">
        <h3>Login</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <FormControl
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <FormControl
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          {errorMessage && <p className="text-danger">{errorMessage}</p>}
          
          <Button variant="primary" type="submit">Submit</Button>
        </Form>
        <hr />
        <Button className="mt-3" variant="secondary" onClick={() => navigate('/phone-auth')}>
          Phone Number Auth
        </Button>
      </Card>
    </div>
  );
};

export default Login;
