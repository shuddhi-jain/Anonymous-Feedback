import { Client, Account, Databases } from 'appwrite';

// Initialize Appwrite client
const client = new Client();

client
  .setEndpoint('https://cloud.appwrite.io/v1') // Appwrite Cloud endpoint
  .setProject('66fa9856001dec597c51'); // Your actual Project ID

const account = new Account(client); // Only declare account once
const databases = new Databases(client); // Only declare databases once

// Function to log in the user
const loginUser = async (email, password) => {
  try {
    const response = await account.createSession(email, password);
    console.log('User logged in successfully:', response);
    return response; // Return the response for further use if needed
  } catch (error) {
    console.error('Login failed:', error);
    throw error; // Throw error for handling in the calling function
  }
};

// Function to check if the user is authenticated
const isAuthenticated = async () => {
  try {
    const user = await account.get();
    console.log('User is authenticated:', user);
    return true;
  } catch (error) {
    console.error('User is not authenticated:', error);
    return false;
  }
};

// Function to store feedback in the database
const storeFeedback = async (feedbackText) => {
  const feedbackCollectionId = 'feedback'; // Replace with your actual collection ID

  // First, check if the user is authenticated
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    console.error('User must be logged in to submit feedback');
    return;
  }

  const documentId = 'unique()'; // Generates a unique ID for the document
  const data = {
    feedback_text: feedbackText,
    timestamp: new Date().toISOString(),
  };

  try {
    const response = await databases.createDocument(
      '66fa98c90015e4e80a0e', // Replace with your actual database ID
      feedbackCollectionId,
      documentId,
      data
    );
    console.log('Feedback stored successfully:', response);
  } catch (error) {
    console.error('Failed to store feedback:', error);
  }
};

// Export the functions and objects
export {
  account,
  databases,
  loginUser,
  isAuthenticated,
  storeFeedback
};
