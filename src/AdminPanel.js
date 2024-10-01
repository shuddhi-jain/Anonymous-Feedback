import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { account } from './appwrite';

function AdminPanel() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Use useCallback to memoize the function
  const fetchUser = useCallback(async () => {
    try {
      const loggedInUser = await account.get();
      setUser(loggedInUser);
    } catch (error) {
      setMessage('You are not authenticated. Redirecting to login...');
      console.error('Fetch user error:', error);
      setTimeout(() => {
        navigate('/admin/login');
      }, 2000);
    }
  }, [navigate]); // Add navigate to dependencies

  useEffect(() => {
    fetchUser();
  }, [fetchUser]); // Now fetchUser is included in the dependency array

  return (
    <div>
      <h1>Admin Panel</h1>
      {message && <p>{message}</p>}
      {user ? (
        <div>
          <h2>Welcome, {user.name}</h2>
          {/* Additional admin panel functionality goes here */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default AdminPanel;
