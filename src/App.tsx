import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import PasswordGenerator from './components/PasswordGenerator';
import PasswordValidator from './components/PasswordValidator';
import LoginPage from './components/LoginPage';
import Sidebar from './components/Sidebar';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex">
      <Sidebar />

      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/generator" element={<PasswordGenerator />} />
          <Route path="/validator" element={<PasswordValidator />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;