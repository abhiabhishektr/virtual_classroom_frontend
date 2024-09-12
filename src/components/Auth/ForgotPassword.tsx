import  { useState, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import img from '../../assets/images/img';
import { forgotPassword, forgotPasswordOTP } from '../../api/authApi';

import { setLoading } from '../../redux/slices/profileSlice';
import { useDispatch } from 'react-redux';
import { showToast } from '../../utils/toast';



const ForgotPassword = () => {
  const dispatch = useDispatch();


  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
    interface Errors {
      common?: string; 
      password?: string;
    }
    
  const [errors, setErrors] = useState<Errors>({});
  const [mainerrors, setMainerrors] = useState(false);



  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setMainerrors(false);
  };


  const handleEmailSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    try {
      dispatch(setLoading(true));
      if (mainerrors) {
        showToast('No User found with this email.', 'warning');
        return;
      }
      await forgotPasswordOTP(email);
      setStep(2);
    } catch (error: any) {
      setMainerrors(true);
      showToast('Please fix the error before submitting.', 'error');
      setErrors({ common: error.message || 'An error occurred while sending OTP.' });
    }
    finally {
      dispatch(setLoading(false));
    }
  };

  const handleOtpSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    if (newPassword !== confirmPassword) {
      setErrors({ password: 'Passwords do not match' });
      return;
    }

    try {
      dispatch(setLoading(true));
      await forgotPassword(email, otp, newPassword);
      navigate('/auth/login');
    } catch (error : any) {
      setErrors({ common: error.message || 'An error occurred while resetting password.' });
    }
    finally {
      dispatch(setLoading(false));
    }
  };

  const renderForm = () => {
    if (step === 1) {
      return (
        <form onSubmit={handleEmailSubmit}>
          <div className="mt-4">
            <label htmlFor="email" className="block text-gray-400 mb-1">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              // onChange={(e) => setEmail(e.target.value)}
              onChange={handleEmailChange}
              required
              className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-gray-900 outline-none focus:border-blue-500"
            />
          </div>
          <button type="submit" className="w-full bg-gradient-to-r from-blue-400 to-blue-600 py-3 mt-6 text-center text-white rounded-md font-semibold">
            Send OTP
          </button>
        </form>
      );
    } else {
      return (
        <form onSubmit={handleOtpSubmit}>
          <div className="mt-4">
            <label htmlFor="otp" className="block text-gray-400 mb-1">OTP</label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-gray-900 outline-none focus:border-blue-500"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="newPassword" className="block text-gray-400 mb-1">New Password</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-gray-900 outline-none focus:border-blue-500"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="confirmPassword" className="block text-gray-400 mb-1">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-gray-900 outline-none focus:border-blue-500"
            />
          </div>
          <button type="submit" className="w-full bg-gradient-to-r from-blue-400 to-blue-600 py-3 mt-6 text-center text-white rounded-md font-semibold">
            Reset Password
          </button>
        </form>
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row w-full md:w-auto">
        <div className="w-full md:w-96 rounded-s-xl bg-white p-8 shadow-lg flex flex-col justify-between">
          <div className="flex justify-center mb-4">
            <img src={img.logo} alt="Logo" className="w-12 h-12 rounded-full" />
          </div>
          <p className="text-center text-2xl font-bold">
            {step === 1 ? 'Forgot Password' : 'Reset Password'}
          </p>
          <p className="text-center text-sm text-gray-600">
            {step === 1
              ? 'Enter your email to receive a password reset OTP.'
              : 'Enter the OTP sent to your email and create a new password.'}
          </p>
          {renderForm()}
          {errors.common && (
            <p className="text-center text-red-500 text-xs mt-2">{errors.common}</p>
          )}
          {errors.password && (
            <p className="text-center text-red-500 text-xs mt-2">{errors.password}</p>
          )}
          {step === 1 && (
            <p className="text-center text-sm text-gray-600 mt-4">
              Remembered your password?
              <Link to="/auth/login" className="text-blue-600 hover:underline ml-1">
                Log In
              </Link>
            </p>
          )}
        </div>
        <div className="hidden md:block bg-slate-500 w-full md:w-96 h-auto rounded-xl md:rounded-none">
          <img
            src={img.bg}
            alt="Background"
            className="w-full h-full object-cover rounded-e-xl md:rounded-none"
          />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;