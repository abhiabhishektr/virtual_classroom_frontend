import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { adminLogin } from '../../api/admin/adminAuthApi';
import { useAuth } from '../../hooks/useAuth';
import img from "../../assets/images/img";

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [usernameChange, setUsernameChange] = useState<string | null>(null);
  const [passwordChange, setPasswordChange] = useState<string | null>(null);
  const [commonerror, setCommonError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { setAdminLogin } = useAuth();

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setUsernameChange(null);
    setPasswordChange(null);
    setCommonError(null);

    try {
      const response = await adminLogin(username, password);
      if (response) {
        setAdminLogin(response.tokens.accessToken, response.tokens.refreshToken);
        navigate('/admin/');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setCommonError('Invalid username or password');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row w-full md:w-auto">
        <div className="w-full md:w-96 rounded-s-xl bg-white p-8 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex justify-center mb-4">
              <img src={img.logo} alt="Logo" className="w-12 h-12 rounded-full" />
            </div>
            <p className="text-center text-2xl font-bold">Login</p>
            <p className="text-center text-sm text-gray-600">Welcome back! Please log in to access your account.</p>
            <form className="mt-4" onSubmit={handleSubmit}>
              <div className="mt-1 text-sm">
                <label htmlFor="username" className="block text-gray-400 mb-1">Username or Email</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={username}
                  onChange={handleUsernameChange}
                  required
                  className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-gray-900 outline-none focus:border-blue-500"
                />
                {usernameChange && <p className="text-red-500 text-xs mt-1">{usernameChange}</p>}
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
                {passwordChange && <p className="text-red-500 text-xs mt-1">{passwordChange}</p>}
              </div>
              <div className="flex justify-end mt-2">
                <Link to="/auth/forgot-password" className="text-sm text-blue-600 hover:underline">Forgot Password?</Link>
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-blue-400 to-blue-600 py-3 mt-6 text-center text-white rounded-md font-semibold"> Login</button>
            </form>
            {commonerror && <p className="text-center text-Zinc-500 text-xs mt-1">{commonerror}</p>}
          </div>
          <div className="mt-4">
            <p className="text-center text-sm text-gray-600 mt-4">
              Don't have an account?
              <Link to="/auth/signup" className="text-blue-600 hover:underline ml-1">Sign Up</Link>
            </p>
            <p className="text-center text-sm text-gray-600 mt-1">
              Are you an User?
              <Link to="/auth/login" className="text-blue-600 hover:underline ml-1">Login Here</Link>
            </p>
          </div>
        </div>
        <div className="hidden md:block bg-slate-500 w-full md:w-96 h-auto rounded-xl md:rounded-none">
          <img src={img.bg} alt="Background" className="w-full h-full object-cover rounded-e-xl md:rounded-none" />
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;