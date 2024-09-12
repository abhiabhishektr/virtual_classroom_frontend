// src/components/Auth/Signup.tsx
import React, { useState, ChangeEvent, FormEvent, KeyboardEvent ,useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import img from '../../assets/images/img';
import { registerUser, sendEmailForOTP, reSendOTP } from '../../api/authApi';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "../../hooks/useAuth";
import GoogleShadowDom from '../../shadow/google';


import { useDispatch } from 'react-redux';
import { setLoading } from '../../redux/slices/profileSlice';
import { showToast } from '../../utils/toast';



const Signup: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showSignupForm, setShowSignupForm] = useState<boolean>(true);
  const [showOtpForm, setShowOtpForm] = useState<boolean>(false);

  const [timer, setTimer] = useState<number>(120);
  const [verificationError, setVerificationError] = useState<string>("");
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [nameError, setNameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");



  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    const { key } = e;

    if (key === 'Backspace' && otp[index] === '') {
      e.preventDefault();
      if (index > 0) {
        (document.getElementById(`otp-${index - 1}`) as HTMLInputElement).focus();
      }
    }
  }
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

  const handleInitiateSignUp = async (e: FormEvent) => {
    e.preventDefault();

    if (emailError) {
      console.error('Please fix the email error before submitting');
      showToast('Please fix the email error before submitting.', 'error');
      return;
    }

    try {
      dispatch(setLoading(true));
      const res = await sendEmailForOTP(email);

      if (res && res.message === 'User already exists') {

        setEmailError("User already exists");
        return;
      }

      setShowSignupForm(false);
      setShowOtpForm(true);
      setTimer(120);
    } catch (error: any) {
      if (error && error.message == 'User already exists') {
        setEmailError("User already exists");
        showToast('Already Existing user. Please Go with Sign In', 'info');
        return
      }
      console.error('Error sending email:', error.message);
      showToast('Error sending OTP. Please try again..', 'error');

    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    setConfirmPasswordError("");

    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp);

    // Move focus to the next input field
    if (e.target.value.length === 1 && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`) as HTMLInputElement;
      nextInput?.focus();
    }
  };

  const handleSubmitOTP = async (e: FormEvent) => {
    e.preventDefault();
    if (!otp) {
      showToast('Please enter the OTP', 'error');
      return;
    }
    try {
      dispatch(setLoading(true));
      await handleRegisterUser();
    } catch (error) {

      console.error('Error verifying OTP:', (error as Error).message);
      showToast('Error verifying OTP. Please try again.', 'error');

      setVerificationError('Error verifying OTP. Please try again.');
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleRegisterUser = async () => {
    if (nameError || passwordError || confirmPasswordError) {
      console.error('Please fix the errors before submitting');
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }

    try {
      dispatch(setLoading(true));
      const res = await registerUser({ email, password, name, otp: otp.join('') });


      if (res && res === 'Invalid OTP') {
        setConfirmPasswordError("Invalid OTP");
        showToast('Invalid OTP', 'error');
        return
      }

      login(res.tokens.accessToken, res.tokens.refreshToken);
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error: any) {



      console.error('Error registering user:', error.message);
      showToast('Error verifying OTP. Please try again.', 'error');

    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleResendOTP = async () => {
    try {
      await reSendOTP(email);
      setTimer(120);
      showToast('OTP resent successfully', 'success');

    } catch (error: any) {
      console.error('Error resending OTP:', error.message);
      showToast('Error resending OTP. Please try again.', 'error');
    }
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


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row w-full md:w-auto">
        <div className={`w-full md:w-96 rounded-s-xl bg-white p-8 shadow-lg flex flex-col justify-between ${showSignupForm ? '' : 'hidden'}`}>
          <div className="absolute top-2 right-6 text-sm text-gray-500">1/2</div>
          <div>
            <div className="flex justify-center mb-4">
              <img src={img.logo} alt="Logo" className="w-12 h-12 rounded-full" />
            </div>
            <p className="text-center text-2xl font-bold">Sign Up</p>

            <p className="text-center text-sm text-gray-600">Create your account to get started.</p>

            {/* Google Sign-In Button */}
            <div className="flex justify-center mt-4">
              <GoogleShadowDom />
            </div>

            <p className="text-center text-sm text-gray-600 mt-4">Or Continue With</p>

            <form className="mt-4" onSubmit={handleInitiateSignUp}>
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
              <button type="submit" className="w-full bg-gradient-to-r from-blue-400 to-blue-600 py-3 mt-6 text-center text-white rounded-md font-semibold">Send OTP</button>
            </form>
          </div>

          <div className="mt-4">
            <p className="text-center text-sm text-gray-600 mt-4">
              Already have an account?
              <Link to="/auth/login" className="text-blue-600 hover:underline ml-1">Sign In</Link>
            </p>
          </div>
        </div>

        <div className={`w-full md:w-96 rounded-s-xl bg-white p-8 shadow-lg flex flex-col justify-between ${showOtpForm ? '' : 'hidden'}`}>
          <div className="absolute top-2 right-6 text-sm text-gray-500">2/2</div>

          <div>
            <div className="flex justify-center mb-4">
              <img src={img.logo} alt="Logo" className="w-12 h-12 rounded-full" />
            </div>
            <p className="text-center text-2xl font-bold">OTP Verification</p>
            <p className="text-xs text-center text-gray-400 mb-1 ">OTP sent to {email}</p>
            <form className="mt-4" onSubmit={handleSubmitOTP}>
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
              <div className="flex items-center space-x-2 mt-1 text-sm px-2">
                <label htmlFor="otp" className="text-gray-400">Enter OTP</label>
                <div className="flex space-x-2">
                  {otp.map((value, index) => (
                    <input
                      key={index}
                      type="text"
                      id={`otp-${index}`}
                      value={value}
                      onChange={(e) => handleOtpChange(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      maxLength={1}
                      className="w-9 h-9 text-center rounded-md border border-gray-300 bg-white text-gray-900 outline-none focus:border-blue-500"
                    />
                  ))}
                </div>
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-blue-400 to-blue-600 py-3 mt-6 text-center text-white rounded-md font-semibold">Verify OTP and Sign Up</button>
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