import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../components/HomePage';
import PasswordGenerator from '../components/PasswordGenerator';
import PasswordValidator from '../components/PasswordValidator';
import PasswordHistory from '../components/PasswordHistory';
import ProfilePage from '../components/ProfilePage';
import LoginPage from '../components/LoginPage';
import RegisterPage from '../components/RegisterPage';
import PasswordResetPage from '../components/PasswordResetPage';
import ErrorPage from '../components/ErrorPage';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/generator" element={<PasswordGenerator />} />
      <Route path="/validator" element={<PasswordValidator />} />
      <Route path="/history" element={<PasswordHistory />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/password-reset" element={<PasswordResetPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRoutes;