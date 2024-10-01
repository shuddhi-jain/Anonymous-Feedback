import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from './appwrite'; // Import only loginUser from appwrite.js

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginUser(email, password); // Use the imported loginUser function
      setMessage('Login successful! Redirecting to the Admin Panel...');
      setTimeout(() => {
        navigate('/admin'); // Navigate to the Admin Panel after successful login
      }, 1000); // Delay navigation for 1 second for user feedback
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
