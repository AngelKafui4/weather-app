import React, { useState } from 'react';
import { auth, firestore } from './Firebase';


const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      const user = userCredential.user;
      const userDoc = await firestore.collection('users').doc(user.uid).get();
      if (userDoc.exists) {
        const userData = userDoc.data();
        console.log('Logged in user:', userData);
        setUserData(userData);
        setIsLoggedIn(true);
        onlogin();
      } else {
        setError('User not found in the database');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log('User logged out successfully');
      setIsLoggedIn(false);
      setUserData(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleSaveUserData = async (newUserData) => {
    try {
      const userRef = firestore.collection('users').doc(userData.uid);
      await userRef.update(newUserData);
      console.log('User data saved successfully');
      const updatedUserDoc = await userRef.get();
      setUserData(updatedUserDoc.data());
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  return (
    <div className="weather-app-container">
      <div className="weather-app-card">
        <div className="weather-app-card-header">
          <h2>{isLoggedIn ? 'Logout' : 'Login'}</h2>
        </div>
        {isLoggedIn ? (
          <button className="weather-app-submit-button" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <form onSubmit={handleLogin}>
            <div className="weather-app-input-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
            <div className="weather-app-input-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <button
              type="submit"
              className="weather-app-submit-button"
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Login'}
            </button>
          </form>
        )}
        {error && <div className="weather-app-error">{error}</div>}
        {isLoggedIn && userData && (
          <div>
            <h3>User Data:</h3>
            <pre>{JSON.stringify(userData, null, 2)}</pre>
            <button onClick={() => handleSaveUserData({ name: 'Updated Name' })}>
              Save Updates
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginForm;