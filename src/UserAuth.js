import React, { useState } from 'react';
import { Client, Account } from 'appwrite';
import { useNavigate } from 'react-router-dom';

const client = new Client();

client
  .setEndpoint('https://cloud.appwrite.io/v1')  // Your Appwrite Endpoint
  .setProject('66fa9856001dec597c51');               // Your project ID

const account = new Account(client);

function UserAuth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();  // For navigation

  const handleAuth = async (e) => {
    e.preventDefault();

    if (!password || password.length < 6) {
        setMessage('Password must be at least 6 characters long.');
        return;
      }

    try {
      if (isLogin) {
        // User login
        const session = await account.createSession(email, password);
        console.log('Session:', session);
        setMessage('Login successful!');
        navigate('/');
      } else {
        // User registration with auto-generated unique user ID
        const user = await account.create('unique()', email, password); // Ensures the userId is automatically generated
        console.log('User:', user);
        setMessage('Registration successful! You can now log in.');
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
      console.error('Auth error:', error);
    }
  };

  return (
    <div>
      <h1>{isLogin ? 'User Login' : 'User Registration'}</h1>
      <form onSubmit={handleAuth}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>
      <p>{message}</p>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Switch to Registration' : 'Switch to Login'}
      </button>
    </div>
  );
}

export default UserAuth;
