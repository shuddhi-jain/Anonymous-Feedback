import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminLogin from './AdminLogin';
import AdminPanel from './AdminPanel';
import FeedbackForm from './FeedbackForm';
import UserAuth from './UserAuth';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FeedbackForm />} /> {/* Main feedback form */}
        <Route path="/admin" element={<AdminPanel />} /> {/* Admin panel */}
        <Route path="/login" element={<AdminLogin />} /> {/* Admin login */}
        <Route path="/auth" element={<UserAuth />} /> {/* User authentication */}
      </Routes>
    </Router>
  );
}

export default App;
