import React, { useState, useEffect } from 'react';
import { databases, account } from './appwrite';
import { useNavigate } from 'react-router-dom';

function FeedbackForm() {
  const [feedbackText, setFeedbackText] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        const userInfo = await account.get();
        setUser(userInfo);  // Set user state if logged in
      } catch (error) {
        console.error('Not authenticated', error);
        navigate('/auth');  // Redirect to login if not authenticated
      }
    };
    checkAuth();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!feedbackText) return;
    
    try {
      await databases.createDocument(
        '66fa98c90015e4e80a0e',  // Replace with your Feedback Database ID
        '66fa98d4000f2c8918ae', // Replace with your Feedback Collection ID
        {
          feedback_text: feedbackText,
          timestamp: new Date().toISOString(),
          userId: user.$id  // Associate feedback with user
        }
      );
      setFeedbackText('');
      alert('Feedback submitted successfully!');
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Submit Feedback</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
          placeholder="Enter your feedback"
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default FeedbackForm;
