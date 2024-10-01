import React, { useEffect, useState } from 'react';
import { databases } from './appwrite';

function AdminPanel() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const fetchFeedback = async () => {
    setLoading(true);
    try {
      const response = await databases.listDocuments(
        '66fa98c90015e4e80a0e',  // Replace with your Feedback Database ID
        '66fa98d4000f2c8918ae'  // Replace with your Feedback Collection ID
      );
      setFeedbackList(response.documents);
    } catch (error) {
      console.error('Error fetching feedback:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this feedback?')) {
      try {
        await databases.deleteDocument(
          '66fa98c90015e4e80a0e',  // Replace with your Feedback Database ID
          '66fa98d4000f2c8918ae', // Replace with your Feedback Collection ID
          id                        // Document ID to delete
        );
        fetchFeedback(); // Refresh the feedback list after deletion
      } catch (error) {
        console.error('Error deleting feedback:', error);
      }
    }
  };

  useEffect(() => {
    fetchFeedback(); // Fetch feedback when component mounts
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Admin Panel - Feedback List</h1>
  
      <div>
        <label>Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <label>End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button onClick={fetchFeedback}>Filter</button>
      </div>
  
      <ul>
        {feedbackList
          .filter(feedback => {
            const feedbackDate = new Date(feedback.timestamp);
            const isAfterStart = startDate ? feedbackDate >= new Date(startDate) : true;
            const isBeforeEnd = endDate ? feedbackDate <= new Date(endDate) : true;
            return isAfterStart && isBeforeEnd;
          })
          .map((feedback) => (
            <li key={feedback.$id}>
              <p><strong>Feedback:</strong> {feedback.feedback_text}</p>
              <p><strong>Submitted on:</strong> {new Date(feedback.timestamp).toLocaleString()}</p>
              <button onClick={() => handleDelete(feedback.$id)}>Delete</button>
            </li>
          ))}
      </ul>
    </div>
  );
  
}

export default AdminPanel;
