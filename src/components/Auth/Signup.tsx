import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import img from '../../assets/images/img';
import { registerUser } from '../../api/authApi'

const Signup: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showSignupForm, setShowSignupForm] = useState<boolean>(true);
  const [otp, setOtp] = useState<string>("");
  const [timer, setTimer] = useState<number>(120);
  const [verificationError, setVerificationError] = useState<string>("");

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await registerUser({ email, password, name });

      // Switch to OTP verification form
      setShowSignupForm(false);
      setTimer(120); // Reset timer for OTP resend
    } catch (error : any) {
      console.error('Error signing up:', error.message);
    }
  };

  const handleOtpChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const handleSubmitOTP = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/verify-otp', {
        email,
        otp,
      });

      console.log('OTP verification successful:', response.data); // Handle success response

      // Optionally, redirect to dashboard or another page upon successful verification
    } catch (error ) {
      console.error('Error verifying OTP:', error.message);
      setVerificationError('Invalid OTP. Please try again.'); // Set error message for display
    }
  };

  const handleResendOTP = () => {
    setTimer(120);
    // Resend OTP logic here
    // This is where you would resend the OTP to the user's email or phone number
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row w-full md:w-auto">
        <div className={`w-full md:w-96 rounded-s-xl bg-white p-8 shadow-lg flex flex-col justify-between ${showSignupForm ? '' : 'hidden'}`}>
          <div>
            <div className="flex justify-center mb-4">
              <img src={img.logo} alt="Logo" className="w-12 h-12 rounded-full" />
            </div>
            <p className="text-center text-2xl font-bold">Sign Up</p>
            <p className="text-center text-sm text-gray-600">Create your account to get started.</p>
            <form className="mt-4" onSubmit={handleSignUp}>
              <div className="mt-1 text-sm">
                <label htmlFor="name" className="block text-gray-400 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={handleNameChange}
                  required
                  className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-gray-900 outline-none focus:border-blue-500"
                />
              </div>
              <div className="mt-1 text-sm">
                <label htmlFor="email" className="block text-gray-400 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                  className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-gray-900 outline-none focus:border-blue-500"
                />
              </div>
              <div className="mt-1 text-sm">
                <label htmlFor="password" className="block text-gray-400 mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-gray-900 outline-none focus:border-blue-500"
                />
              </div>
              <div className="mt-1 text-sm">
                <label htmlFor="confirm-password" className="block text-gray-400 mb-1">Confirm Password</label>
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required
                  className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-gray-900 outline-none focus:border-blue-500"
                />
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-blue-400 to-blue-600 py-3 mt-6 text-center text-white rounded-md font-semibold">Sign Up</button>
            </form>
          </div>
          <div className="mt-4">
            <p className="text-center text-sm text-gray-600 mt-4">
              Already have an account? 
              <Link to="/auth/login" className="text-blue-600 hover:underline ml-1">Sign In</Link>
            </p>
          </div>
        </div>

        <div className={`w-full md:w-96 rounded-s-xl bg-white p-8 shadow-lg flex flex-col justify-between ${showSignupForm ? 'hidden' : ''}`}>
          <div>
            <div className="flex justify-center mb-4">
              <img src={img.logo} alt="Logo" className="w-12 h-12 rounded-full" />
            </div>
            <p className="text-center text-2xl font-bold">OTP Verification</p>
            <form className="mt-4" onSubmit={handleSubmitOTP}>
              <div className="mt-1 text-sm">
                <label htmlFor="otp" className="block text-gray-400 mb-1">Enter OTP</label>
                <input
                  type="text"
                  name="otp"
                  id="otp"
                  value={otp}
                  onChange={handleOtpChange}
                  required
                  className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-gray-900 outline-none focus:border-blue-500"
                />
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-blue-400 to-blue-600 py-3 mt-6 text-center text-white rounded-md font-semibold">Verify OTP</button>
              <div className="mt-4 text-center">
                {timer > 0 ? (
                  <p className="text-gray-500">Resend OTP in {`${Math.floor(timer / 60)}:${(timer % 60).toString().padStart(2, '0')}`}</p>
                ) : (
                  <button
                    onClick={handleResendOTP}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Resend OTP
                  </button>
                )}
              </div>
              {verificationError && <p className="text-red-500 mt-4 text-sm">{verificationError}</p>}
            </form>
          </div>
        </div>
        
        <div className="hidden md:block bg-slate-500 w-full md:w-96 h-auto rounded-xl md:rounded-none">
          <img src={img.bg} alt="Background" className="w-full h-full object-cover rounded-e-xl md:rounded-none" />
        </div>
      </div>
    </div>
  );
}

export default Signup;
