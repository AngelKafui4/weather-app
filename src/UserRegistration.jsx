import React, { useState } from 'react';
import { auth, firestore } from './Firebase';
import { createUserWithEmailAndPassword, getIdToken } from 'firebase/auth';
import { doc, writeBatch } from 'firebase/firestore';

const UserRegistration = ({ onRegister }) => {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const handleRegistration = async () => {
    setError(null);
    setIsLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Retrieve the session ID
      const sessionCookie = await getIdToken(auth.currentUser, true);

      // Create a new batch write
      const batch = writeBatch(firestore);

     // Add the user data to the batch
     const userRef = doc(firestore, 'users', user.uid);
     batch.set(userRef, {
       username: username,
       email: user.email,
       sessionCookie: sessionCookie,
     });

       // Commit the batch write
    await batch.commit();
    console.log('Registration successful!');
    onRegister();
  } catch (error) {
    let errorMessage;
    switch (error.code) {
      case 'auth/email-already-in-use':
        errorMessage = 'Email is already in use.';
        break;
      case 'auth/weak-password':
        errorMessage = 'Password should be at least 6 characters.';
        break;
      case 'auth/invalid-email':
        errorMessage = 'Invalid email address.';
        break;
      default:
        errorMessage = 'An unexpected error occurred during registration. Please try again later.';
    }
    setError(errorMessage);
    console.error('Error during user registration:', error);
  } finally {
    setIsLoading(false);
  }
};

  const isFormValid = username.trim() !== '' && email.trim() !== '' && password.trim() !== '';

  return (
    <div className="weather-app-container">
      <div className="weather-app-card">
        <div className="weather-app-card-header">
          <h2>User Registration</h2>
        </div>
        {error && <div className="weather-app-error">{error}</div>}
        <div className="weather-app-form-group">
          <label htmlFor="username" className="weather-app-label">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="weather-app-input"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            autoComplete="username"
            required
            aria-label="Username"
          />
        </div>
        <div className="weather-app-form-group">
          <label htmlFor="email" className="weather-app-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="weather-app-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
            aria-label="Email"
          />
        </div>
        <div className="weather-app-form-group">
          <label htmlFor="password" className="weather-app-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="weather-app-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
            aria-label="Password"
          />
        </div>
        <button
          type="submit"
          className="weather-app-submit-button"
          disabled={isLoading || !isFormValid}
          onClick={isFormValid ? handleRegistration : null}
        >
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
      </div>
    </div>
  );
};

export default UserRegistration;