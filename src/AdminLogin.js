import React, { useState } from 'react';
import { Client, Account } from 'appwrite';
import { useNavigate } from 'react-router-dom';

const client = new Client();

client
  .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite Endpoint
  .setProject('66fa9856001dec597c51');              // Your project ID

const account = new Account(client);

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Hook to programmatically navigate


  console.log('Email:', email);
console.log('Password:', password);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await account.createSession(email, password);
      setMessage('Login successful!');
      navigate('/admin'); // Navigate to the Admin Panel after successful login
    } catch (error) {
      setMessage('Error logging in. Please check your credentials.');
      console.error('Login error:', error);
    }
  };

  return (
    <div>
      <h1>Admin Login</h1>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AdminLogin;
