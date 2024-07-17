import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Link } from 'react-router-dom';
import img from '../../assets/images/img';
import { registerUser } from '../../api/authApi';
import { verifyOTP } from '../../api/authApi';
import { useNavigate } from 'react-router-dom';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../Shared/Loader";



// import { useDispatch, useSelector } from 'react-redux';
// import { setLoading } from '../redux/slices/loadingSlice'; // Adjust path as per your project structure



const Signup: React.FC = () => {

  const [lod, setLod] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showSignupForm, setShowSignupForm] = useState<boolean>(true);
  const [otp, setOtp] = useState<string>("");
  const [timer, setTimer] = useState<number>(120);
  const [verificationError, setVerificationError] = useState<string>("");

  const [nameError, setNameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");

  const navigate = useNavigate();

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    if (value.length < 3) {
      setNameError("Name must be at least 3 characters long");
    } else {
      setNameError("");
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (value.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (value !== password) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();


    if (nameError || emailError || passwordError || confirmPasswordError) {
      console.error('Please fix the errors before submitting');
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }

    try {

      setLod(true);
      const res = await registerUser({ email, password, name });
      console.log('Response:', res);
      
      setLod(false);

      if (res && res.message === 'User already exists') {
        setEmailError("User already exists");
        return;
      }
      console.log('User registered successfully');
      setShowSignupForm(false);
      setTimer(120);
    } catch (error: any) {
      console.error('Error signing up:', error.message);
      setLod(false);

    }
  };

  const handleOtpChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const handleSubmitOTP = async (e: FormEvent) => {
    e.preventDefault();
    // ===
    if (!otp) {
      toast.error('Please enter the OTP');
      return;
    }
    try {
      const response = await verifyOTP(email, otp);
      if (response.message === 'Invalid OTP') {
        toast.error('Invalid OTP. Please try again.');
        setVerificationError('Invalid OTP. Please try again.');
      } else {
        toast.success('OTP verified successfully!');
        setTimeout(() => {
          navigate('/auth/login');
        }, 1000); // Adjust the delay as needed
      }
    } catch (error) {
      console.error('Error verifying OTP:', (error as Error).message);
      toast.error('Error verifying OTP. Please try again.');
      setVerificationError('Error verifying OTP. Please try again.');
    }
  };

  const handleResendOTP = () => {
    setTimer(120);
    // Resend OTP logic here
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

if (lod) {
  return (
  <div className="flex justify-center items-center min-h-screen">
    <Loader/>
  </div>
  )
}

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
                {nameError && <p className="text-red-500 text-xs mt-1">{nameError}</p>}
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
                {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
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
                {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
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
                {confirmPasswordError && <p className="text-red-500 text-xs mt-1">{confirmPasswordError}</p>}
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
            <ToastContainer position="bottom-right" />
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