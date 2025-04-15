
import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';


// login/signup popup window
/**
 * AuthModal Component
 * @param {Object} props
 * @param {Function} props.setUser - Function to update user state
 */
const AuthModal = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Reset error message
  const handleCloseModal = () => {
    setShowModal(false);
    setErrorMessage('');
  };

  // Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

    const data = await response.json();
      if (response.ok) {

        //const responseData = await response.json();
    
        const { token, ...userData } = data;
        if (token && userData.name && userData.email) {
          localStorage.setItem('token', token);
          //setUser(userData);

      setUser({
        email: userData.email,
        name: userData.name,
        role: userData.role,
      });

        setShowModal(false);
        } else {
          //setErrorMessage(data.message);
          setErrorMessage('Unexpected response from server.');
        }

      } else {
        //const responseData = await response.json();
        setErrorMessage(data.error || 'An error occurred. Please try again.');
        //alert(responseData.error || 'An error occurred. Please try again.');
      }
    } catch {
      setErrorMessage('An unexpected error occurred. Please try again.');
    }
  };

  // Registration
  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        alert('Registration successful! Please log in.');
        setIsRegistering(false);
        handleCloseModal(); 
      } else {
        const responseData = await response.json();
        setErrorMessage(responseData.error || 'Registration failed. Please try again.');
      }
    } catch {
      setErrorMessage('An error occurred during registration. Please try again.');
    }
  };

  return (
    <>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        {isRegistering ? 'Register' : 'Login'}
      </Button>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{isRegistering ? 'Register' : 'Login'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          <Form onSubmit={isRegistering ? handleRegister : handleLogin}>
            {isRegistering && (
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>
            )}
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            {isRegistering && (
              <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </Form.Group>
            )}
            <Button variant="primary" type="submit">
              {isRegistering ? 'Register' : 'Login'}
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="link" onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering ? 'Already have an account? Login' : 'Need an account? Register'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};



export default AuthModal;
