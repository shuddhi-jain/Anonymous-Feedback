import React, { useState, useEffect } from 'react';
import { databases, account } from './appwrite'; // Importing databases and account from appwrite.js
import { useNavigate } from 'react-router-dom';

function FeedbackForm() {
  const [feedbackText, setFeedbackText] = useState(''); // State for feedback text
  const [user, setUser] = useState(null); // State for user information
  const navigate = useNavigate(); // Hook to programmatically navigate

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        const userInfo = await account.get(); // Retrieve user info
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
    if (!feedbackText) return; // Prevent submission if feedback text is empty
    
    try {
      await databases.createDocument(
        '66fa98c90015e4e80a0e',  // Replace with your Feedback Database ID
        '66fa98d4000f2c8918ae', // Replace with your Feedback Collection ID
        {
          feedback_text: feedbackText,
          timestamp: new Date().toISOString(),
          userId: user.$id  // Associate feedback with user ID
        }
      );
      setFeedbackText(''); // Clear the feedback text after submission
      alert('Feedback submitted successfully!');
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  if (!user) {
    return <p>Loading...</p>; // Show loading text until user is authenticated
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
