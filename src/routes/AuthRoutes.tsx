// src/routes/AuthRoutes.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Login from '../components/Auth/Login';
import Signup from '../components/Auth/Signup';
import ForgotPassword from '../components/Auth/ForgotPassword';
import OTPVerification from '../components/Auth/OTPVerification';
import LoginTester from '../../src/Testing/LoginTester';

const AuthRoutes: React.FC = () => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/otp-verification" element={<OTPVerification />} />
        <Route path="*" element={<Navigate to="/auth/login" replace />} />

        {/* ------------ For testing -------- */}
        <Route path="/" element={<LoginTester />} />
      </Routes>
    </GoogleOAuthProvider>
  );
};

export default AuthRoutes;