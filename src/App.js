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
        {/* Main feedback form route */}
        <Route path="/" element={<FeedbackForm />} />

        {/* Admin panel route */}
        <Route path="/admin" element={<AdminPanel />} />

        {/* Admin login route */}
        <Route path="/login" element={<AdminLogin />} />

        {/* User authentication route (login/register) */}
        <Route path="/auth" element={<UserAuth />} />
      </Routes>
    </Router>
  );
}

export default App;
