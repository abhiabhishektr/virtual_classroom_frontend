// src/routes/AuthRoutes.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../components/Auth/Login';
import Signup from '../components/Auth/Signup';
import ForgotPassword from '../components/Auth/ForgotPassword';
import OTPVerification from '../components/Auth/OTPVerification';
// import Test from '../../src/Testing/t2';
import LoginTester from '../../src/Testing/LoginTester';
// import Loader from '../components/Shared/Loader';

const AuthRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/otp-verification" element={<OTPVerification />} />
      <Route path="*" element={<Navigate to="/auth/login" replace />} />

      {/* ------------ For testing -------- */}
      {/* <Route path="/test" element={<Test />} /> */}
      <Route path="/" element={<LoginTester />} />
    </Routes>
  );
};

export default AuthRoutes;

{/* <Route path='/' element={<PublicRoute  element={LandingPage}/>} /> */}
